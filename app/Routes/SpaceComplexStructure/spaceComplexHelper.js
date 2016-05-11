function traverseTree(data, initialHref,parentId, parentType) {
  data.forEach((node) => {
    if(node.object_type != parentType) {
      switch (node.object_type) {
        case 3:
          node.href = initialHref + '/complex/' + node.id;
          break;
        case 2:
          node.href = initialHref + '/subsection/' + node.id;
          break;
        case 1:
          node.href = initialHref + '/section/' + node.id;
          break;
        }
    } else {
      node.href = initialHref.replace(new RegExp('/' + parentId + '$'), '/'+node.id);
    }
    traverseTree(node.children, node.href, node.id, node.object_type);
  });
}

function appendHrefs(data,initialState) {
  var initialHref = window.getHref(initialState);
  var curData = data.data.data;
  traverseTree(curData, initialHref);
}



module.exports = {
  appendHrefs: appendHrefs
}
