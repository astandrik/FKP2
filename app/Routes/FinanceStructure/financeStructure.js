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
function makeIdList(arr) {
  return arr.reduce((sum,current) => {
    sum.push(current.id);
    return sum;
  },[]).join();
}


var structure = {
  url: '/Finance?from&to',
  views: {
    'content@': {
      templateUrl: 'app/Routes/FinanceStructure/finance.html',
      controller: function controller($scope, projectsCatalog,sectionsCatalog, subSectionsCatalog, $state, events, $financeFactory, financeSections) {
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
      }
    }
  },
  ncyBreadcrumb: {
    label: 'Финансирование',
    toolTipInterpolated: 'Финансирование'
  },
  resolve:{
    financeSections: function section($http, $stateParams, $financeFactory,$projectsDict) {
      var from = $stateParams.from;
      var to = $stateParams.to;
      return $financeFactory.getListFilter({from: from, to: to, section_id: '1,2,3'}).then(function (data) {
        helpers.appendHrefs(data, 'home.financeStructure', $projectsDict);
        return data.data.data;
      });
    },
    events: function($eventsFactory) {
      return $eventsFactory.getData('/data/events').then((data) => {
        return data.data.data.sort(function(a,b) { if(new Date(a.date) > new Date(b.date)) return 1; else return -1; })
        .map((item) => {return {name: item.title, date: new Date(item.date), id: item.id}});
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
module.exports = structure;
