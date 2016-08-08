'use strict';

function makeIdList(arr) {
  return arr.reduce((sum,current) => {
    sum.push(current.id);
    return sum;
  },[]).join();
}

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
function getFinanceTables(children) {
  var projectsBudget = [];
  var projectsOwn = [];
  for (var i = 0; i < children.length; i++) {
    var projectBudget = { 'Название': children[i].name };
    var projectOwn = { 'Название': children[i].name };
    projectBudget =  $.extend(projectBudget,children[i].finance['Финансирование за счет бюджетных средств']);
    projectOwn =  $.extend(projectOwn,children[i].finance['Финансирование за счет бюджетных средств']);
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
  url: '/projects/:project_id',
  views: {
    'content@': {
      templateUrl: 'app/Routes/FinanceStructure/finance.html',
      controller: function controller($scope, $interpolate, $stateParams,$projectsDict,financeSections, projectsCatalog,sectionsCatalog, subSectionsCatalog, $state, events,$financeFactory) {
        $financeFactory.makeFilters($scope,projectsCatalog, subSectionsCatalog, sectionsCatalog);

        $scope.budgetShown=true;
        $scope.showBudget = () => $scope.budgetShown=true;
        $scope.showOwn = () => $scope.budgetShown=false;

        $scope.sections = _.cloneDeep(financeSections);
        $scope.sections.map((item) => {prepareSection(item.finance); return item; });
        var tables = getFinanceTables($scope.sections);
        $scope.financeBudget = tables.Budget;
        $scope.financeOwn = tables.Own;

        $scope.basename = 'Название';
        breadcrumbs.init($interpolate, 'financeSection', $scope);
      }
    }
  },
  ncyBreadcrumb: {
    label: 'Выборка по проектам',
    toolTipInterpolated: 'Выборка по проектам'
  },
  resolve:{
    financeSections: function section($http, $stateParams, $financeFactory,$projectsDict) {
      var project_id  = $stateParams.project_id ;
      var from = $stateParams.from;
      var to = $stateParams.to;
      return $financeFactory.getListFilter({project_id : project_id, to: to, from: from }).then(function (data) {
        return data.data.data;
      });
    },
    projectsCatalog: function($catalogs) {
      return $catalogs.getByType('project').then((data) => {
        return data.data.data.map((item)=> {return  {name: item[0].cipher || item[0].name, ticked: false, id: item[1]}});
      });
    },
    sectionsCatalog: function($catalogs) {
      return $catalogs.getByType('section').then((data) => {
        return data.data.data.map((item)=> {return  {name: item[0].cipher || item[0].name, ticked: false, id: item[1]}});
      });
    },
    subSectionsCatalog: function($catalogs) {
      return $catalogs.getByType('subsection').then((data) => {
        return data.data.data.map((item)=> {return  {name: item[0].cipher || item[0].name, ticked: false, id: item[1]}});
      });
    }
  }
};

module.exports = entity;
