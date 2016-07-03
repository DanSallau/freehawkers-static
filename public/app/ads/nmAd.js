angular.module('app').factory('nmAd', function($resource){
    var postResource = $resource('/api/ads/:id',{id:"@id"}, {
        update: {method: 'PUT', isArray : false},
        delete: {method: 'DELETE', isArray: false},
        get: {method: 'GET', isArray: true }
    });

    return postResource;
});
