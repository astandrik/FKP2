'use strict';

function prepareDocs($scope, data) {
  var documents = data.data.data;
  $scope.docs = [];
  documents.forEach((item) => {
    var obj = {};
    obj['Название документа'] = item.name;
    obj['Дата'] = item.date.toString().split(' ')[0].split('-').reverse().join('.');
    obj['Тип документа'] = item.type.name;
    obj['Номер раздела'] = '';//item.;
    obj['Автор'] = item.author;
    $scope.docs.push(obj);
  });
  $scope.gridOptions = {
    enableSorting:true,
    enableFiltering:false,
    rowHeight: 50,
    columnDefs: [
      {field: 'Название документа'},
      {field: 'Дата'},
      {field: 'Тип документа'},
      {field: 'Номер раздела'}, 
      {field: 'Автор'}
    ],
    data: $scope.docs
  };
}

function makeIdList(arr) {
  if(arr.length == 0) return undefined;
  return arr.reduce((sum,current) => {
    sum.push(current.id);
    return sum;
  },[]).join();
}

//Свернул некоторые юайные функции, чтобы полезное место обзора кода не занимали

module.exports = {
  url: '/Documents',
  views: {
    'content@': {
      templateUrl: 'app/Routes/Documents/documents.html',
      controller: function($scope,documents, news, events, projectsCatalog, $documents,sectionsCatalog, subSectionsCatalog,$stateParams) {
        $scope.filter = {};
        $scope.projects = projectsCatalog;
        $scope.directories = sectionsCatalog;
        $scope.directions = subSectionsCatalog;
        $scope.filter.projectsOutput = [];
        $scope.filter.directoriesOutput = [];
        $scope.filter.directionsOutput = [];
        $scope.filterType = '';
        $scope.filtersDisplayed = false;

        $scope.$watch('radioTypeSelect', function(newval) {
          $scope.directions.forEach((item) => {item.ticked = false;});
          $scope.projects.forEach((item) => {item.ticked = false;});
          $scope.directories.forEach((item) => {item.ticked = false;});
          switch(newval) {
            case 'directories':
              $scope.filterType = 'по разделам';
              break;
            case 'projects':
              $scope.filterType = 'по проектам';
              break;
            case 'directions':
              $scope.filterType = 'по направлениям';
              break;
          }
        });
        $scope.slidePanelShown = false;
        $scope.slidePanel = () => {if($('.slidePanel:hidden').length) {$('.slidePanel').attr('min-height','500px');$('.slidePanel').css('display', 'flex');$scope.slidePanelShown = true;} else {$('.slidePanel').attr('min-height','0px');$('.slidePanel').hide();$scope.slidePanelShown = false;}}
        $scope.showFilters = () => {$scope.filtersDisplayed = !$scope.filtersDisplayed;if(  $scope.filtersDisplayed) {$('.grow.hide-panel').removeClass('hide-panel');} else {$('.grow').addClass('hide-panel');}};

        $scope.applyFilters = () => {
          var filters = {
            from: $scope.filter.startDate,
            to: $scope.filter.endDate,
            project_type: makeIdList($scope.filter.directoriesOutput),
            project_subsection : makeIdList($scope.filter.directionsOutput),
            project : makeIdList($scope.filter.projectsOutput)
          }
          $documents.getListFilter(filters).then((data) => {
            prepareDocs($scope, data);
          })
        };

        $scope.clearFilters = () => {
          if($scope.filter.startEvent)
          $scope.filter.startEvent.clearAutoselect();
          if($scope.filter.endEvent)
          $scope.filter.endEvent.clearAutoselect();
          $scope.directions.forEach((item) => {item.ticked = false;});
          $scope.projects.forEach((item) => {item.ticked = false;});
          $scope.directories.forEach((item) => {item.ticked = false;});
          $scope.filter = {};
          $scope.filter.projectsOutput = [];
          $scope.filter.directoriesOutput = [];
          $scope.filter.directionsOutput = [];
          $scope.radioTypeSelect = '';
          $scope.radioTypeSelect = '';
          $scope.filterType = '';
          prepareDocs($scope, documents);
        }
        var translationBase = {selectAll : 'Всё',selectNone : 'Сброс',reset : 'Вернуть',search: 'Поиск...'}
        $scope.translationProject =  $.extend(translationBase, {nothingSelected : 'Не выбрано проектов'});
        $scope.translationDirectory =  $.extend(translationBase, {nothingSelected : 'Не выбрано разделов'});
        $scope.translationDirection = $.extend(translationBase, {nothingSelected : 'Не выбрано направлений'});

        $scope.chooseStartEvent = {url: '/data/events',title: 'Выбрать событие',parent:   $scope.filter,boundTo: 'startEvent'};
        $scope.chooseEndEvent = {url: '/data/events',title: 'Выбрать событие',parent:   $scope.filter,boundTo: 'endEvent'};

        $scope.$watch('filter.startEvent', function(newVal,oldValue) {
          if($scope.filter.startEvent)
          $scope.filter.startDate = new Date($scope.filter.startEvent.Raw.date);
        });
        $scope.$watch('filter.endEvent', function(newVal,oldValue) {
          if($scope.filter.endEvent)
          $scope.filter.endDate = new Date($scope.filter.endEvent.Raw.date);
        });
        $scope.$watch('filter.startDate', function(newVal,oldValue) {
          if($scope.filter.startEvent)
          if(!$scope.filter.startDate || $scope.filter.startDate.getTime() != (new Date($scope.filter.startEvent.Raw.date)).getTime()) {
            $scope.filter.startEvent.clearAutoselect();
          }
        });
        $scope.$watch('filter.endDate', function(newVal,oldValue) {
          if($scope.filter.endEvent)
          if(!$scope.filter.endDate || $scope.filter.endDate.getTime() != (new Date($scope.filter.endEvent.Raw.date)).getTime()) {
            $scope.filter.endEvent.clearAutoselect();
          }
        });


        var news = news.data;
        $scope.news = [];
        news.forEach((item) => {
          var n = {};
          n.name = item.name;
          n.date = item.date.toString().split(' ')[0].split('-').reverse().join('.');
          $scope.news.push(n);
        });
        prepareDocs($scope, documents);
      },
      resolve: {
        documents: function($documents) {
          return $documents.getList().then(function (data) {
            return data;
          });
        },
        news: function($news) {
          return $news.getList().then(function(data) {
            return data.data;
          })
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
    }
  },
  ncyBreadcrumb: { label: 'Документация' }
}
