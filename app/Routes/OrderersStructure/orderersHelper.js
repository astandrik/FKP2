'use strict';
function traverseTree(data, initialHref,$orderersDict) {
  data.forEach(function (node) {
    node.href = initialHref + '/' + node.id + '/contacts';
    $orderersDict.dict[node.name] = node;
  });
}
function appendHrefs(data, initialState, $orderersDict) {
  var initialHref = window.getHref(initialState);
  var curData = data.data.data;
  traverseTree(curData, initialHref, $orderersDict);
}
module.exports = { appendHrefs: appendHrefs };
