//['$scope', '$http','nmNotifier','Upload','nmAdController', '$location',
angular.module('app').controller('nmPostAdCtrl', function($scope, $http, nmNotifier,Upload, nmAdController, $location, nmCachedCategories,nmCategory, nmCachedStates){
   
    $scope.formData = {};
    $scope.formIsReady = false;
    $scope.uploadProgress = '';
    $scope.number = 1;
    $scope.categoriesOptions = nmCachedCategories.query();
  
    $scope.categoryItems = [{id:0 , Item: 'Select One'}];
    $scope.states = nmCachedStates.query();
    var array = {};
    var deleted = [];
    $scope.categoryChange = function(categoryid) {
        $scope.categoryItems = nmCategory.get({id:categoryid});
    };
    
    $scope.submitAd = function(){
    	var data = {
    		Title: $scope.formData.productTitle,
    		MarketPrice: $scope.formData.marketPrice,
    		SellingPrice: $scope.formData.sellingPrice,
    		Negotiable:  $scope.formData.priceNegotiable,
    		Condition: $scope.formData.itemCondition,
    		Description: $scope.formData.adDescription,
            State: $scope.formData.state,
            ImageLink: $scope.formData.imageLink,
            ImageDesc: $scope.formData.imageDesc,
            CategoryId: $scope.formData.category,
            CategoryItemId: $scope.formData.categoryItem
    	};
        
        nmAdController.createAd(data).then(function(){
            nmNotifier.notify('Ad has been created');
            $location.path('/ads');
        })
        .catch(function(error){
            console.log(error);
            nmNotifier.error(error.data.reason);  
        });

    };
    $scope.getArray = function(num){
        for(var i = 0 ; i < num;i++){
            if(deleted.indexOf(i + 1) > -1) continue;
            array[i] = i +1;
        }
      
        return array;
    };
    $scope.removeItem = function(index) {
        if($scope.formData.imageLink) {
            delete $scope.formData.imageLink[index];
        }
        if($scope.formData.imageDesc){
            delete $scope.formData.imageDesc[index];
        }
        if(index < $scope.number) {
            delete array[index -1];
        }
       
        if(index >= $scope.number && index > 1) {
           delete array[index - 1];
        }
        deleted.push(index);
    };
    
    $scope.addItem = function() {
        $scope.number ++;  
    };
    $scope.onFileSelect = function(files) {
        var query;
        if (files.length > 0) {
            var filename = files[0].name;
            var type = files[0].type;
            query = {
                filename: filename,
                type: type
            };
        } else {
            return null;
        }
        $http.post('/sign_s3', query).then(function(response){
           // nmFileUpload.upload(files);
            var result = response.data;
            var index = $scope.number;
            $scope.uploadProgress = '';
            Upload.upload({
                url: result.url, //s3Url
                transformRequest: function(data, headersGetter) {
                    var headers = headersGetter();
                    delete headers.Authorization;
                    return data;
                },
                fields: result.fields, //credentials
                method: 'POST',
                file: files[0]
            }).progress(function(evt) {
                $scope.formIsReady = false;
                $scope.uploadProgress = 'progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '%';
            }).success(function(data, status, headers, config) {
                // file is uploaded successfully
                $scope.formData.imageLink[index] = (result.url + result.fields.key);
                $scope.formIsReady = true;
                nmNotifier.notify('file ' + config.file.name + ' is uploaded sucessfully.');
            }).error(function(e) {
                delete $scope.formData.imageLink[index];
                nmNotifier.error('file ' + query.filename + ' upload failed');
                console.log(e);
            });
        },function(err) {
            nmNotifier.error('file ' + query.filename + ' upload failed');
            console.log(err.toString());
        })
        .catch(function(e){
            nmNotifier.error('file ' + query.filename + ' upload failed');
            console.log(e.toString());
        });
    };
});