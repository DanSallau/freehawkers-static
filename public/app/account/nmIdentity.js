angular.module('app').factory('nmIdentity',function($window, nmUser){
    var currentUser;
    if(!!window.bootstrappedUserObject){
        currentUser = new nmUser();
        angular.extend(currentUser,  window.bootstrappedUserObject);
    }
    return{
        currentUser: currentUser,
        isAutheticated: function(){
            return !!this.currentUser;
        },
        isAuthorized: function(role){
            return !!this.currentUser && this.currentUser.Role.indexOf(role) > -1;
        }
    }
});