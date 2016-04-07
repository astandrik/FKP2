function CC($scope,treeData, dialogs) {
  $scope.treeData = treeData;

  $scope.create_popup = function () {
    var data = {
      name: 'МЧС',
      responsible: 'Иванов И.И.',
      tel: '222-33-22'
    };
    var dlg = dialogs.create('app/components/popup/popup.html', 'popupController', data, {
      size: 'sm',
      animation: true
    });
  };
  $scope.tabstripData = [
    {
      name: 'Общие сведения',
      state: 'complexSection',
      type: 'general'
    },
    {
      name: 'Описание',
      state: 'complexSection',
      type: 'description'
    },
    {
      name: 'Связанные проекты',
      state: 'complexSection',
      type: 'relatedProjects' }
  ];
}

module.exports = CC;
