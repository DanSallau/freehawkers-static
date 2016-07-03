angular.module('app').factory('nmCategory', function($resource){
    var categoryResource = $resource('/api/categories/:id',{id:"@id"}, {
        update: {method: 'PUT', isArray : false},
        get: {method: 'GET', isArray: true }
    });

    return categoryResource;
});
