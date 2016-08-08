module.exports = function ($httpCached, $errorHandler) {
  return {
    getList: function() {
      var url = '/filter/document';
      return $httpCached.get(url);
    },
    getListFilter: function(filters) {
      var url = '/filter/document';
      var filtered = [];
      if(filters.from) {
        filtered.push('from=' + filters.from.format('yyyy-mm-dd'));
      }
      if(filters.to) {
        filtered.push('to=' + filters.to.format('yyyy-mm-dd'));
      }
      if(filters.project_type) {
        filtered.push('project_type=' + filters.project_type);
      }
      if(filters.project_subsection) {
        filtered.push('project_subsection=' + filters.project_subsection);
      }
      if(filters.project) {
        filtered.push('project=' + filters.project);
      }
      return $httpCached.get(url + (filtered.length > 0 ? '?' + filtered.join('&') : '') )
    },
    getById: function getById(id) {
      var url = 'data/project?id=' + id;
      return $httpCached.get(url);
    }
  };
};
