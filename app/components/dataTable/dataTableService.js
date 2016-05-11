'use strict';
function DTS($httpCached) {
  return {
    getTable: function getTable(url) {
      return $http.httpCached(url);
    }
  };
}
module.exports = DTS;
