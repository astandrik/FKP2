'use strict';
var routes = require('./Routes/routes.js');
angular.module('router', []).provider('$router', function () {
  this.$get = new function () {
    var self = this;
    self.routes = {
      'home': {
        url: '/FKP',
        views: {
          'sidebar': { template: '<sidebar></sidebar>' },
          'content@' : {
            templateUrl: 'app/Layout/homepage.html'
          }
        },
        ncyBreadcrumb: { label: 'ФКП' }
      },
      'home.design': routes.design,
      'home.projectStructure': routes.projectStructure,
      'home.projectStructure.section': routes.section,
      'home.projectStructure.section.project': routes.projectThird,
      'home.projectStructure.section.project.tab': routes.projectSectionThird,
      'home.projectStructure.section.subSection': routes.subsection,
      'home.projectStructure.section.subSection.project': routes.project,
      'home.projectStructure.section.subSection.project.tab': routes.projectSection,
      'home.spaceComplexStructure': routes.spaceComplexStructure,
      'home.spaceComplexStructure.spaceComplexSection': routes.spaceComplexSection,
      'home.spaceComplexStructure.spaceComplexSection.spaceComplexSubSection': routes.spaceComplexSubSection,
      'home.spaceComplexStructure.spaceComplexSection.spaceComplexSubSection.spaceComplexComplex': routes.spaceComplexComplex,
      'home.spaceComplexStructure.spaceComplexSection.spaceComplexSubSection.spaceComplexComplex.spaceComplexComplexSection': routes.spaceComplexComplexSection,
      'home.events': routes.events,
      'home.events.card': routes.eventsCard,
      'home.events.card.section': routes.eventsSection,

      'home.financeStructure': routes.financeStructure,
      'home.financeStructure.section': routes.financeSection,
      'home.financeStructure.section.subsection': routes.financeSubSection,

      'home.financeStructure.sections': routes.financeSections,
      'home.financeStructure.sections.section': routes.financeSectionSubSections,
      'home.financeStructure.sections.section.subsection': routes.financeSectionSubSectionsProjects,
      'home.financeStructure.subsections': routes.financeSubSections,
      'home.financeStructure.subsections.subsection': routes.financeSubSectionsProjects,
      'home.financeStructure.projects': routes.financeProjects,

      'home.documents': routes.documents,
      'home.orderers': routes.orderers,
      'home.orderers.card': routes.orderersCard,
      'home.orderers.card.section': routes.orderersCardSection,
      'home.plan': routes.plan
    };
    return this;
  }();
});
