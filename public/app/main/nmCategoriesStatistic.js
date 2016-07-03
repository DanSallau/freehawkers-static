angular.module('app').factory('nmCategoriesStatistic', function($resource){
    var statistic = $resource('/api/categories-statistic/:id',{id:"@id"},{
        query:{method: 'GET', isArray: true}
    });

    return statistic;
});
