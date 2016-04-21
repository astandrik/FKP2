'use strict';
module.exports = function ($http) {
  return {
    getById: function getById(id) {
      return $http.get('data/section?id=' + id);
    }
  };
};
