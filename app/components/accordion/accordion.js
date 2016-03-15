var utils = require('./utils.js');

angular.module('demos').directive('accordionTree', ()=> {
    return {
        replace: true,
        scope: {
            data: "="
        },
        compile: function(templateElement, templateAttrs) {
            return function($scope) {
              templateAttrs.timeout === undefined ? 400 : parseint(templateAttrs.timeout);
              var data = $scope.data;
              var html = '<div  class="accordionTree">  <ul class="accordion">';
              var elements = [];
              if (!data) {
                  throw ("define data attribute for tree")
              }
              data.forEach(function(item) {
                  elements.push(utils.buildNode(item));
              });
              templateElement.html(html + elements.join('') + '</ul></div>');
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
          };
        },
        controller: function($scope) {

        }
    };
});
