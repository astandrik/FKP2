(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function DesignController($scope, dialogs) {
  $scope.treeData = {};
  $scope.treeData.url = 'testData/data.json';
  $scope.create_popup = function () {
    var data = { name: "МЧС", responsible: "Иванов И.И.", tel: "222-33-22" };
    var dlg = dialogs.create('app/components/popup/popup.html', 'popupController', data, { size: 'sm', animation: true });
  };
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
                icon: "wheelChair",
                state: 'home.design'
            }, {
                name: 'Структура программы',
                icon: 'business_center',
                state: 'home.projectStructure'
            }, {
                name: 'Космические комплексы',
                icon: 'brightness_5'
            }, {
                name: 'Финансирование'
            }, {
                name: 'Заказчики'
            }, {
                name: 'Планирование'
            }, {
                name: 'Документация'
            }, {
                name: 'События'
            }];
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

function ProjectController($scope) {
  $scope.treeData = {};
  $scope.treeData.url = 'testData/data.json';
}

module.exports = ProjectController;

},{}],6:[function(require,module,exports){
'use strict';

var icons = {
  wheelChair: '<path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"></path>',
  business_center: '<path d="M10 16v-1H3.01L3 19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4zm10-9h-4.01V5l-2-2h-4l-2 2v2H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0h-4V5h4v2z"></path>'
};

module.exports = icons;

},{}],7:[function(require,module,exports){
'use strict';

var accordionDirective = require('./accordionDirective.js');
var accordionService = require('./accordionService.js');

var currentModule = angular.module('accordion', []);

currentModule.directive('accordionTree', accordionDirective);
currentModule.service('$accordion', accordionService);

},{"./accordionDirective.js":8,"./accordionService.js":9}],8:[function(require,module,exports){
'use strict';

var treeBuilder = require('./treeBuilder.js').treeHtml;
var bindToggleEvents = require('./treeBuilder.js').bind;

module.exports = function ($compile, $accordion, $state) {
    return {
        scope: {
            data: "="
        },
        compile: function compile(templateElement, templateAttrs) {
            return {
                pre: function pre($scope) {
                    $accordion.getTree($scope.data.url).then(function (response) {
                        templateAttrs.timeout === undefined ? 400 : parseint(templateAttrs.timeout);
                        var html = '<div  class="accordionTree">  <ul class="accordion">';
                        var elements = [];
                        if (!response.data) {
                            throw "define data attribute for tree";
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

},{"./treeBuilder.js":10}],9:[function(require,module,exports){
"use strict";

module.exports = function ($http) {
  this.getTree = function (url) {
    return $http.get(url);
  };
};

},{}],10:[function(require,module,exports){
'use strict';

function buildTree() {
    var self = this;
    this.elementHtml = function (element, nested) {
        nested = nested === undefined ? '' : nested;
        return '<li><a layout="row" layout-align="space-between center" class="toggle" href="javascript:void(0);"><span>' + element.name + '</span><ng-md-icon class="toggleOpen" size=30 layout="column" layout-align="center center" icon="keyboard_arrow_right"></ng-md-icon></a>' + nested + '</li>';
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
};
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
module.exports = { treeHtml: new buildTree(), bind: bindToggleEvents };

},{}],11:[function(require,module,exports){
'use strict';

require('./accordion/accordion.js');
var currentModule = angular.module('demos', ['accordion']);

var accordionDirective = require('./accordion/accordion.js');
var popupController = require('./popup/popupController.js');
var splitDirective = require('./split/split.js');
var projectCard = require('../Project/card/projectCardDirective.js');

currentModule.controller('popupController', popupController);
currentModule.directive('split', splitDirective);
currentModule.directive('projectCard', projectCard);

},{"../Project/card/projectCardDirective.js":4,"./accordion/accordion.js":7,"./popup/popupController.js":12,"./split/split.js":13}],12:[function(require,module,exports){
"use strict";

module.exports = function ($scope, $uibModalInstance, data) {
		$scope.data = data;

		//-- Methods --//

		$scope.done = function () {
				$uibModalInstance.close($scope.data);
		}; // end done

		$scope.close = function () {
				$uibModalInstance.close($scope.data);
		};
};

},{}],13:[function(require,module,exports){
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
  left.attr('layout-padding', '');
  right.replaceWith('<md-content flex layout-padding>' + rightContents + '</md-content>');
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

},{}],14:[function(require,module,exports){
'use strict';

require('./router.js');
var layout = require('./Layout/layout.js');
var demos = require('./components/demos.js');
var icons = require('./components/Icons/icons.js');

var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngMaterial', 'ngMdIcons', 'ncy-angular-breadcrumb', 'ngSanitize', 'dialogs.main', 'layout', 'demos', 'router']);
app.config(['$urlRouterProvider', '$stateProvider', 'ngMdIconServiceProvider', '$routerProvider', function ($urlRouterProvider, $stateProvider, ngMdIconServiceProvider, $routerProvider) {
  for (var e in icons) {
    ngMdIconServiceProvider.addShape(e, icons[e]);
  }
  $urlRouterProvider.otherwise('/FKP/Design');
  for (var e in $routerProvider.$get.routes) {
    $stateProvider.state(e, $routerProvider.$get.routes[e]);
  }
}]);
app.run(function ($rootScope, $state) {
  $rootScope.$state = $state;
  // or
  $rootScope.getHref = $state.href.bind($state);
});

app.provider('runtimeStates', function runtimeStates($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.
  this.$get = function ($q, $timeout, $state) {
    // for example
    return {
      addState: function addState(name, state) {
        $stateProvider.state(name, state);
      }
    };
  };
});

},{"./Layout/layout.js":2,"./components/Icons/icons.js":6,"./components/demos.js":11,"./router.js":15}],15:[function(require,module,exports){
'use strict';

var DesignController = require('./Design/designController');
var ProjectController = require('./Project/projectController');

angular.module('router', []).provider('$router', function () {

  this.$get = new function () {
    var self = this;
    self.createRoute = function (url, bindView, name) {
      return {
        url: url,
        views: {
          bindView: bindView
        },
        ncyBreadcrumb: {
          label: name
        }
      };
    };
    self.routes = {
      'home': {
        url: '/FKP',
        views: {
          'sidebar': { template: '<sidebar></sidebar>' }
        },
        ncyBreadcrumb: {
          label: 'ФКП'
        }
      },
      'home.design': {
        url: '/Design',
        views: {
          'content@': {
            templateUrl: 'app/Design/design-page.html',
            controller: DesignController
          }
        },
        ncyBreadcrumb: {
          label: 'Дизайн-страница'
        }
      },
      'home.projectStructure': {
        url: '/ProjectStructure',
        views: {
          'content@': {
            templateUrl: 'app/Project/project-page.html',
            controller: ProjectController
          }
        },
        ncyBreadcrumb: {
          label: 'Структура программы'
        }
      }
    };
    return this;
  }();
});

},{"./Design/designController":1,"./Project/projectController":5}]},{},[14])


//# sourceMappingURL=all.js.map
