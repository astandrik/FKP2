(
    function() {
        angular.module('demos').directive('accordionTree', function() {
            return {
                templateUrl: 'app/components/accordion/accordion.html',
                replace: true,
                link: function(scope, element, attrs) {
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
            };
        });
    }());
