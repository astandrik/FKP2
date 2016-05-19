'use strict';
module.exports = function complexFactory($httpCached) {
  return {
    getById: function getById(id) {
      return $httpCached.get('data/complex?id=' + id);
    }
  };
};