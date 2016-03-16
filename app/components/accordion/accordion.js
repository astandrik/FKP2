var treeBuilder = require('./treeBuilder.js');

function bindToggleEvents() {
  $('.toggle').click(function(e) {
      e.preventDefault();
      var $this = $(this);
      if ($this.next().hasClass('show')) {
          $this.next().slideUp(500, function() {
              $this.next().removeClass('show');
          });
      } else {
          $this.next().slideDown(500, function() {
              $this.next().addClass('show');
          });
      }
  });
}

module.exports = function($compile) {
    return {
        scope: {
            data: "="
        },
        compile: function(templateElement, templateAttrs) {
            return function($scope) {
              templateAttrs.timeout === undefined ? 400 : parseint(templateAttrs.timeout);
              var data = $scope.data;
              $scope.h = 'p';
              var html = '<div  class="accordionTree">  <ul class="accordion">';
              var elements = [];
              if (!data) {
                  throw ("define data attribute for tree")
              }
              data.forEach(function(item) {
                  elements.push(treeBuilder.buildNode(item));
              });
              var treeHtml = html + elements.join('') + '</ul></div>';
              templateElement.replaceWith($compile(treeHtml)($scope));

              bindToggleEvents();
          };
        },
        controller: function($scope) {

        }
    };
};
