angular.module('layout').directive('sidebar', function() {
    return {
        templateUrl: 'app/Layout/components/sidebar/sidebar.html',
        replace: true,
        controller: function($scope) {
            var directories = [{
                name: 'Дизайн',
                icon: "wheelChair",
                state: 'home.design'
            }, {
                name: 'Структура программы',
                icon: 'business_center'
            }, {
                name: 'Космические комплексы',
                icon: 'brightness_5'
            }, {
                name: 'Финансирование'
            }, {
                name: 'Заказчики'
            }, {
                name: 'Планирование'
            }, {
                name: 'Документация'
            }, {
                name: 'События'
            }];
            $scope.directories = directories;
        }
    };
});
