'use strict';

var helpers = require('./financeStructureHelper');
var makeFilters = require('./filterMaker');
var breadcrumbs = require('../breadcrumbs.js');


var entity = {
  url: '/projects/:project_id',
  views: {
    'content@': {
      templateUrl: 'app/Routes/FinanceStructure/finance.html',
      controller: function controller($scope, $interpolate, $stateParams,financeSections, projectsCatalog,sectionsCatalog, subSectionsCatalog, $state, events) {
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
    label: 'Выборка по проектам',
    toolTipInterpolated: 'Выборка по проектам'
  },
  resolve:{
    financeSections: function section($http, $stateParams, $financeFactory,$projectsDict) {
      var project_id  = $stateParams.project_id ;
      var from = $stateParams.from;
      var to = $stateParams.to;
      var params = {from: from, to: to, project_id: project_id};
      return $financeFactory.getListFilter(params).then(function (data) {
        var paramArr = Object.keys(params).filter((x)=> params[x] !== undefined).map((x) => `${x}=${params[x]}`);
        var href = window.location.hash.split('?')[0];
        return helpers.appendHrefs(data, href, paramArr);
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
