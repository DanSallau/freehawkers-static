angular.module('app').controller('nmMainCtrl', function($scope, nmCachedAds, nmCachedSponsoredAds){
    $scope.Ads = nmCachedAds.query();
    $scope.sponsoredAds = nmCachedSponsoredAds.query();
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