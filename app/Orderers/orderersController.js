'use strict';

var highlightNode = require('../components/accordion/treeBuilder.js').highlight;
var highlightNodeById = require('../components/accordion/treeBuilder.js').highlightById;

function searchTree(tree,req, params){
  if(req && req.toString().trim().length > 0) {
    for(var i = 0; i < tree.length; i++){
      searchNode(tree[i],req,params);
    }
  } else {
    $('li.invisible').removeClass('invisible');
  }
};

function searchNode(node, req, params) {
  var elemId = params.reduce(function (sum, current) {
    return sum + current + node[current];
  }, 'node_');
  var hasName = false;
  if (node.name.toLowerCase().indexOf(req.toLowerCase()) > -1) {
    hasName = true;
  }
  if(node.children.length > 0) {
    for(var i = 0; i < node.children.length; i++){
      var childrenHasName = searchNode(node.children[i], req,params);
      hasName = childrenHasName || hasName;
    }
  }
  if (!hasName) {
    $('#'+elemId).parent().addClass('invisible');
  } else {
    $('#'+elemId).parent().removeClass('invisible');
    highlightNodeById(elemId);
  }
  return hasName;
};

function CC($scope, treeData, dialogs, $timeout, $state, $orderersDict) {
  $scope.scopeState = $state;
  $scope.$watch('scopeState.current.name', function(newVal) {
    if(newVal == "home.orderers") {
      $scope.isBlank = true;
    } else {
      $scope.isBlank = false;
    }
  });

  $scope.treeData = treeData;
  $scope.treeParams = [
    'id'
  ];
  $scope.tabstripData = [
    {
      name: 'Общие сведения',
      state: 'orderersSection',
      type: 'general'
    },
    {
      name: 'Контактные данные',
      state: 'orderersSection',
      type: 'contacts'
    },
    {
      name: 'Связанные проекты',
      state: 'orderersSection',
      type: 'relatedProjects'
    }
  ];
  $scope.dict = $orderersDict.dict;
  $scope.$on('$viewContentLoaded', function (event) {
    $timeout(function () {
    if($state.params.ordererId) {
        highlightNode({id: $state.params.ordererId}, $scope.treeParams);
      } else {
        highlightNode(-1, []);
      }
    });
  });
  $scope.makeVisible = function() {
   $scope.isInputVisible = true;
 }
$scope.search = function() {
   searchTree(treeData.data ,$scope.searchString,  $scope.treeParams);
}
}
module.exports = CC;
