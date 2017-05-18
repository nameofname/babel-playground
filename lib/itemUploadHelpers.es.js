'use strict';






var SV = require('server-vars');
var $ = require('dibs-jquery-shim');
var actingUser = require('bunsen/helpers/actingUser');
var Seller = require('bunsen/models/Seller');
var PublicationTypes = require('bunsen/collections/inventory/PublicationTypes');
var Deferred = require('simply-deferred');
var Clump = require('bunsen/libraries/clump');
var SoaModel = require('bunsen/models/SoaModel');
var publicationTypes = undefined;

module.exports = { 

    getItemUploadSeller: function getItemUploadSeller() {


        if (actingUser.isInternal() && !actingUser.isMasquerading()) {
            return new Seller(SV.get('owningSeller'));} else 
        {
            return Seller.getCurrentSeller();}}, 



    getCacheQuery: function getCacheQuery() {
        return '?' + new Date().getTime();}, 



















    addItemListings: function addItemListings(listingsMap, itemModel) {
        var listed = false;
        publicationTypes = new PublicationTypes(SV.get('publicationTypes'));

        itemModel.resetListings();
        var canAttach = itemModel.canAttachListings();


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







    saveAllItemData: function saveAllItemData(itemModel) {var _arguments = arguments;
        var xhrs = [];
        var dfd = new Deferred.Deferred();
        var saveOptions = { 
            clump: new Clump(), 
            queries: { 
                indexMode: 'sync', 
                iAmRon: true } };




        var quotesSave = itemModel.saveShipmentQuotes(saveOptions);
        quotesSave.fail(function (xhr) {
            itemModel.trigger('clumpSaveFailure:shipmentQuotes', xhr);});

        xhrs.push(quotesSave);

        var itemSave = itemModel.save(null, saveOptions);
        itemSave.fail(function (xhr) {
            itemModel.trigger('clumpSaveFailure:item', xhr);});

        xhrs.push(itemSave);

        var unsavedListings = itemModel.getListings().filterUnsaved();
        if (unsavedListings.size()) {
            var listingsModel = new SoaModel();
            listingsModel.url = '/soa/inventory-3/3/item/' + itemModel.get('id') + '/listings';
            listingsModel.set({ 
                id: itemModel.get('id'), 
                apiType: 'item', 
                listings: { 
                    apiType: 'documentList', 
                    documents: unsavedListings.toJSON().documents } });


            var listingsSave = listingsModel.save(null, { clump: saveOptions.clump, patch: true });
            listingsSave.fail(function (xhr) {
                itemModel.trigger('clumpSaveFailure:listing', xhr);});

            xhrs.push(listingsSave);}


        $.when.apply($, xhrs).done(function () {
            dfd.resolve.apply(dfd, _arguments);});


        saveOptions.clump.run({ abortOnError: true });
        return dfd.promise();} };