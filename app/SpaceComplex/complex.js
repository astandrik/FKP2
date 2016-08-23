'use strict';
var factory = require('./complexFactory.js');
var currentModule = angular.module('complex', []);
currentModule.factory('$complexFactory', factory);
currentModule.value('$complexDict', { dict: {} });
