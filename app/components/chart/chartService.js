'use strict';
function CS($http) {
  return {
    getData: function getData(url) {      
      return $http.get(url);
    }
  };
}
module.exports = CS;
