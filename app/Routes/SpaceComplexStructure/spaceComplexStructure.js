var helpers = require('./spaceComplexHelper.js');

var structure = {
  url: '/SpaceComplexStructure',
  views: {
    'content@': {
      templateUrl: 'app/SpaceComplex/spaceComplex-page.html',
      controller: 'SpaceComplexStructureController',
      resolve: {
        treeData: function treeData($accordion) {
          return $accordion.getTree('data/spacetree').then(function (response) {
            helpers.appendHrefs(response, 'home.spaceComplexStructure');
            return response.data;
          });
        }
      }
    }
  },
  ncyBreadcrumb: { label: 'Космические комплексы', toolTipInterpolated: 'Космические комплексы' }
};


module.exports = structure;
