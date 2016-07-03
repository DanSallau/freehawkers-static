angular.module('app').controller('nmRegisterCtrl', function($scope, nmAuth, nmNotifier, $location, nmMatch){
    $scope.formData = {};
    $scope.signup = function(){
        $scope.formData.error = "";
        var newData = {
            FirstName: $scope.formData.fname,
            LastName: $scope.formData.lname,
            Username: $scope.formData.username,
            Email: $scope.formData.email,
            Password: $scope.formData.password,
            Confirm_password: $scope.formData.repassword
        };
        nmAuth.createUser(newData).then(function(){
            nmNotifier.notify('User Account created');
            $location.path('/welcome');
        })
        .catch(function(res){
            var error = res.errors[0];
            if(error.type === "unique violation") {
                nmNotifier.error( error.path + " exist. Please use different one.");
            } else {
                nmNotifier.error(error.message);
            }
        });
    }
}).directive("compareTo", ['nmMatch' , function(nmMatch) {
    return nmMatch;
}]);