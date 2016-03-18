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
