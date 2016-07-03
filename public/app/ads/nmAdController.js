angular.module('app').factory('nmAdController',function($http, nmIdentity, $q, nmAd){
    return {
        createAd: function(newAdData){
            var newAd = new nmAd(newAdData);
            var dfd = $q.defer();
            if(!nmIdentity.currentUser.Active){
                dfd.reject({data:{reason:'Please to your email to activate account.'}});
                return dfd.promise;
            }
            if(!nmIdentity.currentUser.Contact || !nmIdentity.currentUser.Address){
                dfd.reject({data:{reason:'Please update your profile to post ad'}});
                return dfd.promise;
            }
            newAd.$save().then(function(response){
                //Add created
                dfd.resolve();
            }).catch(function(err){
                dfd.reject(err);
            });
            return dfd.promise;
        },
        updateAd: function(newAdData){
            var newAd = new nmAd(newAdData);
            var dfd = $q.defer();
            if(!nmIdentity.currentUser.Active){
                dfd.reject({data:{reason:'Please to your email to activate account.'}});
                return dfd.promise;
            }
            if(!nmIdentity.currentUser.Contact || !nmIdentity.currentUser.Address){
                dfd.reject({data:{reason:'Please update your profile to post ad'}});
                return dfd.promise;
            }
            newAd.$update({id: newAdData.Id}).then(function(response){
                //Add created
                dfd.resolve();
            }).catch(function(err){
                dfd.reject(err);
            });
            return dfd.promise;
        }
    }

});