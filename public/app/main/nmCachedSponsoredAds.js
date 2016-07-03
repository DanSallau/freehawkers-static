angular.module('app').factory('nmCachedSponsoredAds',function(nmSponsoredAds){
    var ads;
    return{
        query: function() {
            if(!ads) {
                ads = nmSponsoredAds.query();
            }
            
            return ads;
        }
    }
});