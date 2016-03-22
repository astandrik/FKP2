'use strict';
module.exports = function ($http) {
  this.getTree = function (url) {
    return $http.get(url);
  };
};