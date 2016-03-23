'use strict';
var tabstripDirective = require('./tabstripDirective.js');
var currentModule = angular.module('tabstrip', []);
currentModule.directive('tabStrip', tabstripDirective);  /*
Has params href, type and state.

If href present - it is a direct href, other params ignored
state and type must present simultaneously:
  1) state - name of nested state to be redirected to
  2) type - parameter "type" that will be passed to that state

*/