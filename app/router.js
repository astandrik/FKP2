var DesignController = require('./Design/DesignController')

function createRoute(url, bindView, name) {
  return {
    url: url,
    views: {
      bindView
    },
    ncyBreadcrumb : {
      label: name
    }
  }
}

module.exports = {
  createRoute: createRoute,
  routes : {
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
}
};
