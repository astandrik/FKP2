var runner = require('./cacheRunner.js');

var currentModule = angular.module('cache-custom', ['angular-cache','errorsModule'])


currentModule.service('$cacheRunner', runner);

currentModule.factory('$httpCached', function($http, CacheFactory) {
  return {
    get: function(url, params, errorHandler) {
        if (!CacheFactory.get(url)) {
          CacheFactory.createCache(url, {
            deleteOnExpire: 'passive',
            recycleFreq: 6000000
          });
        }
        var Cache = CacheFactory.get(url);
        var par = params;
        if(!params) {
          params = { cache: Cache };
        } else {
          params['cache'] = Cache;
        }
        return $http.get(url, params);
    }
  }

})
