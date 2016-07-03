angular.module('app').controller('nmAdsByUserCtrl', function($scope, nmFilterAdByUsername, $routeParams, nmFilterUserByUsername) {
    var formData = {};
    $scope.classifiedList = nmFilterAdByUsername.query({username:$routeParams.username});
    console.log('the ads are', $scope.classifiedList);
    $scope.User = nmFilterUserByUsername.query({username:$routeParams.username});
    
    console.log('the users are ', $scope.User);
});
