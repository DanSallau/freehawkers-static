angular.module('app', ['ngResource', 'ngRoute', 'ngMessages', 'ngFileUpload']);

angular.module('app').config(function($routeProvider,$locationProvider){
    var routeRoleChecks = {
        admin :{
            auth: function(nmAuth){
                return nmAuth.authorizeCurrentUserForRoute('admin');
            }
        },
        user :{
            auth: function(nmAuth){
                return nmAuth.authorizeAuthenticatedUserForRoute();
            }
        },
        authorizedUser: {
            auth: function(nmAuth){
                return nmAuth.checkAuthenticationStatusforRoute();
            }
        }
    };
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl : '/partials/main/main',
            controller: 'nmMainCtrl'
        })
        .when('/category', {
            templateUrl : '/partials/search/filter-ads-by-category',
            controller: 'nmFilterByCategoryCtrl'
        })
        .when('/register', {
            templateUrl : '/partials/account/register',
            controller: 'nmRegisterCtrl',
            resolve: routeRoleChecks.authorizedUser
        })
        .when('/post-ad', {
            templateUrl : '/partials/ads/post-ad',
            controller: 'nmPostAdCtrl',
            resolve: routeRoleChecks.user
        })
        .when('/edit-ad/:id', {
            templateUrl : '/partials/ads/edit-ad',
            controller: 'nmEditAdCtrl',
            resolve: routeRoleChecks.user
        })
        .when('/admin/users',{
            templateUrl: '/partials/admin/user-list',
            controller: 'nmUserListCtrl', resolve : routeRoleChecks.admin
        })
        .when('/admin/settings',{
            templateUrl: '/partials/admin/settings',
            controller: 'nmSettingCtrl', resolve : routeRoleChecks.admin
        })
        .when('/forgot-password',{
            templateUrl: '/partials/account/forgot-password',
            controller: 'nmForgotPasswordCtrl'
        })
        .when('/ads-by-user/:username',{
            templateUrl: '/partials/search/ads-by-user',
            controller: 'nmAdsByUserCtrl'
        })
        .when('/search',{
            templateUrl: '/partials/search/search-ads',
            controller: 'nmSearchCtrl'
        })
        .when('/signup/confirm/:username/:token', {
            templateUrl: '/partials/account/confirm-email',
            controller: 'nmEmailCtrl',
        })
        .when('/profile',{
            templateUrl: '/partials/account/profile',
            controller: 'nmProfileCtrl', resolve: routeRoleChecks.user
        })
        .when('/change-password/:email/:token',{
            templateUrl: '/partials/account/change-password',
            controller: 'nmChangePasswordCtrl', resolve: routeRoleChecks.authorizedUser
        })
        .when('/welcome',{
            templateUrl: '/partials/home/welcome',
            controller: 'nmHomeCtrl', resolve: routeRoleChecks.user
        })
        .when('/ads',{
            templateUrl: '/partials/ads/ads-list',
            controller: 'nmAdsListCtrl'
        })
        .when('/ad/:id',{
            templateUrl: '/partials/main/ad-detail',
            controller: 'nmMainAdDetailCtrl'
        })
        .when('/ads/:id',{
            templateUrl: '/partials/ads/ads-detail',
            controller: 'nmAdDetailCtrl', resolve : routeRoleChecks.user
        })
        .when('/login',{
            templateUrl: '/partials/account/signin',
            controller: 'nmLoginCtrl',
            resolve: routeRoleChecks.authorizedUser
        });

});


angular.module('app').run(function($rootScope, $location ){
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
        if(rejection === 'not authorized'){
            $location.path('/');
        } else if(rejection === 'authorized already') {
            $location.path('/');
        } else if(rejection === 'not authenticated') {
            $location.path('/login');
        }
    })
})