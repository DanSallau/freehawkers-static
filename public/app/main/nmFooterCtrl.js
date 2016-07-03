angular.module('app').controller('nmFooterCtrl', function($scope, $http, nmNotifier){
    $scope.date = new Date();
    $scope.formData = {};
    $scope.notifyMe = function() {
        var Email = $scope.formData.email;
        $http({
            method: 'POST',
            url: '/subscribe-news-letter',
            data: {email: Email},
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        }).then(function(response){
            nmNotifier.notify('email ' + Email + ' subscribed successfully');
        }).catch(function(res){
            var error = res.data.errors[0];
            if(error.type === "unique violation") {
                nmNotifier.error( error.path + " exist. Please use different one.");
            } else {
                nmNotifier.error(error.message);
            }

        });
    }
});