angular.module('app').value('nmToastr',toastr);

angular.module('app').factory('nmNotifier', function(nmToastr){
    return {
        notify: function(msg){
            nmToastr.success(msg);
            console.log(msg);
        },
        error: function(msg){
            nmToastr.error(msg);
            console.log(msg);
        }
    }
});