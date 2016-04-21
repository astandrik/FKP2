var crumbs  =
{
  section:  { label: '{{sectionCutFunction(section.name)}}', toolTip: '{{section.name}}', dependencies: [] },
  subsection: { label: '{{subsectionCutFunction(subsection.name)}}', toolTip: '{{subsection.name}}', dependencies: ['section'] },
  project:  { label: 'Проект {{projectCutFunction(project.cipher) || projectCutFunction(project.name)}}', toolTip: '{{project.name}}', dependencies: ['section','subsection'] },
  projectSection: { label:  '{{sectionName}}', toolTip: '{{sectionName}}', dependencies: []  }
}

function interpolateTooltips(interpolate, type, scope) {
  crumbs[type].dependencies.forEach((dep) => {
    interpolateTooltips(interpolate, dep, scope);
  });
  crumbs[type].toolTipInterpolated = interpolate(crumbs[type].toolTip)(scope);
}

function init(interpolate, type, scope) {
  interpolateTooltips(interpolate, type, scope);
  return crumbs;
}

module.exports = {
init, crumbs
}
