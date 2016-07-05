'use strict';
var eventsController = require('./eventsController.js');
var eventsFactory = require('./eventsFactory.js');
var eventsCard = require('./card/eventsCardDirective.js');
var currentModule = angular.module('events', []);
currentModule.controller('eventsStructureController', eventsController);
currentModule.factory('$eventsFactory', eventsFactory);
currentModule.directive('eventsCard', eventsCard);
