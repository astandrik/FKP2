'use strict';
var planFactory = require('./planFactory.js');
var planController = require('./planController.js');
var currentModule = angular.module('plan', []);
currentModule.controller('planController', planController);
currentModule.factory('$planFactory', planFactory);
