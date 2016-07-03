angular.module('app').factory('nmAuth',function($http, nmIdentity, $q, nmUser){
    return {
        authenticateUser: function(username, password){
            var dfd = $q.defer();
            $http.post('/login',{username:username, password:password}).then(function(response){
                if(response.data.success){
                    var user = new nmUser();
                    angular.extend(user, response.data.user);
                    nmIdentity.currentUser = user;
                    dfd.resolve(true);
                }
                else{
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        createUser: function(newUserData){
            var newUser = new nmUser(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function(response){
                //email sent
                nmIdentity.currentUser = newUser;
                dfd.resolve();
            }).catch(function(err){
                dfd.reject(err.data.reason);
            });
            return dfd.promise;

        },
        logoutUser: function() {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true }).then(function(){
                nmIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        changeUserPassword: function(newUserData){
            var dfd = $q.defer();

            var clone = angular.copy(nmIdentity.currentUser);

            angular.extend(clone, newUserData);

            clone.$update().then(function(response){
                if(response.user && response.success){
                    var user = new nmUser();
                    angular.extend(user, response.user);
                    nmIdentity.currentUser = user;
                    dfd.resolve(true);
                }
            },function(response){
                dfd.reject(response.data.reason);
            }).catch(function(err){
                console.log(err);
                dfd.reject(err);
            });
            
            return dfd.promise;
        },
        updateCurrentUser: function(newUserData){
            var dfd = $q.defer();

            var clone = angular.copy(nmIdentity.currentUser);

            angular.extend(clone, newUserData);
            
            clone.$update().then(function(response){
                if(response.user && response.success){
                    var user = new nmUser();
                    angular.extend(user, response.user);
                    nmIdentity.currentUser = user;
                    /*
                    if(newUserData.Password && newUserData.Password.length > 0){
                        dfd.resolve({success: true, password_change: true});
                    } else{
                        dfd.resolve({success:true});
                    }*/
                    dfd.resolve(response);
                }
                
            },function(response){
                console.log('the failed is', response);
                dfd.reject(response);
            }).catch(function(error){
                console.log('error fails', response.reason);
                dfd.reject(error);
            });

            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function(role){

            if(nmIdentity.isAuthorized(role)){
                return true
            } else {
                return $q.reject('not authorized');
            }
        },
        authorizeAuthenticatedUserForRoute: function(){
          if(nmIdentity.isAutheticated()){
              return true;
          }
            else{
              return $q.reject('not authenticated');
          }
        },
        checkAuthenticationStatusforRoute: function(){
            if(nmIdentity.isAutheticated()){
                return $q.reject('authorized already');
            } else {
                return true;
            }
        }
    }
})