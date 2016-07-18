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

function ProjectController($scope, dialogs, $projectFactory, $state, $timeout, treeData) {
  $scope.scopeState = $state;
  $scope.$watch('scopeState.current.name', function(newVal) {
    if(newVal == "home.projectStructure") {
      $scope.isBlank = true;
    } else {
      $scope.isBlank = false;
    }
  });

  $scope.treeData = treeData;
  $scope.treeParams = [
    'id',
    'object_type',
    'section_id'
  ];
  $scope.specialDict = {
    type: 'object_type',
    cacheType: 'cacheType',
    elementId: 'elementId'
  };

  $scope.create_popup = function (org) {
    var data = {
      name: org.name,
      responsible: org.contact_person,
      tel: org.phone
    };
    var dlg = dialogs.create('app/components/popup/popup.html', 'popupController', data, {
      size: 'sm',
      animation: true
    });
  };
  $scope.$on('$viewContentLoaded', function (event) {
    $timeout(function () {
      if ($state.params.projectId) {
        highlightNode({
          id: $state.params.projectId,
          object_type: 0,
          section_id: $state.params.sectionId
        }, $scope.treeParams);
      } else if ($state.params.subsectionId) {
        highlightNode({
          id: $state.params.subsectionId,
          object_type: 1,
          section_id: $state.params.sectionId
        }, $scope.treeParams);
      } else if ($state.params.sectionId) {
        highlightNode({
          id: $state.params.sectionId,
          object_type: 2,
          section_id: $state.params.sectionId
        }, $scope.treeParams);
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
var initialState = 'home.events';
$scope.initialHref = window.getHref(initialState);

}
module.exports = ProjectController;
