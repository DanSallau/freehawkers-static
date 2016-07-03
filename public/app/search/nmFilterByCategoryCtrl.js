angular.module('app').controller('nmFilterByCategoryCtrl', function($scope, nmFilterAdByCategory, $routeParams) {
    $scope.classifiedList = nmFilterAdByCategory.query({
        id: $routeParams.id ? $routeParams.id : 'all'
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
