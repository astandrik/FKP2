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
  { name: 'Финансирование',
    icon: 'money',
    state: 'home.financeStructure'},

  { name: 'Заказчики',
    icon: 'people' },
  { name: 'Планирование',
    icon: 'access_time' },
  { name: 'Документация' ,
    icon: 'insert_drive_file'},
  {
    name: 'События',
    icon: 'event',
    state: 'home.events'
  }
];
var activateDir =  function(state) {
        directories.forEach((d) => {
          if(d.state && state.indexOf(d.state) > -1 && state != 'home') {
            d.isActive = true;
          } else {
            d.isActive = false;
          }
        })
      };
module.exports = {
  sidebar: function () {
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
