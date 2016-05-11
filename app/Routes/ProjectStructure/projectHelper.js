function projectMillionsFunction (project) {
    for (var type in project.finance){
        for(var val in project.finance[type]) {
            project.finance[type][val] = project.finance[type][val] / 1000000.0;
         }
     }
  return project;
}

function prepareFinance(finance, baseName) {
  var years =[];
  var valueBudget =[];
  var valueOwnBudget =[];
  var sumBudget = 0;
  var sumOwnBudget = 0;
  for (var p in finance["Финансирование из собственных средств"]){
    years.push(p);
    valueOwnBudget.push(finance["Финансирование из собственных средств"][p]);
    sumOwnBudget = sumOwnBudget + finance["Финансирование из собственных средств"][p];
  };
  for (var p in finance["Финансирование за счет бюджетных средств"]){
    valueBudget.push(finance["Финансирование за счет бюджетных средств"][p]);
    sumBudget = sumBudget + finance["Финансирование за счет бюджетных средств"][p]
  };
  years.sort();
  var start = years[0];
  var end = years[years.length-1];
  finance["Финансирование из собственных средств"][baseName] = 'Внебюджет, млн.р.';
  finance["Финансирование за счет бюджетных средств"][baseName] = 'Бюджет, млн.р.';
  var a=[finance["Финансирование из собственных средств"],finance["Финансирование за счет бюджетных средств"]];
  return {finance:a, start: start, end: end, years: years, valueBudget: valueBudget, valueOwnBudget: valueOwnBudget, sumBudget: sumBudget, sumOwnBudget: sumOwnBudget};
}

function traverseTree(data, initialHref,parentId, parentType) {
  data.forEach((node) => {
    if(node.object_type != parentType) {
      switch (node.object_type) {
        case 2:
          node.href = initialHref + '/section/' + node.id;
          node.cacheType = 'section';
          break;
        case 1:
          node.href = initialHref + '/subsection/' + node.id;
          node.cacheType = 'subsection';
          break;
        case 0:
          node.href = initialHref + '/project/' + node.id;
          node.cacheType = 'project';
          break;
        }
    } else {
      node.href = initialHref.replace(new RegExp('/' + parentId + '$'), '/'+node.id);
      node.cacheType = parentType == 0 ? 'project' : parentType == 1 ? 'subsection' : parentType == 2 ? 'section' : 'project';
    }
    node.elementId = node.id;
    traverseTree(node.children, node.href, node.id, node.object_type);
  });
}

function appendHrefs(data,initialState) {
  var initialHref = window.getHref(initialState);
  var curData = data.data.data;
  traverseTree(curData, initialHref);
}



module.exports = {
  prepareValues: projectMillionsFunction,
  prepareFinance: prepareFinance,
  appendHrefs: appendHrefs
}
