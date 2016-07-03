angular.module('app').controller('nmCategoryCtrl', function($scope,nmCachedCategories, nmCachedStatistics ){
    $scope.categories = nmCachedCategories.query();
    $scope.totalUsers = nmCachedStatistics.getAllUsers();
    $scope.totalAds = nmCachedStatistics.getAllAds();
})