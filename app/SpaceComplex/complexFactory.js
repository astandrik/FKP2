'use strict';
module.exports = function complexFactory($http) {
  return {
    getById: function getById(id) {
      return $http.get('testData/complex.json');
    }
  };
};
