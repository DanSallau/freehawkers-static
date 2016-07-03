angular.module('app').controller('nmUserListCtrl', function($scope,$http,nmNotifier, nmUser){
    $scope.users = nmUser.query();
    $scope.formData = {};
    $scope.blockUser = function($event, user){ 
        $event.stopPropagation();
        $event.preventDefault();
        $http({
                method: 'PUT',
                url: '/user/block-user',
                data: {block: $scope.formData.block ,user: user},
                params: {id: user.id},
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            }).then(function(response){
                $scope.users = response.data.users;
                nmNotifier.notify('user blocked sucessfully');
            }).catch(function(err){
                console.log('the res is', err);
            });
    };
})