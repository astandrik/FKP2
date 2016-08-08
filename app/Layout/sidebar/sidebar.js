'use strict';
var directories = [
  {
    name: 'Структура программы',
    icon: 'business_center',
    state: 'home.projectStructure'
  },
  {
    name: 'Космические комплексы',
    icon: 'brightness_5',
    state: 'home.spaceComplexStructure'
  },
  {
    name: 'Финансирование',
    icon: 'money',
    state: 'home.financeStructure'
  },
  {
    name: 'Заказчики',
    icon: 'people',
    state: 'home.orderers'
  },
  {
    name: 'Планирование',
    icon: 'access_time',
    state: 'home.plan',
    isNonActive: true
  },
  {
    name: 'Документация',
    icon: 'insert_drive_file',
    state: 'home.documents'
  },
  {
    name: 'События',
    icon: 'event',
    state: 'home.events'
  }
];
var activateDir = function activateDir(state) {
  directories.forEach(function (d) {
    if (d.state && state.indexOf(d.state) > -1 && state != 'home') {
      d.isActive = true;
    } else {
      d.isActive = false;
    }
  });
};
module.exports = {
  sidebar: function sidebar() {
    return {
      templateUrl: 'app/Layout/sidebar/sidebar.html',
      replace: true,
      controller: function controller($scope) {
        $scope.directories = directories;
      }
    };
  },
  activateDir: activateDir
};
