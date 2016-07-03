angular.module('app').controller('nmForgotPasswordCtrl', function($scope, $http, nmNotifier){
    $scope.formData = {};
    $scope.getMyPassword = function(){
        var Email = $scope.formData.email;

        $http({
            method: 'POST',
            url: '/forgot-password',
            data: {email: Email},
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        }).then(function(response){
            nmNotifier.notify('email sent to ' + Email + ' successfully');
        }).catch(function(err){
            nmNotifier.error('sending email failed, please contact admin');
            console.log('the res is', err);
        });
    }
});