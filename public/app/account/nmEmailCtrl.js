angular.module('app').controller('nmEmailCtrl', ['$scope','$location', '$routeParams','nmNotifier', 'nmIdentity','nmEmailConfirmation',function($scope, $location, $routeParams, nmNotifier, nmIdentity, nmEmailConfirmation){
  //  $scope.confirmEmail = new nmEmailConfirmation();

    var param1 = $routeParams.username;
    var param2 = $routeParams.token;
    var newUser = {username: param1, token: param2};
    var user = new nmEmailConfirmation(newUser);
    user.$update({username: param1}).then(function(response){
        if(response.user){
            nmIdentity.currentUser = response.user;
            nmNotifier.notify('Your email has been activated');
            $location.path('/welcome');
        } else {
            nmNotifier.notify('Your email has expire, please resend another');
            $location.path('/welcome');
        }
    },function(err){
        console.log(err);
    });

    if(nmEmailConfirmation.isActive){
        console.log('the email is ', $scope.confirmation)
    }
}]);