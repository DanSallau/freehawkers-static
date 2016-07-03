angular.module('app').controller('nmEditAdCtrl', function($scope,$routeParams, $http, nmNotifier,Upload, nmAdController, $location, nmCachedCategories,nmCategory, nmAd, nmCachedStates){
    
    $scope.formIsReady = false;
    $scope.uploadProgress = '';
    $scope.number = 0;
    $scope.categoriesOptions = nmCachedCategories.query();
  
    $scope.categoryItems = [{id:0 , Item: 'Select One'}];
    $scope.states = nmCachedStates.query();
    nmAd.get({id:$routeParams.id}).$promise.then(function(item){
        $scope.adItems = item[0];
        $scope.categoryChange(item[0].CategoryId);
        $scope.formData = {
            productTitle: item[0].Title,
            marketPrice: parseFloat(item[0].MarketPrice),
            sellingPrice: parseFloat(item[0].SellingPrice),
            priceNegotiable:  item[0].Negotiable ? 'Yes' : 'No',
            itemCondition: item[0].Condition,
            adDescription: item[0].Description,
            state: item[0].State,
            imageLink: { },
            imageDesc: { },
            imageItemId: { },
            category: item[0].CategoryId,
            categoryItem: item[0].CategoryItemId
        };
        //$scope.formData.CategoryItemId = 1;
        for(var i=0; i < item[0].AdItems.length; i++) {
            $scope.number ++;
            $scope.formData.imageItemId[$scope.number] = item[0].AdItems[i].id;
            $scope.formData.imageLink[$scope.number] = item[0].AdItems[i].ImageUrl;
            $scope.formData.imageDesc[$scope.number] = item[0].AdItems[i].ImageDescription;
        }
        $scope.formIsReady = true;
    });

    var array = {};
    var deleted = [];
    $scope.categoryChange = function(categoryid) {
        $scope.categoryItems = nmCategory.get({id:categoryid});
    };
    $scope.deleteAd = function(){
        var ad = new nmAd($scope.formData);
        ad.$delete({id:$routeParams.id}).then(function(response){
            nmNotifier.notify('Ad deleted suucessfully');
            $location.path('/welcome');
        }).catch(function(err){
            console.log('the res is', err);
        });
    }
    $scope.submitAd = function(){
    	var data = {
            Id: $routeParams.id,
    		Title: $scope.formData.productTitle,
    		MarketPrice: $scope.formData.marketPrice,
    		SellingPrice: $scope.formData.sellingPrice,
    		Negotiable:  $scope.formData.priceNegotiable,
    		Condition: $scope.formData.itemCondition,
    		Description: $scope.formData.adDescription,
            State: $scope.formData.state,
            ImageLink: $scope.formData.imageLink,
            ImageDesc: $scope.formData.imageDesc,
            ImageItemId: $scope.formData.imageItemId,
            CategoryId: $scope.formData.category,
            CategoryItemId: $scope.formData.categoryItem
    	};
        
        nmAdController.updateAd(data).then(function(){
            nmNotifier.notify('Ad has been updated successfully');
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
    
    $scope.addItem = function(index) {
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
                console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function(data, status, headers, config) {
                // file is uploaded successfully
                $scope.formData.imageLink[index] = (result.url + result.fields.key);
                console.log('the form data', $scope.formData);
                $scope.formIsReady = true;
                nmNotifier.notify('file ' + config.file.name + ' is uploaded sucessfully.');
                console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + result.url + result.fields.key);
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