var currentModule = angular.module('stateManager',[]);
currentModule.factory('$stateManager', function($state) {
  var obj = {};
  obj.getCurrentStateName = function() {
      return $state.current.name;
  };
  obj.getStateHrefByName = $state.href.bind($state);
  obj.getCurrentStateHref = function() {
    return obj.getStateHrefByName(obj.getCurrentStateName);
  };
  return obj;
})
