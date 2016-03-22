function DTS($http) {
  return {
    getTable: function(url){
      return $http.get(url);
    }
  }
}

module.exports = DTS;
