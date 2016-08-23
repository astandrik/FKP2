'use strict';

function getNodeInfo(node, initialHref) {
  var obj = {};
  var addr = initialHref.split('?').map((x,i) => i == 1 ? "?" + x : x);
  addr[1] = addr[1]===undefined ? "" : addr[1];
  var typeStrMatch = {
    0: "project",
    1: "subsection",
    2: "section"
  }
  if (node.object_type != node.parent_type) {
    obj.href = `${addr[0]}/${typeStrMatch[node.object_type]}/${node.id}${addr[1]}`;
  } else {
    obj.href = addr[0].replace(new RegExp('/' + node.parent_id + '$'), '/' + node.id) + addr[1];
  }
  obj.cacheType = typeStrMatch[node.object_type];
  return obj;
}

function findElemsInTree(treeLevel, id, type) {
  var elem = treeLevel.filter((node) =>{ return node.id == id && node.object_type == type; });
  if(elem.length == 0) return treeLevel.reduce((sum,curr) => sum.concat(findElemsInTree(curr.children, id, type)),[]);
  else return elem;
}

function traverseTree(data, initialHref) {
  return data.map((node) => {
    var obj = Object.assign({},node, getNodeInfo(node, initialHref), {elementId: node.id});
    obj.children = traverseTree(obj.children, obj.href);
    return obj;
  })
}

function appendHrefs(data, href, params) {
  var curData = data.data.data;
  href = `${href}${params.length > 0 ? "?".concat(params.join("&")) : ""}`
  return traverseTree(curData, href);
}


function sumObject(obj) {
  return Object.keys(obj).reduce((sum, current) => sum + parseFloat(obj[current]), 0);
}

function prepareSection(finance) {
  var newObj = {};
  var prepareNumber = (x) => parseFloat(x) / 1000000
   Object.keys(finance).forEach((type) =>
   {
      newObj[type] = {};
      Object.keys(finance[type]).forEach((year) =>
      {
        newObj[type][year] = prepareNumber(finance[type][year]);
      });
  });
  return newObj;
}

function getFinanceTables(children) {
  var getData = (item, type) => {
    return  Object.assign({},{ 'Название': item.name },item.finance[`Финансирование ${type} средств`], {href: item.href});
  };
  var projectsBudget = children.map((x) => getData(x, 'за счет бюджетных'));
  var projectsOwn= children.map((x) => getData(x, 'из собственных'));
  return {
    'Budget': projectsBudget,
    'Own': projectsOwn
  };
}

function makeIdList(arr) {
  return arr.map((x) => x.id);
}

module.exports = {
  getNodeInfo: getNodeInfo,
  appendHrefs: appendHrefs,
  sumObject: sumObject,
  prepareSection: prepareSection,
  getFinanceTables: getFinanceTables,
  makeIdList: makeIdList,
  traverseTree: traverseTree,
  findElemsInTree: findElemsInTree
};
