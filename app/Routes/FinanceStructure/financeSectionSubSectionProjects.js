'use strict';


var helpers = require('./financeStructureHelper');
var makeFilters = require('./filterMaker');
var breadcrumbs = require('../breadcrumbs.js');

var entity = {
  url: ':subsection_id/subsection/:subsectionId',
  views: {
    'content@': {
      templateUrl: 'app/Routes/FinanceStructure/finance.html',
      controller: function controller($scope, $interpolate, financeSections, $stateParams, projectsCatalog,sectionsCatalog, subSectionsCatalog, $state, events) {
        makeFilters($scope, {projectsCatalog, sectionsCatalog, subSectionsCatalog}, $state)
        var currentSection = helpers.findElemsInTree(financeSections, $stateParams.sectionId, 2)[0];
        var currentSubSection = helpers.findElemsInTree(currentSection.children, $stateParams.subsectionId, 1)[0];
        $scope.sections = currentSubSection.children.map((item) => Object.assign(item, {finance: helpers.prepareSection(item.finance)}));
        var tables = helpers.getFinanceTables($scope.sections);
        $scope.financeBudget = tables.Budget;
        $scope.financeOwn = tables.Own;
        $scope.basename = 'Название';

        $scope.currName = currentSubSection.name;
        $scope.parentCurrName = currentSection.name;
        breadcrumbs.init($interpolate, 'financeSubSection', $scope);
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.financeSubSection
};

module.exports = entity;
