angular.module('app').controller('nmProfileCtrl',function($scope,nmIdentity, nmAuth,nmNotifier, $location, $http, Upload){
    $scope.formData = {
        fname: nmIdentity.currentUser.FirstName,
        lname: nmIdentity.currentUser.LastName,
        username: nmIdentity.currentUser.Username,
        email: nmIdentity.currentUser.Email,
        contact: nmIdentity.currentUser.Contact,
        address: nmIdentity.currentUser.Address,
        profilePic: nmIdentity.currentUser.ProfilePicture,
        showEmail: nmIdentity.currentUser.Show_Contact
    };
    $scope.formIsReady = true;
    $scope.uploadProgress = '';
    $scope.removeItem = function() {
        $scope.formData.profilePic = '';
    };
    $scope.updateProfile = function(){

        var newUserData = {
            FirstName : $scope.formData.fname,
            LastName: $scope.formData.lname,
            Username: $scope.formData.username,
            Show_Contact: $scope.formData.showEmail,
            Email: $scope.formData.email,
            Contact: $scope.formData.contact,
            Address: $scope.formData.address,
            ProfilePicture: $scope.formData.profilePic
        };

        if($scope.formData.newPassword && $scope.formData.newPassword.length > 0 ){
            newUserData.newPassword = $scope.formData.newPassword;
            newUserData.Password = $scope.formData.currentPassword;
        }

        nmAuth.updateCurrentUser(newUserData).then(function(response){

            if(response.success && response.password_change){
                signout()
            } else if(response.success && !response.password_change){
                nmNotifier.notify('changes saved successfully');
            } else {
                nmNotifier.notify('Operation failed');
            }
        })
        .catch(function(err){

            var error = err.data.reason.errors[0];
            if(error.type === "unique violation") {
                nmNotifier.error( error.path + " exist. Please use different one.");
            } else {
                nmNotifier.error(error.message);
            }
        });    
    };
    
    $scope.onFileSelect = function(files) {
        var query;

        if (files.length > 0) {
            var filename = files[0].name;
            var type = files[0].type;
            query = {
                filename: filename,
                type: type,
                profilePic: true
            };
        } else {
            return null;
        }
        
        $http.post('/sign_s3', query).then(function(response){

            var result = response.data;
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
                $scope.formData.profilePic = (result.url + result.fields.key);
                $scope.formIsReady = true;
                nmNotifier.notify('file ' + config.file.name + ' is uploaded sucessfully.');
            }).error(function(e) {
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


    var signout = function () {
        nmAuth.logoutUser().then(function(){
            $scope.formData.newPassword = '';
            $scope.formData.currentPassword = '';
            $scope.formData.rePassword = '';
            $location.path('/login');
            nmNotifier.notify('Password changed, Please login to proceed!');

        });
    }


});