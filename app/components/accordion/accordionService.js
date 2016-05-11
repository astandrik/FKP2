'use strict';
module.exports = function ($httpCached) {
  this.getTree = function (url) {
    return $httpCached.get(url);
  }; 
};
