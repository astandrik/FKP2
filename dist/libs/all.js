(function () {
  angular.module('layout', []);
}());
(function () {
  var app = angular.module('app', [
    'ui.router',
    'ngMaterial',
    'layout'
  ]);
  app.config([
    '$urlRouterProvider',
    '$stateProvider',
    function ($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('home', {
        url: '/',
        views: {
          'sidebar': { template: '<sidebar></sidebar>' },
          'content': { template: 'TEST' }
        }
      });
    }
  ]);
  app.run(function () {
  });
}());

(function () {
  angular.module('layout').controller(function () {
  });
}());
(function () {
  angular.module('layout').directive('sidebar',function() {return  {
    templateUrl: 'app/Layout/components/sidebar/sidebar.html',
    replace: true,
    controller: ["$scope", function ($scope) {
    }]
  }});
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxheW91dC9tb2R1bGVzL2xheW91dC5qcyIsImluZGV4LmpzIiwiTGF5b3V0L0xheW91dENvbnRyb2xsZXIuanMiLCJMYXlvdXQvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxZQUFBO0VBQ0EsUUFBQSxPQUFBLFVBQUE7O0FDREEsQ0FBQSxZQUFBO0VBQ0EsSUFBQSxNQUFBLFFBQUEsT0FBQSxPQUFBO0lBQ0E7SUFDQTtJQUNBOztFQUVBLElBQUEsT0FBQTtJQUNBO0lBQ0E7SUFDQSxVQUFBLG9CQUFBLGdCQUFBO01BQ0EsbUJBQUEsVUFBQTtNQUNBLGVBQUEsTUFBQSxRQUFBO1FBQ0EsS0FBQTtRQUNBLE9BQUE7VUFDQSxXQUFBLEVBQUEsVUFBQTtVQUNBLFdBQUEsRUFBQSxVQUFBOzs7OztFQUtBLElBQUEsSUFBQSxZQUFBOzs7O0FDcEJBLENBQUEsWUFBQTtFQUNBLFFBQUEsT0FBQSxVQUFBLFdBQUEsWUFBQTs7O0FDREEsQ0FBQSxZQUFBO0VBQ0EsUUFBQSxPQUFBLFVBQUEsVUFBQSxVQUFBLFdBQUEsQ0FBQSxRQUFBO0lBQ0EsYUFBQTtJQUNBLFNBQUE7SUFDQSx1QkFBQSxVQUFBLFFBQUE7Ozs7QUFJQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICBhbmd1bGFyLm1vZHVsZSgnbGF5b3V0JywgW10pO1xufSgpKTsiLCIoZnVuY3Rpb24gKCkge1xuICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgICAndWkucm91dGVyJyxcbiAgICAnbmdNYXRlcmlhbCcsXG4gICAgJ2xheW91dCdcbiAgXSk7XG4gIGFwcC5jb25maWcoW1xuICAgICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgICckc3RhdGVQcm92aWRlcicsXG4gICAgZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJHN0YXRlUHJvdmlkZXIpIHtcbiAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbiAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAnc2lkZWJhcic6IHsgdGVtcGxhdGU6ICc8c2lkZWJhcj48L3NpZGViYXI+JyB9LFxuICAgICAgICAgICdjb250ZW50JzogeyB0ZW1wbGF0ZTogJ1RFU1QnIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiAgYXBwLnJ1bihmdW5jdGlvbiAoKSB7XG4gIH0pO1xufSgpKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gIGFuZ3VsYXIubW9kdWxlKCdsYXlvdXQnKS5jb250cm9sbGVyKGZ1bmN0aW9uICgpIHtcbiAgfSk7XG59KCkpOyIsIihmdW5jdGlvbiAoKSB7XG4gIGFuZ3VsYXIubW9kdWxlKCdsYXlvdXQnKS5kaXJlY3RpdmUoJ3NpZGViYXInLGZ1bmN0aW9uKCkge3JldHVybiAge1xuICAgIHRlbXBsYXRlVXJsOiAnYXBwL0xheW91dC9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci5odG1sJyxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgICB9XG4gIH19KTtcbn0oKSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
