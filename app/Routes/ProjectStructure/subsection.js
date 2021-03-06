'use strict';
var breadcrumbs = require('../breadcrumbs.js');
function prepareSubSection(finance) {
  for (var e in finance) {
    if (isNaN(finance[e])) {
      prepareSubSection(finance[e]);
    } else {
      finance[e] = parseFloat(finance[e]) / 1000000;
    }
  }
}
function getFinanceTables(finance,$projectsDict) {
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
    projectBudget.href = $projectsDict.dict[e].href;
    projectOwn.href = $projectsDict.dict[e].href;
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
    'projectInfo@home.projectStructure': {
      templateUrl: 'app/Routes/ProjectStructure/card/subsection-card.html',
      controller: function controller($scope, subsection, section, $interpolate, $projectsDict) {
        $scope.subsection = _.cloneDeep(subsection);
        $scope.section = section;
        prepareSubSection($scope.subsection.finance);
        var tables = getFinanceTables($scope.subsection.finance, $projectsDict);
        $scope.financeBudget = tables.Budget;
        $scope.financeOwn = tables.Own;
        breadcrumbs.init($interpolate, 'section', $scope);
        $scope.basename = 'Название';
        breadcrumbs.init($interpolate, 'subsection', $scope);
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.subsection,
  resolve: {
    subsection: function subsection($http, $stateParams, $subsectionFactory) {
      var id = $stateParams.subsectionId;
      return $subsectionFactory.getById(id).then(function (data) {
        return data.data.data;
      });
    }
  }
};
module.exports = entity;
