angular.module('app').controller('nmStatesCtrl', function($scope,nmCachedStates ){
    $scope.states = nmCachedStates.query();
});
