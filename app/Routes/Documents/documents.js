'use strict';

function prepareDate(date) {
  return date.toString().split(' ')[0].split('-').reverse().join('.');
}

function makeDoc(doc) {
  return {
    'Название документа': doc.name,
    'Дата': prepareDate(doc.date),
    'Тип документа': doc.type.name,
    'Номер раздела': '',
    'Автор': doc.author
  }
}

function prepareDocs(data) {
  var documents = data.data.data;
  return documents.map(makeDoc);
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
        var clearElements = (item) => {item.ticked = false};
        var toEmptyState = () => {
          if($scope.filter && $scope.filter.startEvent)
          $scope.filter.startEvent.clearAutoselect();
          if($scope.filter && $scope.filter.endEvent)
          $scope.filter.endEvent.clearAutoselect();
          $scope.filter = {};
          $scope.filter.projectsOutput = [];
          $scope.filter.directoriesOutput = [];
          $scope.filter.directionsOutput = [];
          $scope.radioTypeSelect = '';
          $scope.filterType = '';
        }
        $scope.projects = projectsCatalog;
        $scope.directories = sectionsCatalog;
        $scope.directions = subSectionsCatalog;
        toEmptyState();
        $scope.filtersDisplayed = false;

        $scope.$watch('radioTypeSelect', function(newval) {
          $scope.directions.forEach(clearElements);
          $scope.projects.forEach(clearElements);
          $scope.directories.forEach(clearElements);
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
            $scope.gridOptions.data = prepareDocs(data);
          });
        };

        $scope.clearFilters = () => {
          $scope.directions.forEach(clearElements);
          $scope.projects.forEach(clearElements);
          $scope.directories.forEach(clearElements);
          toEmptyState();
          $scope.gridOptions.data = prepareDocs(documents);
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
        $scope.news = news.data.map((item) => new Object({name: item.name, date: prepareDate(item.date)}));
        $scope.docs = prepareDocs(documents);
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
