(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function DesignController($scope, dialogs, $dataTableService, gridData, chartData) {
  $scope.treeData = {};
  $scope.treeData.url = 'testData/data.json';
  $scope.create_popup = function () {
    var data = {
      name: 'МЧС',
      responsible: 'Иванов И.И.',
      tel: '222-33-22'
    };
    var dlg = dialogs.create('app/components/popup/popup.html', 'popupController', data, {
      size: 'sm',
      animation: true
    });
  };
  $scope.tableData = gridData;
  $scope.chartData = chartData;
  $scope.tabstripData = [{ name: 'Общие сведения' }, { name: 'Результаты' }, { name: 'Финансирование' }, { name: 'Связанные проекты' }, { name: 'События' }];
  $scope.tabDocs = '\n\
  Has params href, type, name and state. \n\
  \n \
  name: label for button - must have, \n \
  \n \
  If href present - it is a direct href, other params ignored \n \
  state and type must present simultaneously: \n\
    1) state - name of nested state to be redirected to\n\
    2) type - parameter "type" that will be passed to that state\n\
';
}
module.exports = DesignController;

},{}],2:[function(require,module,exports){
'use strict';

var sidebarDirective = require('./sidebar/sidebar.js');
var currentModule = angular.module('layout', []);
currentModule.directive('sidebar', sidebarDirective);

},{"./sidebar/sidebar.js":3}],3:[function(require,module,exports){
'use strict';

module.exports = function () {
  return {
    templateUrl: 'app/Layout/sidebar/sidebar.html',
    replace: true,
    controller: function controller($scope) {
      var directories = [{
        name: 'Дизайн',
        icon: 'wheelChair',
        state: 'home.design'
      }, {
        name: 'Структура программы',
        icon: 'business_center',
        state: 'home.projectStructure'
      }, {
        name: 'Космические комплексы',
        icon: 'brightness_5'
      }, { name: 'Финансирование' }, { name: 'Заказчики' }, { name: 'Планирование' }, { name: 'Документация' }, { name: 'События' }];
      $scope.directories = directories;
    }
  };
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function () {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: 'app/Project/card/project-card.html',
    replace: true
  };
};

},{}],5:[function(require,module,exports){
'use strict';

var projectCard = require('./card/projectCardDirective.js');
var projectFactory = require('./projectFactory.js');
var projectController = require('./projectController.js');
var currentModule = angular.module('project', []);
currentModule.controller('projectController', projectController);
currentModule.directive('projectCard', projectCard);
currentModule.factory('$projectFactory', projectFactory);

},{"./card/projectCardDirective.js":4,"./projectController.js":6,"./projectFactory.js":7}],6:[function(require,module,exports){
'use strict';

var highlightNode = require('../components/accordion/treeBuilder.js').highlight;
function ProjectController($scope, dialogs, $projectFactory, $state, $timeout) {
  $scope.treeData = {};
  $scope.treeData.url = 'testData/data.json';
  $scope.create_popup = function () {
    var data = {
      name: 'МЧС',
      responsible: 'Иванов И.И.',
      tel: '222-33-22'
    };
    var dlg = dialogs.create('app/components/popup/popup.html', 'popupController', data, {
      size: 'sm',
      animation: true
    });
  };
  $scope.tabstripData = [{
    name: 'Общие сведения',
    state: 'projectSection',
    type: 'general'
  }, {
    name: 'Результаты',
    state: 'projectSection',
    type: 'results'
  }, { name: 'Финансирование' }, { name: 'Связанные проекты' }, { name: 'События' }];
  $scope.$on('$viewContentLoaded', function (event) {
    $timeout(function () {
      if ($state.params.id) {
        highlightNode($state.params.id);
      } else {
        highlightNode(-1);
      }
    });
  });
}
module.exports = ProjectController;

},{"../components/accordion/treeBuilder.js":12}],7:[function(require,module,exports){
'use strict';

module.exports = function projectFactory($http) {
  return {
    getById: function getById(id) {
      return $http.get('testData/project.json');
    }
  };
};

},{}],8:[function(require,module,exports){
'use strict';

var icons = {
  wheelChair: '<path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"></path>',
  business_center: '<path d="M10 16v-1H3.01L3 19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4zm10-9h-4.01V5l-2-2h-4l-2 2v2H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0h-4V5h4v2z"></path>'
};
module.exports = icons;

},{}],9:[function(require,module,exports){
'use strict';

var accordionDirective = require('./accordionDirective.js');
var accordionService = require('./accordionService.js');
var currentModule = angular.module('accordion', []);
currentModule.directive('accordionTree', accordionDirective);
currentModule.service('$accordion', accordionService);

},{"./accordionDirective.js":10,"./accordionService.js":11}],10:[function(require,module,exports){
'use strict';

var treeBuilder = require('./treeBuilder.js').treeHtml;
var bindToggleEvents = require('./treeBuilder.js').bind;
var highlightNode = require('./treeBuilder.js').highlight;
module.exports = function ($compile, $accordion, $state) {
  return {
    scope: { data: '=' },
    compile: function compile(templateElement, templateAttrs) {
      return {
        pre: function pre($scope) {
          $scope.getHref = $scope.$parent.getHref;
          $scope.getCurrentState = $scope.$parent.getCurrentState;
          $scope.getCurrentEntityState = function () {
            var state = $scope.getCurrentState();
            return state.indexOf('treeEntity') > -1 ? state : state + '.treeEntity';
          };
          $accordion.getTree($scope.data.url).then(function (response) {
            templateAttrs.timeout === undefined ? 400 : parseint(templateAttrs.timeout);
            var html = '<div  class="accordionTree">  <ul class="accordion">';
            var elements = [];
            if (!response.data) {
              throw 'define data attribute for tree';
            }
            response.data.forEach(function (item) {
              elements.push(treeBuilder.buildNode(item));
            });
            var treeHtml = html + elements.join('') + '</ul></div>';
            templateElement.replaceWith($compile(treeHtml)($scope));
            bindToggleEvents();
          });
        }
      };
    },
    controller: function controller($scope) {}
  };
};

},{"./treeBuilder.js":12}],11:[function(require,module,exports){
'use strict';

module.exports = function ($http) {
  this.getTree = function (url) {
    return $http.get(url);
  };
};

},{}],12:[function(require,module,exports){
'use strict';

function buildTree() {
  var self = this;
  this.elementHtml = function (element, nested) {
    nested = nested === undefined ? '' : nested;
    return '<li><a layout="row" layout-align="space-between center" class="toggle" id="node_' + element.id + '" ng-href=" {{getHref(getCurrentEntityState(), {id: ' + element.id + '})}}"><span>' + element.name + '</span><ng-md-icon class="toggleOpen" size=30 layout="column" layout-align="center center" icon="keyboard_arrow_right"></ng-md-icon></a>' + nested + '</li>';
  };
  this.buildNode = function (root) {
    var inner = '';
    if (root.children) {
      inner = '<ul class="inner">';
      root.children.forEach(function (item) {
        inner += self.buildNode(item);
      });
      inner += '</ul>';
    } else {
      return self.elementHtml(root);
    }
    return self.elementHtml(root, inner);
  };
  return this;
}
function bindToggleEvents() {
  $('.toggle').click(function (e) {
    var $this = $(this);
    $('.toggle').removeClass('selected');
    $this.addClass('selected');
  });
  $('.toggleOpen').click(function (e) {
    e.preventDefault();
    var $this = $(this).parent();
    if ($this.next().hasClass('show')) {
      if ($this.next().length) {
        $this.find('ng-md-icon>svg').removeClass('show');
      }
      $this.next().slideUp(200, function () {
        $this.next().removeClass('show');
      });
    } else {
      if ($this.next().length) {
        $this.find('ng-md-icon>svg').addClass('show');
      }
      $this.next().slideDown(200, function () {
        $this.next().addClass('show');
      });
    }
  });
}
function highlightNode(id) {
  var elem = $('.accordion a#node_' + id);
  $('.accordion a').removeClass('selected');
  elem.addClass('selected');
  while (elem.parent().closest('.inner').length > 0) {
    elem = elem.parent().closest('.inner');
    elem.addClass('show');
  }
}
module.exports = {
  treeHtml: new buildTree(),
  bind: bindToggleEvents,
  highlight: highlightNode
};

},{}],13:[function(require,module,exports){
'use strict';

var chartDirective = require('./chartDirective.js');
var chartService = require('./chartService.js');
var currentModule = angular.module('chart', ['chart.js']);
currentModule.directive('chart', chartDirective);
currentModule.factory('$chartService', chartService);

},{"./chartDirective.js":14,"./chartService.js":15}],14:[function(require,module,exports){
'use strict';

function CD() {
  return {
    scope: { data: '=' },
    restrict: 'E',
    template: '<canvas id="bar" class="chart chart-bar"chart-data="chartData" chart-labels="labels"> chart-series="series" </canvas>',
    controller: function controller($scope) {
      $scope.labels = $scope.data.labels;
      $scope.series = $scope.data.series;
      $scope.chartData = $scope.data.data;
    }
  };
}
module.exports = CD;

},{}],15:[function(require,module,exports){
'use strict';

function CS($http) {
  return {
    getData: function getData(url) {
      return $http.get(url);
    }
  };
}
module.exports = CS;

},{}],16:[function(require,module,exports){
'use strict';

require('./accordion/accordion.js');
require('./dataTable/dataTable.js');
require('./tabstrip/tabstrip.js');
require('./chart/chart.js');
var currentModule = angular.module('components', ['accordion', 'dataTable', 'tabstrip', 'chart']);
var accordionDirective = require('./accordion/accordion.js');
var popupController = require('./popup/popupController.js');
var splitDirective = require('./split/split.js');
var projectCard = require('../Project/card/projectCardDirective.js');
currentModule.controller('popupController', popupController);
currentModule.directive('split', splitDirective);
currentModule.directive('projectCard', projectCard);

},{"../Project/card/projectCardDirective.js":4,"./accordion/accordion.js":9,"./chart/chart.js":13,"./dataTable/dataTable.js":17,"./popup/popupController.js":20,"./split/split.js":21,"./tabstrip/tabstrip.js":22}],17:[function(require,module,exports){
'use strict';

var dataTableDirective = require('./dataTableDirective.js');
var dataTableService = require('./dataTableService.js');
var currentModule = angular.module('dataTable', ['ui.grid']);
currentModule.directive('cDataTable', dataTableDirective);
currentModule.factory('$dataTableService', dataTableService);

},{"./dataTableDirective.js":18,"./dataTableService.js":19}],18:[function(require,module,exports){
'use strict';

function DTD() {
  return {
    scope: { data: '=' },
    restrict: 'E',
    template: '<div ui-grid="{ data: gridData }" class="grid"></div>',
    controller: function controller($scope) {
      $scope.gridData = $scope.data;
    }
  };
}
module.exports = DTD;

},{}],19:[function(require,module,exports){
'use strict';

function DTS($http) {
  return {
    getTable: function getTable(url) {
      return $http.get(url);
    }
  };
}
module.exports = DTS;

},{}],20:[function(require,module,exports){
'use strict';

module.exports = function ($scope, $uibModalInstance, data) {
  $scope.data = data;
  //-- Methods --//
  $scope.done = function () {
    $uibModalInstance.close($scope.data);
  };
  // end done
  $scope.close = function () {
    $uibModalInstance.close($scope.data);
  };
};

},{}],21:[function(require,module,exports){
'use strict';

function compile(templateElement, templateAttrs) {
  templateElement.attr('flex', '');
  var left = $(templateElement.children()[0]);
  var right = $(templateElement.children()[1]);
  var leftSize, rightSize;
  var rightContents = right.html();
  leftSize = left.attr('size');
  rightSize = right.attr('size');
  if (!leftSize) {
    throw 'left split element must have attribute "size"';
  }
  if (!rightSize) {
    throw 'right split element must have attribute "size"';
  }
  left.attr('flex', leftSize);
  left.removeAttr('size');
  right.replaceWith('<md-content flex layout-padding style="overflow-x:hidden">' + rightContents + '</md-content>');
  right.attr('flex', rightSize);
  right.removeAttr('size');
  templateElement.attr('layout', 'row');
}
module.exports = function () {
  return {
    scope: false,
    restrict: 'E',
    compile: compile
  };
};

},{}],22:[function(require,module,exports){
'use strict';

var tabstripDirective = require('./tabstripDirective.js');
var currentModule = angular.module('tabstrip', []);
currentModule.directive('tabStrip', tabstripDirective); /*
                                                        Has params href, type and state.
                                                        If href present - it is a direct href, other params ignored
                                                        state and type must present simultaneously:
                                                        1) state - name of nested state to be redirected to
                                                        2) type - parameter "type" that will be passed to that state
                                                        */

},{"./tabstripDirective.js":23}],23:[function(require,module,exports){
'use strict';

function reActivate(event) {
  event.data.timeout(function () {
    $('html').unbind('click', reActivate);
    $('#' + event.data.scope.id + ' .btn-tab').removeClass('active');
    $('#' + event.data.scope.id + ' [type="' + event.data.state.params.type + '"]').addClass('active');
    $('html').bind('click', { state: event.data.state, scope: event.data.scope, timeout: event.data.timeout }, reActivate);
  });
}
function tabstripDirective($compile, $state, $timeout) {
  return {
    scope: { data: '=', id: '@' },
    compile: function compile(templateElement, templateAttrs) {
      return function ($scope) {
        $scope.getHref = $scope.$parent.getHref;
        $scope.getCurrentState = $scope.$parent.getCurrentState;
        $('html').bind('click', { state: $state, scope: $scope, timeout: $timeout }, reActivate);

        $scope.activateTab = function (e) {
          $('#' + $scope.id + ' .btn-tab').removeClass('active');
          $(e.target).addClass('active');
        };
        var buttons = [];
        var html = '<div class="btn-group btn-group-tab" id="' + $scope.id + '" role="group"  layout="row">';
        $scope.data.forEach(function (btn) {
          if (btn.href) {
            buttons.push('<a class="btn btn-default btn-tab"  ng-href="' + btn.href + '" flex>' + btn.name + '</a>');
          } else if (btn.state && btn.type) {
            buttons.push('<a class="btn btn-default btn-tab" type="' + btn.type + '" ng-click="activateTab($event)" ng-href="{{getHref(getCurrentEntityState(\'' + btn.state + '\'), {type: \'' + btn.type + '\'})}}" flex>' + btn.name + '</a>');
          } else {
            buttons.push('<a class="btn btn-default btn-tab" flex>' + btn.name + '</a>');
          }
        });
        html += buttons.join('');
        html += '</div>';
        $scope.getCurrentEntityState = function (stateName) {
          var state = $scope.getCurrentState();
          return state.indexOf(stateName) > -1 ? state : state + '.' + stateName;
        };
        var compiled = $compile(html)($scope);
        templateElement.replaceWith(compiled);
        $('#' + $scope.id + ' .btn-tab').removeClass('active');
        $('#' + $scope.id + ' [type="' + $state.params.type + '"]').addClass('active');
      };
    },
    controller: function controller() {}
  };
}
module.exports = tabstripDirective;

},{}],24:[function(require,module,exports){
'use strict';

require('./router.js');
require('./Project/project.js');
var layout = require('./Layout/layout.js');
var components = require('./components/components.js');
var icons = require('./components/Icons/icons.js');
var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngMaterial', 'ngMdIcons', 'ncy-angular-breadcrumb', 'ngSanitize', 'dialogs.main', 'layout', 'components', 'router', 'project']);
app.config(['$urlRouterProvider', '$stateProvider', 'ngMdIconServiceProvider', '$routerProvider', function ($urlRouterProvider, $stateProvider, ngMdIconServiceProvider, $routerProvider) {
  for (var e in icons) {
    ngMdIconServiceProvider.addShape(e, icons[e]);
  }
  $urlRouterProvider.otherwise('/FKP');
  for (var e in $routerProvider.$get.routes) {
    $stateProvider.state(e, $routerProvider.$get.routes[e]);
  }
}]);
app.run(function ($rootScope, $state) {
  $rootScope.$state = $state;
  $rootScope.getHref = $state.href.bind($state);
  $rootScope.getCurrentState = function () {
    return $state.current.name;
  };
  $rootScope.getCurrentHref = function () {
    return $rootScope.getHref($rootScope.getCurrentState());
  };
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
    //debugger;
  });
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    //debugger;
  });
  $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
    //debugger;
  });
});

},{"./Layout/layout.js":2,"./Project/project.js":5,"./components/Icons/icons.js":8,"./components/components.js":16,"./router.js":25}],25:[function(require,module,exports){
'use strict';

var DesignController = require('./Design/designController');
angular.module('router', []).provider('$router', function () {
  this.$get = new function () {
    var self = this;
    self.routes = {
      'home': {
        url: '/FKP',
        views: { 'sidebar': { template: '<sidebar></sidebar>' } },
        ncyBreadcrumb: { label: 'ФКП' }
      },
      'home.design': {
        url: '/Design',
        views: {
          'content@': {
            templateUrl: 'app/Design/design-page.html',
            controller: DesignController,
            resolve: {
              gridData: function gridData($dataTableService) {
                return $dataTableService.getTable('testData/tableData.json').then(function (data) {
                  return data.data;
                });
              },
              chartData: function chartData($chartService) {
                return $chartService.getData('testData/chart.json').then(function (data) {
                  return data.data;
                });
              }
            }
          }
        },
        ncyBreadcrumb: { label: 'Дизайн-страница' }
      },
      'home.projectStructure': {
        url: '/ProjectStructure',
        views: {
          'content@': {
            templateUrl: 'app/Project/project-page.html',
            controller: 'projectController'
          }
        },
        ncyBreadcrumb: { label: 'Структура программы' }
      },
      'home.projectStructure.treeEntity': {
        url: '/treeEntity?id',
        views: {
          'projectInfo': {
            templateUrl: 'app/Project/card/project-card.html',
            controller: function controller($scope, project) {
              $scope.project = project;
            },
            resolve: {
              project: function project($http, $projectFactory, $stateParams) {
                var id = $stateParams.id;
                return $projectFactory.getById(id).then(function (data) {
                  return data.data;
                });
              }
            }
          }
        },
        ncyBreadcrumb: { label: 'Проект {{project.code}}' }
      },
      'home.projectStructure.treeEntity.projectSection': {
        url: '/tabSection?type',
        views: {
          'projectSection': {
            templateUrl: function templateUrl($stateParams) {
              switch ($stateParams.type) {
                case 'general':
                  return 'app/Project/card/sections/general.html';
                  break;
                case 'results':
                  return 'app/Project/card/sections/results.html';
                  break;
                default:
                  return 'app/Project/card/sections/general.html';
              }
            },
            controller: function controller($stateParams, $scope) {
              var state = $stateParams;
              switch (state.type) {
                case 'general':
                  $scope.sectionName = 'Общие сведения';
                  break;
                case 'results':
                  $scope.sectionName = 'Результаты';
                  break;
                default:
                  $scope.sectionName = 'Общие сведения';
                  break;
              }
            }
          }
        },
        ncyBreadcrumb: { label: '{{sectionName}}' }
      }
    };
    return this;
  }();
});

},{"./Design/designController":1}]},{},[24])


//# sourceMappingURL=all.js.map
