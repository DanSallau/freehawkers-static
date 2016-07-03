angular.module('app').controller('nmChangePasswordCtrl', function($scope,$http, $routeParams, nmAuth, nmIdentity, nmNotifier, $location, nmMatch){
    $scope.formData = {};

    $scope.changePassword = function(){
        var newData = {
            username: $routeParams.email,
            password: $scope.formData.currentPassword,
            newPassword: $scope.formData.newPassword,
            confirmPassword: $scope.formData.rePassword
        };

        $http({
            method: 'PUT',
            url: '/change-password',
            data: newData,
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        }).then(function(response){
            if(response.data.success === true) {
                nmNotifier.notify('password for user ' + newData.username + ' changed successfully');
                signout();
            } else if(!response.data.success && response.data.type==='login'){
                 nmNotifier.error('Username/Password Incorrect');
            }
        }).catch(function(err){
            if(!err.data.success === false && err.data.type==='login'){
                nmNotifier.error('Username/Password Incorrect');
            } else {
                nmNotifier.error(err.data.reason);
                console.log('the res is', err);
            }
        });

    };

    var signout = function () {
        nmAuth.logoutUser().then(function(){
            $scope.formData.newPassword = '';
            $scope.formData.currentPassword = '';
            $scope.formData.rePassword = '';
            $location.path('/login');

        });
    }
});