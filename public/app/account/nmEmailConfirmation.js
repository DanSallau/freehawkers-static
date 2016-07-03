angular.module('app').factory('nmEmailConfirmation', function($resource){
    var userResource = $resource('/api/user/confirm-email/:username', {username:"@username"},{
        update: {method: 'PUT', isArray : false},
    });

    userResource.prototype.isActiveToken = function(){
        return this.Status && this.Status.indexOf('Active') > -1;
    };

    return userResource;
});
