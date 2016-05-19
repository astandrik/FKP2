'use strict';
function traverseTree(data, initialHref, parentId, parentType, $complexDict) {
  data.forEach(function (node) {
    if (node.object_type != parentType) {
      switch (node.object_type) {
      case 3:
          node.href = initialHref + '/complex/' + node.id + '/general';
        break;
      case 2:
        node.href = initialHref + '/subsection/' + node.id;
        break;
      case 1:
        node.href = initialHref + '/section/' + node.id;
        break;
      }
    } else {
      node.href = initialHref.replace(new RegExp('/' + parentId + '$'), '/' + node.id);
    }
    $complexDict.dict[node.name] = node;
    traverseTree(node.children, node.href, node.id, node.object_type, $complexDict);
  });
}
function appendHrefs(data, initialState, $complexDict) {
  var initialHref = window.getHref(initialState);
  var curData = data.data.data;
  traverseTree(curData, initialHref, null, null, $complexDict);
}
module.exports = { appendHrefs: appendHrefs };
