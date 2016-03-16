function DesignController($scope, dialogs) {
  $scope.treeData = window.testTree;
  $scope.create_popup = function()
  {
    var data = {name: "МЧС", responsible:"Иванов И.И.", tel:"222-33-22"};
    var dlg = dialogs.create('app/components/popup/popup.html','popupController',data,{size: 'sm',animation: true});
  }
}
module.exports = DesignController;
