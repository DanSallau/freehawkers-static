angular.module('app').factory('nmCachedStatistics',function(nmUsersStatistic,nmAdsStatistic, nmCategoriesStatistic){
    var allUsers;
    var activeUsers;
    var allAds;
    var activeAds;
    var categoryItemsbyNumber;

    return{
        getAllUsers: function() {
            if(!allUsers) {
                allUsers = nmUsersStatistic.query();
            }
            
            return allUsers;
        },
        getActiveUsers : function(id) {
            if(!activeUsers){
                activeUsers = nmUsersStatistic.query({active:true});
            }
            return activeUsers;
        },
        getAllAds : function() {
            if(!allAds){
                allAds = nmAdsStatistic.query();
            }
            return allAds;
        },
        getActiveAds : function(id) {
            if(!activeAds){
                activeAds = nmAdsStatistic.query({active:true});
            }
            return activeAds;
        },
        getCategoryItemCount : function() {
            if(!categoryItemsbyNumber){
                categoryItemsbyNumber = nmCategoriesStatistic.query();
            }
            return categoryItemsbyNumber;
        }
    }
});