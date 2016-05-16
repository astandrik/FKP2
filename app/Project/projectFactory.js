'use strict';
module.exports = function projectFactory($httpCached, $errorHandler) {
  return {
    getById: function getById(id) {
      var url = 'data/project?id=' + id;
      return $httpCached.get(url);
    }
  };
};
