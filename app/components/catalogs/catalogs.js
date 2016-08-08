var currentModule = angular.module('catalogs', []);
currentModule.factory('$catalogs',
 function($httpCached) {
   return {
     getByType: function(type) {
       return $httpCached.get('/catalog?type=' + type);
     }
   }
 });
