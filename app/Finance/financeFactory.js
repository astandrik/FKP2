module.exports = function ($httpCached, $errorHandler, $state) {
  return {
    getList: function() {
      var url = '/filter/finance';
      return $httpCached.get(url);
    },
    getListFilter: function(filters) {
      var url = '/filter/finance';
      var filtered = [];
      if(filters.from) {
        filtered.push('from=' + new Date(filters.from).format('yyyy'));
      }
      if(filters.to) {
        filtered.push('to=' + new Date(filters.to).format('yyyy'));
      }
      if(filters.section_id) {
        filtered.push('section_id=' + filters.section_id)
      }
      if(filters.subsection_id) {
        filtered.push('subsection_id=' + filters.subsection_id)
      }
      if(filters.project_id) {
        filtered.push("project_id=" + filters.project_id)
      }
      return $httpCached.get(url + (filtered.length > 0 ? '?' + filtered.join('&') : '') )
    },
    getById: function getById(id) {
      var url = 'data/project?id=' + id;
      return $httpCached.get(url);
    }
  };
};
