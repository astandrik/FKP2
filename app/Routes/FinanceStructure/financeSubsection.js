'use strict';
var breadcrumbs = require('../breadcrumbs.js');

var helpers = require('./financeStructureHelper');
function prepareSubSection(finance) {
  for (var e in finance) {
    if (isNaN(finance[e])) {
      prepareSubSection(finance[e]);
    } else {
      finance[e] = parseFloat(finance[e]) / 1000000;
    }
  }
}
function getFinanceTables(finance) {
  var projectsBudget = [];
  var projectsOwn = [];
  for (var e in finance) {
    var projectBudget = { 'Название': e };
    var projectOwn = { 'Название': e };
    for (var y in finance[e]['Финансирование за счет бюджетных средств']) {
      projectBudget[y] = finance[e]['Финансирование за счет бюджетных средств'][y];
    }
    for (var y in finance[e]['Финансирование из собственных средств']) {
      projectOwn[y] = finance[e]['Финансирование из собственных средств'][y];
    }
    projectsBudget.push(projectBudget);
    projectsOwn.push(projectOwn);
  }
  return {
    'Budget': projectsBudget,
    'Own': projectsOwn
  };
}
var breadcrumbs = require('../breadcrumbs.js');
var entity = {
  url: '/subsection/:subsectionId',
  views: {
      'content@': {
        templateUrl: 'app/Routes/FinanceStructure/finance.html',
      controller: function controller($scope, financeSubsection, financeSection, $interpolate,treeData,$projectsDict) {
        $scope.budgetShown=true;
        $scope.showBudget = () => $scope.budgetShown=true;
        $scope.showOwn = () => $scope.budgetShown=false;

        $scope.subsection = _.cloneDeep(financeSubsection);
        $scope.section = financeSection;
        prepareSubSection($scope.subsection.finance);
        var tables = getFinanceTables($scope.subsection.finance);
        $scope.financeBudget = tables.Budget;
        $scope.financeOwn = tables.Own;
        $scope.finance = tables.Budget;
        $scope.basename = 'Название';
        breadcrumbs.init($interpolate, 'financeSubSection', $scope);
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.financeSubSection,
  resolve: {
    financeSubsection: function subsection($http, $stateParams, $subsectionFactory) {
      var id = $stateParams.subsectionId;
      return $subsectionFactory.getById(id).then(function (data) {
        return data.data.data;
      });
    }
  }
};
module.exports = entity;
