/**
 * User: Rob Richard
 * Date: 9/18/15
 * Time: 2:33 PM
 */

'use strict';
const SV = require('server-vars');
const $ = require('dibs-jquery-shim');
const actingUser = require('bunsen/helpers/actingUser');
const Seller = require('bunsen/models/Seller');
const PublicationTypes = require('bunsen/collections/inventory/PublicationTypes');
const Deferred = require('simply-deferred');
const Clump = require('bunsen/libraries/clump');
const SoaModel = require('bunsen/models/SoaModel');
let publicationTypes;

module.exports = {

    getItemUploadSeller() {
        // If the current user is an internal admin who is not masquerading
        // then we look for the item seller in a  server variable
        if (actingUser.isInternal() && !actingUser.isMasquerading()) {
            return new Seller(SV.get('owningSeller'));
        } else {
            return Seller.getCurrentSeller();
        }
    },

    getCacheQuery() {
        return '?' + new Date().getTime();
    },

    /**
     * This method modifies the item model posting options based on a configuration object.
     * The config object can have any of the following (boolean) properties :
     *      - wip
     *      - unlisted
     *      - store
     *      - market
     *      - featured
     *      - nydc
     * This method will figure out how to modify the item and it's listings so that when the item saves the correct
     * posting options will be included.
     *
     * Note* If you include the wip option, the item will always move to the incomplete state, even if it was
     * previously complete. This is because we consider the intention of the dealer here to be to move the item
     * back to WIP.
     * @param conf
     */
    addItemListings(listingsMap, itemModel) {
        let listed = false;
        publicationTypes = new PublicationTypes(SV.get('publicationTypes'));
        // first reset the item's listings to whatever they were before :
        itemModel.resetListings();
        const canAttach = itemModel.canAttachListings();

        // Do NYDC first because save for item could happen regardless of listing state :
        if (listingsMap.nydc) {
            itemModel.setNydc(true);
        } else {
            itemModel.setNydc(false);
        }
        // WIP and unlisted both return before doing anything else :
        if (listingsMap.wip) {
            itemModel.markUnlisted();
            itemModel.markIncomplete();
            return;
        }
        if (listingsMap.unlisted) {
            itemModel.markUnlisted();
            return;
        }

        // none of the following steps will be done if the item is not able to accept listings :
        if (!canAttach) {
            return;
        }

        if (listingsMap.store) {
            itemModel.addStorefrontListing(publicationTypes);
            listed = true;
        }
        if (listingsMap.market) {
            itemModel.addMarketplaceListing(publicationTypes);
            listed = true;
            if (itemModel.isArt()) {
                itemModel.addFeaturedListing(publicationTypes);
            }
        }
        if (listingsMap.featured) {
            itemModel.addFeaturedListing(publicationTypes);
            listed = true;
        }

        if (listed && itemModel.canMarkComplete()) {
            itemModel.markComplete();
        }
    },

    /**
     * Use clump service to save item, shipment quotes and listings in one call.
     * @returns {$.Deferred.promise}
     */
    saveAllItemData: function (itemModel) {
        const xhrs = [];
        const dfd = new Deferred.Deferred();
        const saveOptions = {
            clump : new Clump(),
            queries: {
                indexMode: 'sync',
                iAmRon: true
            }
        };

        // note* the following save requests set up specific event triggers for their specific fail cases.
        const quotesSave = itemModel.saveShipmentQuotes(saveOptions);
        quotesSave.fail(xhr => {
            itemModel.trigger('clumpSaveFailure:shipmentQuotes', xhr);
        });
        xhrs.push(quotesSave);

        const itemSave = itemModel.save(null, saveOptions);
        itemSave.fail(xhr => {
            itemModel.trigger('clumpSaveFailure:item', xhr);
        });
        xhrs.push(itemSave);

        const unsavedListings = itemModel.getListings().filterUnsaved();
        if (unsavedListings.size()) {
            const listingsModel = new SoaModel();
            listingsModel.url = '/soa/inventory-3/3/item/' + itemModel.get('id') + '/listings';
            listingsModel.set({
                id : itemModel.get('id'),
                apiType : 'item',
                listings : {
                    apiType : 'documentList',
                    documents : unsavedListings.toJSON().documents
                }
            });
            const listingsSave = listingsModel.save(null, {clump : saveOptions.clump, patch : true});
            listingsSave.fail(xhr => {
                itemModel.trigger('clumpSaveFailure:listing', xhr);
            });
            xhrs.push(listingsSave);
        }

        $.when.apply($, xhrs).done(() => {
            dfd.resolve.apply(dfd, arguments);
        });

        saveOptions.clump.run({ abortOnError: true });
        return dfd.promise();
    }

};
