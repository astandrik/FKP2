(function() {
  angular.module('demos',[]);
}()); 

(function () {
  angular.module('layout', []);
}());
(function () {
  var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'ngMaterial',
    'ngMdIcons',
    'ncy-angular-breadcrumb',
    'layout',
    'demos'
  ]);
  app.config([
    '$urlRouterProvider',
    '$stateProvider',
    'ngMdIconServiceProvider' ,
    function ($urlRouterProvider, $stateProvider,ngMdIconServiceProvider) {
      ngMdIconServiceProvider.addShape('wheelChair', '<path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"></path>');
      $urlRouterProvider.otherwise('/Main/Design');
      $stateProvider
      .state('home', {
        url: '/Main',
        abstract:true,
        views: {
          'sidebar': {template: '<sidebar></sidebar>'}
        },
        ncyBreadcrumb: {
            label: 'ФКП'
          }
      })
      .state('home.design', {
        url: '/Design',
        views: {
          'content@': { templateUrl: 'app/Design/design-page.html' }
        },
        ncyBreadcrumb: {
            label: 'Дизайн-страница'
          }
      });
    }
  ]);
  app.run(["$rootScope", "$state", function($rootScope,$state) {
    $rootScope.$state = $state;
   // or
    $rootScope.getHref = $state.href.bind($state);
   }]);
}());


(function () {
  angular.module('layout').controller(function () {
  });
}());
(
    function() {
        angular.module('demos').directive('accordionTree', function() {
            return {
                templateUrl: 'app/components/accordion/accordion.html',
                replace: true,
                link: function(scope, element, attrs) {
                  $('.toggle').click(function(e) {
                    	e.preventDefault();

                      var $this = $(this);
                      if ($this.next().hasClass('show')) {
                          $this.next().slideUp(500, function() {
                            $this.next().removeClass('show');
                          });
                      } else {
                        $this.next().slideDown(500, function() {
                          $this.next().addClass('show');
                        });
                      }
                  });
                }
            };
        });
    }());

