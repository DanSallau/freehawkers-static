angular.module('app').factory('nmFilterAdBySearchText', function($resource){
    var queryRes = $resource('/api/filter-by-searchText/:searchText',{searchText:"@searchText"}, {
        update: {method: 'PUT', isArray : false}
    });

    return queryRes;
});
