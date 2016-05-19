'use strict';
module.exports = function ($httpCached) {
  return {
    getById: function getById(id) {
      var url = 'data/section?id=' + id;
      return $httpCached.get(url);
    }
  };
};