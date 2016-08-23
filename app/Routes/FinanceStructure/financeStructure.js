'use strict';

  var helpers = require('./financeStructureHelper');
  var makeFilters = require('./filterMaker');

var structure = {
  url: '/Finance?from&to',
  views: {
    'content@': {
      templateUrl: 'app/Routes/FinanceStructure/finance.html',
      controller: function controller($scope, projectsCatalog,sectionsCatalog, subSectionsCatalog, $state, events, financeSections) {
        makeFilters($scope, {projectsCatalog, sectionsCatalog, subSectionsCatalog}, $state);
        $scope.sections = financeSections.map((item) => Object.assign(item, {finance: helpers.prepareSection(item.finance)}));
        var tables = helpers.getFinanceTables($scope.sections);
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
      var params = {from: from, to: to, section_id: '1,2,3'};
      return $financeFactory.getListFilter(params).then(function (data) {
        var paramArr = Object.keys(params).filter((x)=> params[x] !== undefined).map((x) => `${x}=${params[x]}`);
        var href = window.getHref('home.financeStructure').split('?')[0];
        return helpers.appendHrefs(data, href, paramArr);
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
