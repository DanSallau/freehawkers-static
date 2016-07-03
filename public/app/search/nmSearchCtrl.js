angular.module('app').controller('nmSearchCtrl', function($scope, nmFilterAdBySearchText, $routeParams) {
    $scope.classifiedList = nmFilterAdBySearchText.query({
        searchText: $routeParams.query ? $routeParams.query : 'all'
    });
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
