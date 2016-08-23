'use strict';

require('./router.js');
require('./Project/project.js');
require('./SpaceComplex/complex.js');
require('./Design/design.js');
require('./core/cache/cache.js');
require('./core/dialogs/dialogs.js');
require('./core/errorHandler/errors.js');
require('./core/stateManager.js');
require('./Events/events.js');
require('./Documents/documents.js');
require('./Orderers/orderers.js');
require('./Plan/plan.js');
require('./Finance/finance.js');
var layout = require('./Layout/layout.js');
var components = require('./components/components.js');
var icons = require('./components/Icons/icons.js');
var activateDir = require('./Layout/sidebar/sidebar.js').activateDir;
window.angular = angular;
var app = angular.module('app', [
  'cache-custom',
  'dialogWorker',
  'errorsModule',
  'ui.router',
  'ngMaterial',
  'ngMdIcons',
  'ncy-angular-breadcrumb',
  'ngSanitize',
  'dialogs.main',
  'layout',
  'components',
  'router',
  'project',
  'complex',
  'design',
  'documents',
'stateManager',
'events',
'orderers',
'finance',
"isteven-multi-select","plan",
'ngCookies',
require('angular-ui-bootstrap'),
require('angular-cookies')
]);
var dateFormat=function(){var t=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,e=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,a=/[^-+\dA-Z]/g,m=function(t,e){for(t=String(t),e=e||2;t.length<e;)t="0"+t;return t};return function(d,n,r){var y=dateFormat;if(1!=arguments.length||"[object String]"!=Object.prototype.toString.call(d)||/\d/.test(d)||(n=d,d=void 0),d=d?new Date(d):new Date,isNaN(d))throw SyntaxError("invalid date");n=String(y.masks[n]||n||y.masks["default"]),"UTC:"==n.slice(0,4)&&(n=n.slice(4),r=!0);var s=r?"getUTC":"get",i=d[s+"Date"](),o=d[s+"Day"](),u=d[s+"Month"](),M=d[s+"FullYear"](),l=d[s+"Hours"](),T=d[s+"Minutes"](),h=d[s+"Seconds"](),c=d[s+"Milliseconds"](),g=r?0:d.getTimezoneOffset(),S={d:i,dd:m(i),ddd:y.i18n.dayNames[o],dddd:y.i18n.dayNames[o+7],m:u+1,mm:m(u+1),mmm:y.i18n.monthNames[u],mmmm:y.i18n.monthNames[u+12],yy:String(M).slice(2),yyyy:M,h:l%12||12,hh:m(l%12||12),H:l,HH:m(l),M:T,MM:m(T),s:h,ss:m(h),l:m(c,3),L:m(c>99?Math.round(c/10):c),t:12>l?"a":"p",tt:12>l?"am":"pm",T:12>l?"A":"P",TT:12>l?"AM":"PM",Z:r?"UTC":(String(d).match(e)||[""]).pop().replace(a,""),o:(g>0?"-":"+")+m(100*Math.floor(Math.abs(g)/60)+Math.abs(g)%60,4),S:["th","st","nd","rd"][i%10>3?0:(i%100-i%10!=10)*i%10]};return n.replace(t,function(t){return t in S?S[t]:t.slice(1,t.length-1)})}}();dateFormat.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"},dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]},Date.prototype.format=function(t,e){return dateFormat(this,t,e)};
app.config([
  '$locationProvider',
  '$urlRouterProvider',
  '$stateProvider',
  'ngMdIconServiceProvider',
  '$routerProvider',
  'calendarConfig',
  '$breadcrumbProvider',
  'CacheFactoryProvider',
  '$provide',
  function ($locationProvider,$urlRouterProvider, $stateProvider, ngMdIconServiceProvider, $routerProvider, calendarConfig, $breadcrumbProvider, CacheFactoryProvider, $provide) {
    angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
    $breadcrumbProvider.setOptions({ templateUrl: 'app/components/breadcrumbs.html' });
    for (var e in icons) {
      ngMdIconServiceProvider.addShape(e, icons[e]);
    }
    $urlRouterProvider.otherwise('/FKP');
    for (var e in $routerProvider.$get.routes) {
      $stateProvider.state(e, $routerProvider.$get.routes[e]);
    }
    calendarConfig.dateFormatter = 'moment';  // use moment to format dates
  }
]);
app.run(function ($rootScope, $state, $cacheRunner, $errorDialogService, $errorHandler) {
  if($(window).width() < 1430) {
    $('body').addClass('smallScreen');
  }
  $cacheRunner.setOptions({
    checkRate: 4000,
    cacheRate: 1000
  });
  $cacheRunner.startCacheRunner();
  $cacheRunner.runCacheProcess();
  $rootScope.$state = $state;
  $rootScope.getHref = $state.href.bind($state);
  $rootScope.sectionCutFunction = function sectionCutFunction(section) {
    if (section && section.length > 30) {
      var p = section;
      p = p.slice(0, p.indexOf('.'));
      return p;
    } else {
      return section;
    }
  };
  $rootScope.subsectionCutFunction = function subsectionCutFunction(subsection) {
    if (subsection && subsection.length > 30) {
      var s = subsection;
      s = s.slice(0, 30).concat('...');
      return s;
    } else {
      return subsection;
    }
  };
  $rootScope.projectCutFunction = function projectCutFunction(project) {
    if (project && project.length > 30) {
      return project.slice(0, 30).concat('...');
    } else {
      return project;
    }
  };
  window.getHref = $rootScope.getHref;
  $rootScope.getCurrentState = function () {
    return $state.current.name;
  };
  $rootScope.getCurrentHref = function () {
    return $rootScope.getHref($rootScope.getCurrentState());
  };
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    activateDir(toState.name);
      $rootScope.isLoading=false;
  });
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
      $rootScope.isLoading=true;
  });
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    $rootScope.isLoading=false;
    debugger;
    if (error && error.config && error.config.url) {
      $errorHandler.handleError(event.name, 'Ошибка перехода по пути ' + error.config.url + '. Обратитесь к системному администратору.');
    } else {
      $errorHandler.handleError(event.name, 'Неизвестная ошибка. Обратитесь к системному администратору.');
    }
  });
  $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
    $rootScope.isLoading=false;
  });
});
