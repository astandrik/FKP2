'use strict';
var helpers = require('./orderersHelper.js');
var breadcrumbs = require('../breadcrumbs.js');
module.exports = {
  url: '/:ordererId',
  views: {
    'orderersInfo@home.orderers': {
      templateUrl: 'app/Routes/OrderersStructure/card/orderers-card.html',
      controller: function(orderer, $scope, tabstripData){
        $scope.tabstripData = tabstripData;
        $scope.orderer = orderer;
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.orderer,
  resolve: {
    orderer: function project($http, $orderersFactory, $stateParams) {
      var id = $stateParams.ordererId;
      return $orderersFactory.getById(id).then(function (data) {
        return data.data.data;
      });
    },
    tabstripData: function tabstripData($stateParams) {
        var tabs = [];
        tabs.push({
          name: 'Контактные данные',
          state: 'orderersSection',
          type: 'contacts'
        });
        tabs.push({
          name: 'Общие сведения',
          state: 'orderersSection',
          type: 'general'
        });
        tabs.push({
          name: 'Связанные проекты',
          state: 'orderersSection',
          type: 'relatedProjects'
        });
        return tabs;
    }
  }
}
