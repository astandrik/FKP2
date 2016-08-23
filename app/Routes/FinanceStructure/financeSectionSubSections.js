'use strict';

var helpers = require('./financeStructureHelper');
var makeFilters = require('./filterMaker');
var breadcrumbs = require('../breadcrumbs.js');

var entity = {
  url: '/section/:sectionId',
  views: {
    'content@': {
      templateUrl: 'app/Routes/FinanceStructure/finance.html',
      controller: function controller($scope, $interpolate, financeSections, $stateParams, projectsCatalog,sectionsCatalog, subSectionsCatalog, $state, events) {
        makeFilters($scope, {projectsCatalog, sectionsCatalog, subSectionsCatalog}, $state);
        var currentSection = helpers.findElemsInTree(financeSections, $stateParams.sectionId, 2)[0];
        $scope.sections = currentSection.children.map((item) => Object.assign(item, {finance: helpers.prepareSection(item.finance)}));
        var tables = helpers.getFinanceTables($scope.sections);
        $scope.financeBudget = tables.Budget;
        $scope.financeOwn = tables.Own;
        $scope.basename = 'Название';
        $scope.parentCurrName = currentSection.name;
        breadcrumbs.init($interpolate, 'financeSection', $scope);
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.financeSection
};

module.exports = entity;
