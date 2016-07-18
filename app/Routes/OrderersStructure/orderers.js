'use strict';
var helpers = require('./orderersHelper.js');
module.exports = {
  url: '/Orderers',
  views: {
    'content@': {
      templateUrl: 'app/Routes/OrderersStructure/orderers.html',
      controller: 'OrderersStructureController',
        resolve: {
          treeData: function treeData($accordion, $orderersDict) {
            return $accordion.getTree('data/organizations').then(function (response) {
              helpers.appendHrefs(response, 'home.orderers', $orderersDict);
              return response.data;
            });
          }
        }
    }
  },
  ncyBreadcrumb: { label: 'Заказчики' }
}
