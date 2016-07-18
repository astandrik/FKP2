'use strict';
var helpers = require('./projectHelper.js');
var structure = {
  url: '/ProjectStructure',
  views: {
    'content@': {
      templateUrl: 'app/Routes/ProjectStructure/project-page.html',
      controller: 'projectController',
      resolve: {
        treeData: function treeData($accordion, $projectsDict) {
          return $accordion.getTree('data/tree').then(function (response) {
            helpers.appendHrefs(response, 'home.projectStructure', $projectsDict);
            return response.data;
          });
        }
      }
    }
  },
  ncyBreadcrumb: {
    label: 'Структура программы',
    toolTipInterpolated: 'Структура программы'
  }
};
module.exports = structure;
