var helpers = require('./projectHelper.js');
var structure = {
  url: '/ProjectStructure',
  views: {
    'content@': {
      templateUrl: 'app/Project/project-page.html',
      controller: 'projectController',
      resolve: {
        treeData: function treeData($accordion) {
          return $accordion.getTree('data/tree').then(function (response) {
            helpers.appendHrefs(response, 'home.projectStructure');
            return response.data;
          });
        }
      }
    }
  },
  ncyBreadcrumb: { label: 'Структура программы', toolTipInterpolated: 'Структура программы' }
};


module.exports = structure;
