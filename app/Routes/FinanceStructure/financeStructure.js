function sumObject(obj) {
  var sum = 0;
  for(var e in obj) {
    if(!isNaN(obj[e])) sum += obj[e];
  }
  return sum;
}

var structure = {
  url: '/financeStructure',
  views: {
    'content@': {
      templateUrl: 'app/Finance/finance.html',
      controller: function ($scope){
        $scope.basename = "ФКП";
        $scope.finance= [
        {
          "2016": 3332,
          "2017": 3332,
          "2018": 3332,
          "2019": 3321,
          "2020": 12332,
          "2021": 3242,
          "2022": 45435,
          "2023": 12332,
          "2024": 3242,
          "2025": 45435,
        },
        {
          "2016": 3332,
          "2017": 3332,
          "2018": 3332,
          "2019": 3321,
          "2020": 12332,
          "2021": 3242,
          "2022": 45435,
          "2023": 12332,
          "2024": 3242,
          "2025": 45435,
        }
      ];

var a=0;
for (var i = 0; i<$scope.finance.length; i++){
  a = sumObject($scope.finance[i]);
  $scope.finance[i]['Всего'] = a;
}

    }
    }
  },
  ncyBreadcrumb: { label: 'Финансирование', toolTipInterpolated: 'Финансирование' }
};
module.exports = structure;
