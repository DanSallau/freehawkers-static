angular.module('app').factory('nmCachedAd',function(nmAd){
    var ads;
    return{
        query: function() {
            if(!ads) {
                ads = nmAd.query();
            }
            
            return ads;
        }
    }
});