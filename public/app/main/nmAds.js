angular.module('app').factory('nmAds', function($resource){
    var postResource = $resource('/api/homeAds/:id',{id:"@id"},{
         get: {method: 'GET', isArray: true }
    });

    return postResource;
});
