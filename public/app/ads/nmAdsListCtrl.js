angular.module('app').controller('nmAdsListCtrl', function($scope, nmCachedAd) {
    $scope.classifiedList = nmCachedAd.query();
    $scope.sortOptions = [
        {value :"Title", text : "Sort by Title" }, 
        {value : "CreatedOn", text :"Sort by published date"},
        {value : "Category", text :"Sort by category"},
        {value : "CreatedOn", text :"Sort by Advertiser"}
    ];
    $scope.sortOrder  = $scope.sortOptions[0].value;
    $scope.limit = 10;

    $scope.loadMore = function() {
        $scope.limit += 10;
    };
    
});
