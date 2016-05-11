var breadcrumbs = require('../breadcrumbs.js');

function prepareSection(finance) {
  for(var e in finance) {
    if(isNaN(finance[e])) {
      prepareSection(finance[e]);
    } else {
      finance[e] = parseFloat(finance[e]) / 1000000.0;
    }
  }
}

function getFinanceTables(finance) {
  var projectsBudget = [];
  var projectsOwn = [];
  for(var e in finance) {
    var projectBudget = {'Название' : e};
    var projectOwn = {'Название' : e};
    for (var y in finance[e]["Финансирование за счет бюджетных средств"]) {
      projectBudget[y] = finance[e]["Финансирование за счет бюджетных средств"][y];
    }
    for (var y in finance[e]["Финансирование из собственных средств"]) {
      projectOwn[y] = finance[e]["Финансирование из собственных средств"][y];
    }
    projectsBudget.push(projectBudget);
    projectsOwn.push(projectOwn);
  }
  return {'Budget' : projectsBudget, 'Own' : projectsOwn};
}

var entity = {
  url: '/section/:sectionId',
  views: {
    'projectInfo@home.projectStructure': {
      templateUrl: 'app/Project/card/section-card.html',
      controller: function controller($scope, section,$interpolate) {
        $scope.section = _.cloneDeep(section);
        prepareSection($scope.section.finance);
        var tables = getFinanceTables($scope.section.finance);
        $scope.financeBudget = tables.Budget;
        $scope.financeOwn = tables.Own;
        breadcrumbs.init($interpolate,'section',$scope);
        $scope.basename = 'Название';
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.section,
  resolve: {
    section: function ($http, $stateParams,$sectionFactory) {
      var id = $stateParams.sectionId;
      return $sectionFactory.getById(id).then(function (data) {
        return data.data.data;
      });
    },
  }
}

module.exports = entity;
