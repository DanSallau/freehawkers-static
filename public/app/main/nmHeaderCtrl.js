angular.module('app').controller('nmHeaderCtrl', function($scope,nmCachedCategories, nmCachedStatistics, $location ){
    $scope.categories = nmCachedCategories.query();
    $scope.formData ={};
    $scope.users = nmCachedStatistics.getAllUsers();
    $scope.categoryItems = nmCachedStatistics.getCategoryItemCount();
    $scope.ads = nmCachedStatistics.getAllAds();
    $scope.seachQuery = function(req, res) {
        $location.path('/search/').search({query: $scope.formData.searchText});
    };
})