var treeBuilder = require('./treeBuilder.js').treeHtml;
var bindToggleEvents = require('./treeBuilder.js').bind;

module.exports = function($compile,$accordion, $state) {
    return {
        scope: {
            data: "="
        },
        compile:
        function(templateElement, templateAttrs) {
            return {
                pre: function($scope) {
                $scope.getHref = $scope.$parent.getHref;
                $scope.getCurrentState = $scope.$parent.getCurrentState;
                $scope.getCurrentEntityState = function() {
                  var state = $scope.getCurrentState();
                  return state.indexOf('treeEntity') > -1 ? state : state + '.treeEntity';
                };
                $accordion.getTree($scope.data.url).then((response) => {
                  templateAttrs.timeout === undefined ? 400 : parseint(templateAttrs.timeout);
                  var html = '<div  class="accordionTree">  <ul class="accordion">';
                  var elements = [];
                  if (!response.data) {
                      throw ("define data attribute for tree")
                  }
                  response.data.forEach(function(item) {
                      elements.push(treeBuilder.buildNode(item));
                  });
                  var treeHtml = html + elements.join('') + '</ul></div>';
                  templateElement.replaceWith($compile(treeHtml)($scope));
                  bindToggleEvents();
                });
            }
          };
        },
        controller: function($scope) {

        }
    };
};
