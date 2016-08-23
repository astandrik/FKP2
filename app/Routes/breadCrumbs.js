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
  spaceComplexSection: {
    label: '{{section.name}}',
    toolTip: '{{section.name}}',
    dependencies: []
  },
  spaceComplexSectionSection: {
    label: '{{section2.name}}',
    toolTip: '{{section2.name}}',
    dependencies: []
  },
  spaceComplexSectionSectionSection: {
    label: '{{section3.name}}',
    toolTip: '{{section3.name}}',
    dependencies: []
  },
  complexSubSection: {
    label: '{{subSection.name}}',
    toolTip: '{{subSection.name}}',
    dependencies: ['complexSection']
  },
  complexSection: {
    label: '{{complexFull.name}}',
    toolTip: '{{complexFull.name}}',
    dependencies: [
      'spaceComplexSection'
    ]
  },
  complexSection2: {
    label: '{{complex.name}}',
    toolTip: '{{complex.name}}',
    dependencies: [
      'spaceComplexSection',
      'spaceComplexSectionSection',
    ]
  },
  complexSection3: {
    label: '{{complex.name}}',
    toolTip: '{{complex.name}}',
    dependencies: [
      'spaceComplexSection',
      'spaceComplexSectionSection',
      'spaceComplexSectionSectionSection'
    ]
  },
  complexSectionSection: {
    label: '{{sectionName}}',
    toolTip: '{{sectionName}}',
    dependencies: []
  },
  financeSection: {
    label: '{{sectionCutFunction(parentCurrName)}}',
    toolTip: '{{currName}}',
    dependencies: []
  },
  financeSubSection: {
    label: '{{currName}}',
    toolTip: '{{currName}}',
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
