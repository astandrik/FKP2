'use strict';
function CS($httpCached) {
  return {
    getData: function getData(url) {
      return $httpCached.get(url);
    }
  };
}
function CS1($httpCached) {
  return {
    getData: function getData(url) {
      return $httpCached.get(url);
    }
  };
}
module.exports = {
  barChart: CS,
  pieChart: CS1
};
