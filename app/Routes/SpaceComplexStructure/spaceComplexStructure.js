'use strict';
var helpers = require('./spaceComplexHelper.js');
var structure = {
  url: '/SpaceComplexStructure',
  views: {
    'content@': {
      templateUrl: 'app/Routes/SpaceComplexStructure/spaceComplex-page.html',
      controller: 'SpaceComplexStructureController',
      resolve: {
        treeData: function treeData($accordion, $complexDict) {
          return $accordion.getTree('data/spacetree').then(function (response) {
            helpers.appendHrefs(response, 'home.spaceComplexStructure', $complexDict);
            return response.data;
          });
        }
      }
    }
  },
  ncyBreadcrumb: {
    label: 'Космические комплексы',
    toolTipInterpolated: 'Космические комплексы'
  }
};
module.exports = structure;
