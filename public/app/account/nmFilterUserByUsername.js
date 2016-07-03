angular.module('app').factory('nmFilterUserByUsername', function($resource){
    var userResource = $resource('/api/filter-user-by-username/:username',{username:"@username"}, {
        update: {method: 'PUT', isArray : false},
        query: {method: 'GET', isArray : false}
    });

    return userResource;
});
