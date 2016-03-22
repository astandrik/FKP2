'use strict';
function DTS($http) {
  return {
    getTable: function getTable(url) {
      return $http.get(url);
    }
  };
}
module.exports = DTS;