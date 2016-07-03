angular.module('app').factory('nmCachedCategories',function(nmCategory){
    var categories;
    return{
        query: function() {
            if(!categories) {
                categories = nmCategory.query();
            }
            
            return categories;
        }
    }
});