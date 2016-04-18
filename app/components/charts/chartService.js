'use strict';
function CS($http) {
  return {
    getData: function getData(url) {
      return $http.get(url);
    }
  };
}
function CS1($http) {
  return {
    getData: function getData(url) {
      return $http.get(url);
    }
  };
}
module.exports = {
  barChart: CS,
  pieChart: CS1
};