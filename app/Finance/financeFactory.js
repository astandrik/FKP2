function makeIdList(arr) {
  return arr.reduce((sum,current) => {
    sum.push(current.id);
    return sum;
  },[]).join();
}


module.exports = function ($httpCached, $errorHandler, $state) {
  return {
    getList: function() {
      var url = '/filter/finance';
      return $httpCached.get(url);
    },
    getListFilter: function(filters) {
      var url = '/filter/finance';
      var filtered = [];
      if(filters.from) {
        filtered.push('from=' + new Date(filters.from).format('yyyy'));
      }
      if(filters.to) {
        filtered.push('to=' + new Date(filters.to).format('yyyy'));
      }
      if(filters.section_id) {
        filtered.push('section_id=' + filters.section_id)
      }
      if(filters.subsection_id) {
        filtered.push('subsection_id=' + filters.subsection_id)
      }
      if(filters.project_id) {
        filtered.push("project_id=" + filters.project_id)
      }
      return $httpCached.get(url + (filtered.length > 0 ? '?' + filtered.join('&') : '') )
    },
    getById: function getById(id) {
      var url = 'data/project?id=' + id;
      return $httpCached.get(url);
    },
    makeFilters: function($scope, projectsCatalog, subSectionsCatalog, sectionsCatalog) {
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
          to: $scope.filter.endDate
        }
        if($scope.radioTypeSelect == 'directories' &&   $scope.filter.directoriesOutput.length > 0) {
          $state.go('home.financeStructure.sections', {section_id: makeIdList($scope.filter.directoriesOutput),to:  filters.to ? new Date(filters.to).format('yyyy') : undefined, from: filters.from ? new Date(filters.from).format('yyyy') : undefined});
        } else if($scope.radioTypeSelect == 'directions' &&   $scope.filter.directionsOutput.length > 0) {
          $state.go('home.financeStructure.subsections', {subsection_id: makeIdList($scope.filter.directionsOutput),to:  filters.to ? new Date(filters.to).format('yyyy') : undefined, from: filters.from ? new Date(filters.from).format('yyyy') : undefined});
        } else if($scope.radioTypeSelect == 'projects' &&   $scope.filter.projectsOutput.length > 0) {
          $state.go('home.financeStructure.projects', {project_id : makeIdList($scope.filter.projectsOutput),to:  filters.to ? new Date(filters.to).format('yyyy') : undefined, from: filters.from ? new Date(filters.from).format('yyyy') : undefined});
        } else if(filters.from || filters.to){
          $state.go('.', {to:  filters.to ? new Date(filters.to).format('yyyy') : undefined, from: filters.from ? new Date(filters.from).format('yyyy') : undefined});
        }
      };

      $scope.clearFilters = () => {
        $state.go('home.financeStructure', {to: undefined, from: undefined});
      }
      var translationBase = {selectAll : 'Всё',selectNone : 'Сброс',reset : 'Вернуть',search: 'Поиск...'}
      $scope.translationProject = $.extend(translationBase, {nothingSelected : 'Не выбрано проектов'});
      $scope.translationDirectory =  $.extend(translationBase, {nothingSelected : 'Не выбрано разделов'});
      $scope.translationDirection =  $.extend(translationBase, {nothingSelected : 'Не выбрано направлений'});

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
    }
  };
};
