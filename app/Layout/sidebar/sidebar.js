'use strict';
module.exports = function () {
  return {
    templateUrl: 'app/Layout/sidebar/sidebar.html',
    replace: true,
    controller: function controller($scope) {
      var directories = [
        {
          name: 'Структура программы',
          icon: 'business_center',
          state: 'home.projectStructure'
        },
        {
          name: 'Космические комплексы',
          icon: 'brightness_5',
          state: 'home.complexStructure'
        },
        { name: 'Финансирование' },
        { name: 'Заказчики' },
        { name: 'Планирование' },
        { name: 'Документация' },
        {
          name: 'События',
          icon: 'event',
          state: 'home.events'
        }
      ];
      $scope.directories = directories;
    }
  };
};
