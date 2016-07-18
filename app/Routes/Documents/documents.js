'use strict';
module.exports = {
  url: '/Documents',
  views: {
    'content@': {
      templateUrl: 'app/Routes/Documents/documents.html',
      controller: function($scope,documents, news, $state) {
        var documents = documents.data;
        var news = news.data;
        $scope.news = [];
        $scope.docs = [];
        documents.forEach((item) => {
          var obj = {};
          obj['Название документа'] = item.name;
          obj['Дата'] = item.date.toString().split(' ')[0].split('-').reverse().join('.');
          obj['Тип документа'] = item.type.name;
          obj['Номер раздела'] = '';//item.;
          obj['Автор'] = item.author;
          $scope.docs.push(obj);
        });
        news.forEach((item) => {
          var n = {};
          n.name = item.name;
          n.date = item.date.toString().split(' ')[0].split('-').reverse().join('.');
          $scope.news.push(n);
        });
        $scope.gridOptions = {
          enableSorting:true,
          enableFiltering:false,
          rowHeight: 50,
          columnDefs: [
            {field: 'Название документа'},
            {field: 'Дата'},
            {field: 'Тип документа'},
            {field: 'Номер раздела'},
            {field: 'Автор'}
          ],
          data: $scope.docs
        };
      },
      resolve: {
        documents: function($documents) {
          return $documents.getList().then(function (data) {
            return data.data;
          });
        },
        news: function($news) {
          return $news.getList().then(function(data) {
            return data.data;
          })
        }
      }
    }
  },
  ncyBreadcrumb: { label: 'Документация' }
}
