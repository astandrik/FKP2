'use strict';

var helpers = require('./financeStructureHelper');

function sumObject(obj) {
  var sum = 0;
  for (var e in obj) {
    if (!isNaN(obj[e]))
      sum += obj[e];
  }
  return sum;
}

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


var structure = {
  url: '/financeStructure',
  views: {
    'content@': {
      templateUrl: 'app/Finance/finance.html',
      controller: function controller($scope, treeData,sectionsData) {
        $scope.section = _.cloneDeep(sectionsData);
        $scope.budgetShown=true;
        $scope.showBudget = () => $scope.budgetShown=true;
        $scope.showOwn = () => $scope.budgetShown=false;

        prepareSection($scope.section);
        var tables = getFinanceTables($scope.section);
        $scope.financeBudget = tables.Budget;
        $scope.financeOwn = tables.Own;
        $scope.basename = 'Название';
      }
    }
  },
  ncyBreadcrumb: {
    label: 'Финансирование',
    toolTipInterpolated: 'Финансирование'
  },
  resolve:{
    treeData: function treeData($accordion, $projectsDict) {
      return $accordion.getTree('data/tree').then(function (response) {
        helpers.appendHrefs(response, 'home.financeStructure', $projectsDict);
        return response.data;
      });
    },
    sectionsData: function($httpCached) {
      var url = '/data/finance';
      return $httpCached.get(url).then((data)=> data.data.data);
    }
  }
};
module.exports = structure;
