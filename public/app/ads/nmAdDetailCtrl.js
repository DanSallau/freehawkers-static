angular.module('app').controller('nmAdDetailCtrl', function($scope, nmIdentity, nmAd,nmCachedAds, $routeParams){

    $scope.ads = nmCachedAds.query();
    $scope.user =  nmIdentity.currentUser;
    var data = nmAd.get({id:$routeParams.id});
    $scope.ad = data;
    data.$promise.then(function(item){
        $scope.adItems = item[0];
    });
})