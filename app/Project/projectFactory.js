'use strict';
module.exports = function projectFactory($httpCached) {
  return {
    getById: function getById(id) {
      return $httpCached.get('data/project?id=' + id);
    }
  };
};
