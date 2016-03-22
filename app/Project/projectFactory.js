'use strict';
module.exports = function projectFactory($http) {
  return {
    getById: function getById(id) {
      return $http.get('testData/project.json');
    }
  };
};