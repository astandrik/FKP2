'use strict';
module.exports = function ($httpCached) {
  return {
    getById: function getById(id) {
      return $httpCached.get('data/section?id=' + id);
    }
  };
};
