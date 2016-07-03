angular.module('app').factory('nmUser', function($resource){
    var userResource = $resource('/api/users/:id',{id:"@id"}, {
        update: {method: 'PUT', isArray : false},
        get: {
            method:'GET',
            isArray: true,
            transformResponse: function(data, header) {
                return angular.fromJson(data).items;
            }
        }
    });

    userResource.prototype.isAdmin = function(){
        return this.Role && this.Role.indexOf('admin') > -1;
    }

    userResource.prototype.isPremium = function(){
        return this.Role && this.Role.indexOf('premiun') > -1;
    }

    return userResource;
});
