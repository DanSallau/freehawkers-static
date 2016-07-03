angular.module('app').factory('nmUsersStatistic', function($resource){
    var statistic = $resource('/api/users-statistic/:active',{active:"@active"},{
        query:{method: 'GET', isArray: false}
    });

    return statistic;
});
