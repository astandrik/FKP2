'use strict';
var crumbs = {
  section: {
    label: '{{sectionCutFunction(section.name)}}',
    toolTip: '{{section.name}}',
    dependencies: []
  },
  subsection: {
    label: '{{subsectionCutFunction(subsection.name)}}',
    toolTip: '{{subsection.name}}',
    dependencies: ['section']
  },
  project: {
    label: 'Проект {{projectCutFunction(project.cipher) || projectCutFunction(project.name)}}',
    toolTip: '{{project.name}}',
    dependencies: [
      'section',
      'subsection'
    ]
  },
  projectSection: {
    label: '{{sectionName}}',
    toolTip: '{{sectionName}}',
    dependencies: []
  },
  complexSection: {
    label: '{{section.name}}',
    toolTip: '{{section.name}}',
    dependencies: []
  },
  complexSubSection: {
    label: '{{subSection.name}}',
    toolTip: '{{subSection.name}}',
    dependencies: ['complexSection']
  },
  complex: {
    label: '{{complex.name}}',
    toolTip: '{{complex.name}}',
    dependencies: [
      'complexSection',
      'complexSubSection'
    ]
  },
  complexSectionSection: {
    label: '{{sectionName}}',
    toolTip: '{{sectionName}}',
    dependencies: []
  },
  financeSection: {
    label: '{{sectionCutFunction(section.name)}}',
    toolTip: '{{section.name}}',
    dependencies: []
  },
  financeSubSection: {
    label: '{{subsectionCutFunction(subsection.name)}}',
    toolTip: '{{subsection.name}}',
    dependencies: ['financeSection']
  },

  eventsSection: {
    label: '{{event.title}}',
    toolTip: '{{event.title}}',
    dependencies: []
  },

  orderer: {
    label: '{{orderer.name}}',
    toolTip: '{{orderer.name}}',
    dependencies: []
  },

  orderersSection: {
    label: '{{sectionName}}',
    toolTip: '{{sectionName}}',
    dependencies: ['orderer']
  }
};
function interpolateTooltips(interpolate, type, scope) {
  crumbs[type].dependencies.forEach(function (dep) {
    interpolateTooltips(interpolate, dep, scope);
  });
  crumbs[type].toolTipInterpolated = interpolate(crumbs[type].toolTip)(scope);
}
function init(interpolate, type, scope) {
  interpolateTooltips(interpolate, type, scope);
  return crumbs;
}
module.exports = {
  init: init,
  crumbs: crumbs
};
