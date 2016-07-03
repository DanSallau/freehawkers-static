angular.module('app').factory('nmFilterAdByCategory', function($resource){
    var categoryRes = $resource('/api/filter-by-category/:id',{id:"@id"}, {
        update: {method: 'PUT', isArray : false}
    });

    return categoryRes;
});
