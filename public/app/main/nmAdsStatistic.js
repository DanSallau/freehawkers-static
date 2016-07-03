angular.module('app').factory('nmAdsStatistic', function($resource){
    var statistic = $resource('/api/ads-statistic/:active',{active:"@active"},{
        query:{method: 'GET', isArray: false}
    });

    return statistic;
});
