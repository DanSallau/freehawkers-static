angular.module('app').factory('nmFilterAdByUsername', function($resource){
    var queryRes = $resource('/api/filter-by-username/:username',{username:"@username"}, {
        update: {method: 'PUT', isArray : false}
    });

    return queryRes;
});
