'use strict';
var currentModule = angular.module('errorsModule', ['dialogWorker']);
function errorRouter($errorDialogService, type, message) {
  switch (type) {
  case '$stateChangeError':
    $errorDialogService.showError(message);
    break;
  case 'httpGet':
    console.log('Ошибка получения данных по пути ' + message);
    break;
  default:
    console.log('Неизвестная ошибка');
  }
}
function errorHandler($errorDialogService) {
  this.handleError = errorRouter.bind(this, $errorDialogService);
}
currentModule.service('$errorHandler', errorHandler);