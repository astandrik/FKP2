'use strict';
module.exports = function ($scope, $uibModalInstance, data) {
  $scope.data = data;
  //-- Methods --//
  $scope.done = function () {
    $uibModalInstance.close($scope.data);
  };
  // end done
  $scope.close = function () {
    $uibModalInstance.close($scope.data);
  };
};