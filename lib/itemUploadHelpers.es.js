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


        if (actingUser.isInternal() && !actingUser.isMasquerading()) {
            return new Seller(SV.get('owningSeller'));} else 
        {
            return Seller.getCurrentSeller();}}, 



    getCacheQuery() {
        return '?' + new Date().getTime();}, 



















    addItemListings(listingsMap, itemModel) {
        let listed = false;
        publicationTypes = new PublicationTypes(SV.get('publicationTypes'));

        itemModel.resetListings();
        const canAttach = itemModel.canAttachListings();


        if (listingsMap.nydc) {
            itemModel.setNydc(true);} else 
        {
            itemModel.setNydc(false);}


        if (listingsMap.wip) {
            itemModel.markUnlisted();
            itemModel.markIncomplete();
            return;}

        if (listingsMap.unlisted) {
            itemModel.markUnlisted();
            return;}



        if (!canAttach) {
            return;}


        if (listingsMap.store) {
            itemModel.addStorefrontListing(publicationTypes);
            listed = true;}

        if (listingsMap.market) {
            itemModel.addMarketplaceListing(publicationTypes);
            listed = true;
            if (itemModel.isArt()) {
                itemModel.addFeaturedListing(publicationTypes);}}


        if (listingsMap.featured) {
            itemModel.addFeaturedListing(publicationTypes);
            listed = true;}


        if (listed && itemModel.canMarkComplete()) {
            itemModel.markComplete();}}, 







    saveAllItemData: function (itemModel) {
        const xhrs = [];
        const dfd = new Deferred.Deferred();
        const saveOptions = { 
            clump: new Clump(), 
            queries: { 
                indexMode: 'sync', 
                iAmRon: true } };




        const quotesSave = itemModel.saveShipmentQuotes(saveOptions);
        quotesSave.fail(xhr => {
            itemModel.trigger('clumpSaveFailure:shipmentQuotes', xhr);});

        xhrs.push(quotesSave);

        const itemSave = itemModel.save(null, saveOptions);
        itemSave.fail(xhr => {
            itemModel.trigger('clumpSaveFailure:item', xhr);});

        xhrs.push(itemSave);

        const unsavedListings = itemModel.getListings().filterUnsaved();
        if (unsavedListings.size()) {
            const listingsModel = new SoaModel();
            listingsModel.url = '/soa/inventory-3/3/item/' + itemModel.get('id') + '/listings';
            listingsModel.set({ 
                id: itemModel.get('id'), 
                apiType: 'item', 
                listings: { 
                    apiType: 'documentList', 
                    documents: unsavedListings.toJSON().documents } });


            const listingsSave = listingsModel.save(null, { clump: saveOptions.clump, patch: true });
            listingsSave.fail(xhr => {
                itemModel.trigger('clumpSaveFailure:listing', xhr);});

            xhrs.push(listingsSave);}


        $.when.apply($, xhrs).done(() => {
            dfd.resolve.apply(dfd, arguments);});


        saveOptions.clump.run({ abortOnError: true });
        return dfd.promise();} };