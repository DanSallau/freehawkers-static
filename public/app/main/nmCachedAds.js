angular.module('app').factory('nmCachedAds',function(nmAds){
    var ads;
    return{
        query: function() {
            if(!ads) {
                ads = nmAds.query();
            }
            
            return ads;
        }
    }
});