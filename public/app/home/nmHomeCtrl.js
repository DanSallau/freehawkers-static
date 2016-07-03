angular.module('app').controller('nmHomeCtrl', function($scope, nmAd, nmIdentity) {
    var formData = {};
    $scope.classifiedList = nmAd.query();
    $scope.User = nmIdentity.currentUser;
});
