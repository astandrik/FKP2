function DesignController($scope, dialogs) {
  $scope.treeData = window.testTree;
  $scope.create_popup = function()
  {
    var dlg = dialogs.create('app/components/popup/popup.html','popupController',{},{size: 'sm',animation: true});
  }
}
module.exports = DesignController;
