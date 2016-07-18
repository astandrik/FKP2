module.exports = function ($httpCached, $errorHandler) {
  return {
    getList: function() {
      var url = '/data/news';
      return $httpCached.get(url);
    }
  };
};
