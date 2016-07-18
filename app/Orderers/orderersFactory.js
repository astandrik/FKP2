'use strict';
module.exports = function orderersFactory($httpCached) {
  return {
    get: function() {
      var url = '/data/organizations';
      return $httpCached.get(url);
    },
    getById: function getById(id) {
      return $httpCached.get('data/organization/?id=' + id);
    }
  };
};
