(function () {
  angular.module('layout').directive('sidebar',function() {return  {
    templateUrl: 'app/Layout/components/sidebar/sidebar.html',
    replace: true,
    controller: function ($scope) {
    }
  }});
}());
