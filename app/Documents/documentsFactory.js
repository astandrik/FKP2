module.exports = function ($httpCached, $errorHandler) {
  return {
    getList: function() {
      var url = '/data/documentfilter';
      return $httpCached.get(url);
    },
    getById: function getById(id) {
      var url = 'data/project?id=' + id;
      return $httpCached.get(url);
    }
  };
};
