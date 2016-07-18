'use strict';


var helpers = require('./financeStructureHelper');
function prepareSection(finance) {
  for (var e in finance) {
    if (isNaN(finance[e])) {
      prepareSection(finance[e]);
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
  url: '/section/:sectionId',
  views: {
    'content@': {
      templateUrl: 'app/Routes/FinanceStructure/finance.html',
      controller: function controller($scope, treeData, $interpolate, $stateParams,$projectsDict,financeSection) {
        $scope.budgetShown=true;
        $scope.showBudget = () => $scope.budgetShown=true;
        $scope.showOwn = () => $scope.budgetShown=false;

        $scope.section = _.cloneDeep(financeSection);
        prepareSection($scope.section.finance);
        var tables = getFinanceTables($scope.section.finance);
        $scope.financeBudget = tables.Budget;
        $scope.financeOwn = tables.Own;

        $scope.basename = 'Название';
        breadcrumbs.init($interpolate, 'financeSection', $scope);
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.financeSection,
  resolve:{
    financeSection: function section($http, $stateParams, $sectionFactory) {
      var id = $stateParams.sectionId;
      return $sectionFactory.getById(id).then(function (data) {
        return data.data.data;
      });
    }
  }
};

module.exports = entity;
