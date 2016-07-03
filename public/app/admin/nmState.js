angular.module('app').factory('nmState', function($resource){
    var stateResource = $resource('/api/states/:id',{id:"@id"}, {
        update: {method: 'PUT', isArray : false},
        save: {method:'POST', isArray: false},
        get: {method: 'GET', isArray: true },
        delete: {method: 'DELETE', isArray: false}
    });

    return stateResource;
});
