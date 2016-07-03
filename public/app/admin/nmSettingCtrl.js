angular.module('app').controller('nmSettingCtrl', function($http, $scope,nmCachedStates,nmNotifier,nmState, nmCategory,nmCachedCategories, nmSponsoredAds, nmCachedSponsoredAds ){
    $scope.states = nmCachedStates.query();
    $scope.categories = nmCachedCategories.query();
    $scope.categoryItems;
    $scope.formData = {};
    $scope.ads = nmCachedSponsoredAds.query();
    $scope.categoryChange = function(categoryId) {
         return nmCategory.get({id:categoryId});
    };
    $scope.addCategory = function() {
        var newCat = {
            Name: $scope.formData.category,
            ImageUrl: $scope.formData.categoryImageUrl
        };
        var cat = new nmCategory(newCat);
        cat.$save().then(function(response){
            $scope.categories = response.category;
            nmNotifier.notify('Category added suucessfully');
        }).catch(function(err){
            console.log('the res is', err);
        });
    };
    $scope.removeCategory = function(category){
       if(category) {
            $http({
                method: 'DELETE',
                url: '/api/categories',
                data: {id:category.id, category: category.Name},
                params: {id: category.id},
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            }).then(function(response){
                console.log('the response is', response);
                $scope.categories = response.data.category;
                nmNotifier.notify('Category deleted suucessfully');
            }).catch(function(err){
                console.log('the res is', err);
            });
       }
    };
    $scope.addCategoryItem = function() {
        var item = {
            Item: $scope.formData.categoryItem,
        };
        var cat = new nmCategory(item);
        cat.$save({id: $scope.formData.categoryItemCategory}).then(function(response){
            $scope.categories = response.category;
            nmNotifier.notify('CategoryItems added suucessfully');
        }).catch(function(err){
            console.log('the res is', err);
        });
    };
    $scope.removeCategoryItem = function(item){
       if(item) {
             $http({
                method: 'DELETE',
                url: '/api/categories',
                data: {id:item.id},
                params: {id: item.id},
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            }).then(function(response){
                $scope.categories = response.data.category;
                nmNotifier.notify('CategoryItem deleted suucessfully');
            }).catch(function(err){
                console.log('the res is', err);
            });
       }
    };
   $scope.addSponsoredAd = function() {
     var newAd = {
         AdsUrl : $scope.formData.AdsUrl,
         RedirectUrl: $scope.formData.RedirectUrl,
         Customer: $scope.formData.Customer,
         Height: $scope.formData.Height,
         Width: $scope.formData.Width,
         Expires: $scope.formData.Expires
     };
     ad = new nmSponsoredAds(newAd);
     ad.$save().then(function(response){
         $scope.ads = response.sponsoredAds;
         nmNotifier.notify('Sponsored Ad added suucessfully');
     }).catch(function(err){
         console.log('the res is', err);
     });
   };
   $scope.removeAd = function(sponsoredAd) {
       if(sponsoredAd) {
           var newAd = {
                AdsUrl : sponsoredAd.AdsUrl,
                RedirectUrl: sponsoredAd.RedirectUrl,
                Customer: sponsoredAd.Customer,
                Height: sponsoredAd.Height,
                Width: sponsoredAd.Width,
                Expires: sponsoredAd.Expires
           };
           var ad = new nmSponsoredAds(newAd);
           
           ad.$delete({id:sponsoredAd.id}).then(function(response){
                $scope.ads = response.sponsoredAds;
                nmNotifier.notify('Sponsored Ad deleted suucessfully');
            }).catch(function(err){
                console.log('the res is', err);
            });
       }
   };
   $scope.addState = function() {
       if($scope.formData.state) {
           var state = new nmState({state:$scope.formData.state});
           state.$save().then(function(response){
                $scope.states = response.states;
                nmNotifier.notify('state added suucessfully');
            }).catch(function(err){
                console.log('the res is', err);
            });
       }
   };
   $scope.removeState = function(state){
       if(state) {
           var state = new nmState({id:state.id, State: state.State});
           state.$delete({id:state.id}).then(function(response){
                $scope.states = response.states;
                nmNotifier.notify('State deleted suucessfully');
            }).catch(function(err){
                console.log('the res is', err);
            });
       }
   }
});
