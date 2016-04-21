'use strict';

var helpers = require('./projectHelper.js');


var breadcrumbs = require('./breadcrumbs.js');

var entity = {
  url: '/project/:projectId',
  views: {
    'projectInfo@home.projectStructure': {
      templateUrl: 'app/Project/card/project-card.html',
      controller: function controller($scope, project, pieData, tabstripData,section,subsection,$interpolate) {
        $scope.tabstripData = tabstripData;
        $scope.project =project;
        project = helpers.prepareValues(project);
        $scope.timeLineVerticalData = project.plans;
        $scope.basename = 'Тип';
        var finObj = helpers.prepareFinance(project.finance, $scope.basename);
        $scope.start = finObj.start;
        $scope.end = finObj.end;
        project.finance = finObj.finance;
        $scope.project.chart = {barLabels: finObj.years, barSeries: ['Бюджет, млн.р.','Внебюджет, млн.р'], barData: [finObj.valueBudget, finObj.valueOwnBudget]};
        $scope.pieChartData = {pieLabels: ["Бюджет", "Внебюджет"], pieData: [finObj.sumBudget, finObj.sumOwnBudget]};
        $scope.section = section;
        $scope.subsection = subsection;
        breadcrumbs.init($interpolate,'project',$scope);
      }
    }
  },
  ncyBreadcrumb: breadcrumbs.crumbs.project,
  resolve: {
    projectResource: '$projectFactory',
    project: function project($http, projectResource, $stateParams) {
      var id = $stateParams.projectId;
      return projectResource.getById(id).then(function (data) {
        return data.data.data;
      });
    },
    pieData: function pieData($chartService1) {
      return $chartService1.getData('testData/pie.json').then(function (data) {
        return data.data;
      });
    },
    tabstripData: function tabstripData($stateParams) {
      var tabs = [];
      tabs.push({
        name: 'Общие сведения',
        state: 'projectSection',
        type: 'general'
      });
      if ($stateParams.sectionId != 2) {
        tabs.push({
          name: 'Результаты',
          state: 'projectSection',
          type: 'results'
        });
      }
      tabs.push({
        name: 'Финансирование',
        state: 'projectSection',
        type: 'finance'
      });
      tabs.push({
        name: 'Связанные проекты',
        state: 'projectSection',
        type: 'relatedProjects'
      });
      tabs.push({
        name: 'События',
        state: 'projectSection',
        type: 'events'
      });
      return tabs;
    }
  }
};

module.exports = entity;