angular.module('app').controller('nmMainAdDetailCtrl', function($scope, nmIdentity, nmAds,nmCachedAds, $routeParams){
    var data = nmAds.get({id:$routeParams.id});
    $scope.user =  nmIdentity.currentUser;
    $scope.ad = data;
    data.$promise.then(function(item){
        $scope.adItems = item[0];
    });
    $scope.ads = nmCachedAds.query();
    
}).directive('owlCarousel', function(){
    return {
        restrict: 'EA',
        transclude: false,
        link: function (scope, element, attrs) {
            scope.initCarousel = function() {
                // provide any default options you want
                var defaultOptions = {
                    autoplay:true,
                    autoplayTimeout:2500,
                    loop:false,nav : true,
                    responsiveClass:true,
                    margin: 30,
                    responsive:{
                        0:{items:1},
                        767:{items:3},
                        992:{items:4}
                    }
                };
                $(element).owlCarousel(defaultOptions);
            };
        }
    };
})
.directive('owlCarouselItem',[function() {
     return function(scope) {
     if (scope.$last) {
        scope.initCarousel();
     }
    };
}]);