(function () {
  angular.module('layout').directive('sidebar', function () {
    return {
      templateUrl: 'app/Layout/components/sidebar/sidebar.html',
      replace: true,
      controller: ["$scope", function ($scope) {
        var directories = [
          {
            name: 'Дизайн',
            icon: "wheelChair" ,
            state: 'home.design'
          },
          {
            name: 'Структура программы',
            icon: 'business_center'
          },
          {
            name: 'Космические комплексы',
            icon: 'brightness_5'
          },
          { name: 'Финансирование' },
          { name: 'Заказчики' },
          { name: 'Планирование' },
          { name: 'Документация' },
          { name: 'События' }
        ];
        $scope.directories = directories;
      }]
    };
  });
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbW9kdWxlcy9kZW1vcy5qcyIsIkxheW91dC9tb2R1bGVzL2xheW91dC5qcyIsImluZGV4LmpzIiwiTGF5b3V0L0xheW91dENvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2FjY29yZGlvbi9hY2NvcmRpb24uanMiLCJMYXlvdXQvY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxXQUFBO0VBQ0EsUUFBQSxPQUFBLFFBQUE7OztBQ0RBLENBQUEsWUFBQTtFQUNBLFFBQUEsT0FBQSxVQUFBOztBQ0RBLENBQUEsWUFBQTtFQUNBLElBQUEsTUFBQSxRQUFBLE9BQUEsT0FBQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztFQUVBLElBQUEsT0FBQTtJQUNBO0lBQ0E7SUFDQTtJQUNBLFVBQUEsb0JBQUEsZUFBQSx5QkFBQTtNQUNBLHdCQUFBLFNBQUEsY0FBQTtNQUNBLG1CQUFBLFVBQUE7TUFDQTtPQUNBLE1BQUEsUUFBQTtRQUNBLEtBQUE7UUFDQSxTQUFBO1FBQ0EsT0FBQTtVQUNBLFdBQUEsQ0FBQSxVQUFBOztRQUVBLGVBQUE7WUFDQSxPQUFBOzs7T0FHQSxNQUFBLGVBQUE7UUFDQSxLQUFBO1FBQ0EsT0FBQTtVQUNBLFlBQUEsRUFBQSxhQUFBOztRQUVBLGVBQUE7WUFDQSxPQUFBOzs7OztFQUtBLElBQUEsNkJBQUEsU0FBQSxXQUFBLFFBQUE7SUFDQSxXQUFBLFNBQUE7O0lBRUEsV0FBQSxVQUFBLE9BQUEsS0FBQSxLQUFBOzs7OztBQzFDQSxDQUFBLFlBQUE7RUFDQSxRQUFBLE9BQUEsVUFBQSxXQUFBLFlBQUE7OztBQ0RBO0lBQ0EsV0FBQTtRQUNBLFFBQUEsT0FBQSxTQUFBLFVBQUEsaUJBQUEsV0FBQTtZQUNBLE9BQUE7Z0JBQ0EsYUFBQTtnQkFDQSxTQUFBO2dCQUNBLE1BQUEsU0FBQSxPQUFBLFNBQUEsT0FBQTtrQkFDQSxFQUFBLFdBQUEsTUFBQSxTQUFBLEdBQUE7cUJBQ0EsRUFBQTs7c0JBRUEsSUFBQSxRQUFBLEVBQUE7c0JBQ0EsSUFBQSxNQUFBLE9BQUEsU0FBQSxTQUFBOzBCQUNBLE1BQUEsT0FBQSxRQUFBLEtBQUEsV0FBQTs0QkFDQSxNQUFBLE9BQUEsWUFBQTs7NkJBRUE7d0JBQ0EsTUFBQSxPQUFBLFVBQUEsS0FBQSxXQUFBOzBCQUNBLE1BQUEsT0FBQSxTQUFBOzs7Ozs7Ozs7QUNqQkEsQ0FBQSxZQUFBO0VBQ0EsUUFBQSxPQUFBLFVBQUEsVUFBQSxXQUFBLFlBQUE7SUFDQSxPQUFBO01BQ0EsYUFBQTtNQUNBLFNBQUE7TUFDQSx1QkFBQSxVQUFBLFFBQUE7UUFDQSxJQUFBLGNBQUE7VUFDQTtZQUNBLE1BQUE7WUFDQSxNQUFBO1lBQ0EsT0FBQTs7VUFFQTtZQUNBLE1BQUE7WUFDQSxNQUFBOztVQUVBO1lBQ0EsTUFBQTtZQUNBLE1BQUE7O1VBRUEsRUFBQSxNQUFBO1VBQ0EsRUFBQSxNQUFBO1VBQ0EsRUFBQSxNQUFBO1VBQ0EsRUFBQSxNQUFBO1VBQ0EsRUFBQSxNQUFBOztRQUVBLE9BQUEsY0FBQTs7Ozs7QUFLQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcbiAgYW5ndWxhci5tb2R1bGUoJ2RlbW9zJyxbXSk7XHJcbn0oKSk7IFxyXG4iLCIoZnVuY3Rpb24gKCkge1xuICBhbmd1bGFyLm1vZHVsZSgnbGF5b3V0JywgW10pO1xufSgpKTsiLCIoZnVuY3Rpb24gKCkge1xuICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgICAndWkucm91dGVyJyxcbiAgICAndWkuYm9vdHN0cmFwJyxcbiAgICAnbmdNYXRlcmlhbCcsXG4gICAgJ25nTWRJY29ucycsXG4gICAgJ25jeS1hbmd1bGFyLWJyZWFkY3J1bWInLFxuICAgICdsYXlvdXQnLFxuICAgICdkZW1vcydcbiAgXSk7XG4gIGFwcC5jb25maWcoW1xuICAgICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgICckc3RhdGVQcm92aWRlcicsXG4gICAgJ25nTWRJY29uU2VydmljZVByb3ZpZGVyJyAsXG4gICAgZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJHN0YXRlUHJvdmlkZXIsbmdNZEljb25TZXJ2aWNlUHJvdmlkZXIpIHtcbiAgICAgIG5nTWRJY29uU2VydmljZVByb3ZpZGVyLmFkZFNoYXBlKCd3aGVlbENoYWlyJywgJzxwYXRoIGQ9XCJNMTkgMTN2LTJjLTEuNTQuMDItMy4wOS0uNzUtNC4wNy0xLjgzbC0xLjI5LTEuNDNjLS4xNy0uMTktLjM4LS4zNC0uNjEtLjQ1LS4wMSAwLS4wMS0uMDEtLjAyLS4wMUgxM2MtLjM1LS4yLS43NS0uMy0xLjE5LS4yNkMxMC43NiA3LjExIDEwIDguMDQgMTAgOS4wOVYxNWMwIDEuMS45IDIgMiAyaDV2NWgydi01LjVjMC0xLjEtLjktMi0yLTJoLTN2LTMuNDVjMS4yOSAxLjA3IDMuMjUgMS45NCA1IDEuOTV6bS02LjE3IDVjLS40MSAxLjE2LTEuNTIgMi0yLjgzIDItMS42NiAwLTMtMS4zNC0zLTMgMC0xLjMxLjg0LTIuNDEgMi0yLjgzVjEyLjFjLTIuMjguNDYtNCAyLjQ4LTQgNC45IDAgMi43NiAyLjI0IDUgNSA1IDIuNDIgMCA0LjQ0LTEuNzIgNC45LTRoLTIuMDd6XCI+PC9wYXRoPicpO1xuICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL01haW4vRGVzaWduJyk7XG4gICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvTWFpbicsXG4gICAgICAgIGFic3RyYWN0OnRydWUsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgJ3NpZGViYXInOiB7dGVtcGxhdGU6ICc8c2lkZWJhcj48L3NpZGViYXI+J31cbiAgICAgICAgfSxcbiAgICAgICAgbmN5QnJlYWRjcnVtYjoge1xuICAgICAgICAgICAgbGFiZWw6ICfQpNCa0J8nXG4gICAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnaG9tZS5kZXNpZ24nLCB7XG4gICAgICAgIHVybDogJy9EZXNpZ24nLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgICdjb250ZW50QCc6IHsgdGVtcGxhdGVVcmw6ICdhcHAvRGVzaWduL2Rlc2lnbi1wYWdlLmh0bWwnIH1cbiAgICAgICAgfSxcbiAgICAgICAgbmN5QnJlYWRjcnVtYjoge1xuICAgICAgICAgICAgbGFiZWw6ICfQlNC40LfQsNC50L0t0YHRgtGA0LDQvdC40YbQsCdcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIF0pO1xuICBhcHAucnVuKGZ1bmN0aW9uKCRyb290U2NvcGUsJHN0YXRlKSB7XG4gICAgJHJvb3RTY29wZS4kc3RhdGUgPSAkc3RhdGU7XG4gICAvLyBvclxuICAgICRyb290U2NvcGUuZ2V0SHJlZiA9ICRzdGF0ZS5ocmVmLmJpbmQoJHN0YXRlKTtcbiAgIH0pO1xufSgpKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gIGFuZ3VsYXIubW9kdWxlKCdsYXlvdXQnKS5jb250cm9sbGVyKGZ1bmN0aW9uICgpIHtcbiAgfSk7XG59KCkpOyIsIihcclxuICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGFuZ3VsYXIubW9kdWxlKCdkZW1vcycpLmRpcmVjdGl2ZSgnYWNjb3JkaW9uVHJlZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9hY2NvcmRpb24vYWNjb3JkaW9uLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgICAgICAgICAgICAkKCcudG9nZ2xlJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoJHRoaXMubmV4dCgpLmhhc0NsYXNzKCdzaG93JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5uZXh0KCkuc2xpZGVVcCg1MDAsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMubmV4dCgpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGhpcy5uZXh0KCkuc2xpZGVEb3duKDUwMCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMubmV4dCgpLmFkZENsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH0oKSk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XG4gIGFuZ3VsYXIubW9kdWxlKCdsYXlvdXQnKS5kaXJlY3RpdmUoJ3NpZGViYXInLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0xheW91dC9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci5odG1sJyxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICAgICAgIHZhciBkaXJlY3RvcmllcyA9IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAn0JTQuNC30LDQudC9JyxcbiAgICAgICAgICAgIGljb246IFwid2hlZWxDaGFpclwiICxcbiAgICAgICAgICAgIHN0YXRlOiAnaG9tZS5kZXNpZ24nXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAn0KHRgtGA0YPQutGC0YPRgNCwINC/0YDQvtCz0YDQsNC80LzRiycsXG4gICAgICAgICAgICBpY29uOiAnYnVzaW5lc3NfY2VudGVyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ9Ca0L7RgdC80LjRh9C10YHQutC40LUg0LrQvtC80L/Qu9C10LrRgdGLJyxcbiAgICAgICAgICAgIGljb246ICdicmlnaHRuZXNzXzUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7IG5hbWU6ICfQpNC40L3QsNC90YHQuNGA0L7QstCw0L3QuNC1JyB9LFxuICAgICAgICAgIHsgbmFtZTogJ9CX0LDQutCw0LfRh9C40LrQuCcgfSxcbiAgICAgICAgICB7IG5hbWU6ICfQn9C70LDQvdC40YDQvtCy0LDQvdC40LUnIH0sXG4gICAgICAgICAgeyBuYW1lOiAn0JTQvtC60YPQvNC10L3RgtCw0YbQuNGPJyB9LFxuICAgICAgICAgIHsgbmFtZTogJ9Ch0L7QsdGL0YLQuNGPJyB9XG4gICAgICAgIF07XG4gICAgICAgICRzY29wZS5kaXJlY3RvcmllcyA9IGRpcmVjdG9yaWVzO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
