'use strict';
function CS($httpCached) {
  return {
    getData: function getData(url) {
      return $httpCached.get(url);
    }
  };
}
module.exports = CS;