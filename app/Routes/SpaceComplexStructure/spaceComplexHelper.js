'use strict';

var prefixDir =
{
  "Космические аппараты" : "SpaceComplex",
  "Средства выведения": "Launch",
  "Другие изделия ракетно-космической техники": "Other"
}

function traverseTree(data, initialHref, parentId, parentType, $complexDict, parentSectionType) {
  data.forEach(function (node) {
      switch (node.object_type) {
      case 3:
          node.href = initialHref + '/complex/' + node.id + "/General?sectionType=" + parentSectionType;
        break;
      case 2:
        node.href = initialHref + '/section/' + node.id;
        break;
      }
    $complexDict.dict[node.name] = node;
    if(parentSectionType) {
      node.sectionType = parentSectionType;
    }
    traverseTree(node.children, node.href, node.id, node.object_type, $complexDict, node.sectionType);
  });
}
function appendHrefs(data, initialState, $complexDict) {
  var initialHref = window.getHref(initialState);
  var curData = data.data.data;
  curData.forEach(x => x.sectionType = prefixDir[x.name]);
  traverseTree(curData, initialHref, null, null, $complexDict, null);
}

function findElemsInTree(treeLevel, id, type) {
  var elem = treeLevel.filter((node) => { return node.id == id && node.object_type == type; });
  if(elem.length == 0) return treeLevel.reduce((sum,curr) => sum.concat(findElemsInTree(Object.keys(curr.children).length === 0 ? [] : curr.children, id, type)),[]);
  else return elem;
}

function getComplexType(tree, id) {
  var complex = tree ? tree.filter((item) => findElemsInTree([item], id, 3).length > 0)[0] : "Nothing";
  return complex ? complex.name : 'Nothing';
}

module.exports = {
  appendHrefs: appendHrefs,
  getComplexType: getComplexType
};
