angular.module('app').controller('nmLoginCtrl', function($scope, nmIdentity, nmNotifier, nmAuth, $location){
     $scope.formData = {};
     $scope.identity = nmIdentity;
     $scope.signin = function(){
         var username = $scope.formData.username;
         var password = $scope.formData.password;
         nmAuth.authenticateUser(username, password).then(function(success){
             if(success){
                nmNotifier.notify('You have successfully signed in');
                $location.path('/welcome');
             }
             else {
                 nmNotifier.error('Username/Password Incorrect');
             }
         });
     }
    
    $scope.signout = function () {
        nmAuth.logoutUser().then(function(){
            $scope.username = '';
            $scope.password = '';
            nmNotifier.notify('You have successfully logout!');
            $location.path('/');
        });
    }


});