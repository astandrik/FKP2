module.exports = function projectFactory($http) {
  return  {
    getById: function(id) {
      return $http.get('testData/project.json');
    }
  }
}
