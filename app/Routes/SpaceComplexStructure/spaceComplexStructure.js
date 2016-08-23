'use strict';

var highlightNode = require('../../components/accordion/treeBuilder.js').highlight;
var highlightNodeById = require('../../components/accordion/treeBuilder.js').highlightById;

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


var helpers = require('./spaceComplexHelper.js');
var structure = {
  url: '/SpaceComplexStructure',
  views: {
    'content@': {
      templateUrl: 'app/Routes/SpaceComplexStructure/spaceComplex-page.html',
      controller: function CC($scope, treeData, dialogs, $timeout, $state, $complexDict) {
          $scope.scopeState = $state;
          $scope.$watch('scopeState.current.name', function(newVal) {
              if (newVal == "home.spaceComplexStructure") {
                  $scope.isBlank = true;
              } else {
                  $scope.isBlank = false;
              }
          });

          $scope.treeData = treeData;
          $scope.treeParams = [
              'id',
              'object_type'
          ];
          $scope.specialDict = {
              type: 'object_type'
          };
          $scope.dict = $complexDict.dict;
          $scope.$on('$viewContentLoaded', function(event) {
              $timeout(function() {
                  if ($state.params.complexId) {
                      highlightNode({
                          id: $state.params.complexId,
                          object_type: 3
                      }, $scope.treeParams);
                  } else if ($state.params.section3Id || $state.params.section2Id || $state.params.sectionId) {
                      highlightNode({
                          id: $state.params.section3Id || $state.params.section2Id || $state.params.sectionId,
                          object_type: 2
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
              searchTree(treeData.data, $scope.searchString, $scope.treeParams);
          }
    }
  },
  ncyBreadcrumb: {
    label: 'Космические комплексы',
    toolTipInterpolated: 'Космические комплексы'
  },
},
resolve: {
  treeData: function treeData($accordion, $complexDict) {
    return $accordion.getTree('data/spacetree').then(function (response) {
      helpers.appendHrefs(response, 'home.spaceComplexStructure', $complexDict);
      return response.data;
    });
  }
}
};
module.exports = structure;
