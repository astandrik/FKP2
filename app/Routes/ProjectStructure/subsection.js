var breadcrumbs =  require('./breadcrumbs.js');
var entity = {
  url: '/subsection/:subsectionId',
  views: {
    'projectInfo@home.projectStructure': {
      templateUrl: 'app/Project/card/subsection-card.html',
      controller: function controller($scope, subsection,section,$interpolate) {
        $scope.subsection = subsection;
        $scope.section = section;
        breadcrumbs.init($interpolate,'subsection',$scope);
      }
    }
  },
  ncyBreadcrumb:breadcrumbs.crumbs.subsection,
  resolve: {
    subsection: function ($http, $stateParams,$subsectionFactory) {
      var id = $stateParams.subsectionId;
      return $subsectionFactory.getById(id).then(function (data) {
        return data.data.data;
      });
    },
  }
}

module.exports = entity;
