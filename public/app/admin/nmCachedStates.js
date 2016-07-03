angular.module('app').factory('nmCachedStates',function(nmState){
    var states;
    return{
        query: function() {
            if(!states) {
                states = nmState.query();
            }
            
            return states;
        }
    }
});