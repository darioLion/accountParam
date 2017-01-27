var appAng = angular.module('appAng',[]);

appAng.controller('mainController', function($scope){
    $scope.name = 'Daria';
    $scope.age = 14;
});