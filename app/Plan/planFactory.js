'use strict';
module.exports = function planFactory($httpCached, $errorHandler) {
  return {
    getById: function getById(id) {
      var url = 'data/plan?id=' + id;
      return $httpCached.get(url);
    }
  };
};
