var currentModule = angular.module('dialogWorker', ['ngMaterial']);

currentModule.service('$errorDialogService', function($mdDialog, $mdMedia) {
  this.showError = function(message) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(false)
        .title('Внимание! Произошла ошибка:')
        .textContent(message)
        .ariaLabel('Ошибка')
        .ok('Ок')
    );
  };
});
