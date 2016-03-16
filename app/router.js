var DesignController = require('./Design/DesignController')

module.exports = {
  homeRoute: {
    url: '/FKP',
    views: {
      'sidebar': {template: '<sidebar></sidebar>'}
    },
    ncyBreadcrumb: {
        label: 'ФКП'
      }
  },
  designRoute:{
    url: '/Design',
    views: {
      'content@': {
         templateUrl: 'app/Design/design-page.html',
         controller: DesignController
       }
    },
    ncyBreadcrumb: {
        label: 'Дизайн-страница'
    }
  }
};
