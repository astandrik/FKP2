var documentsFactory = require('./documentsFactory.js');
var news = require('./documentNews.js');
var currentModule = angular.module('documents', [ 'ui.grid']);
currentModule.factory('$documents', documentsFactory);
currentModule.factory('$news', news);
