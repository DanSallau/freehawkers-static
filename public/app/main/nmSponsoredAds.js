angular.module('app').factory('nmSponsoredAds', function($resource){
    var sponsoredAdsResource = $resource('/api/sponsoredAds/:id',{id:"@id"},
    {
        delete: {method: 'DELETE', isArray: false}
    });

    return sponsoredAdsResource;
});
