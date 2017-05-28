/*describe("mainController", function(){
    var $rootScope,
        $scope,
        controller;
    beforeEach(function(){
        module('appAng');
        inject(function($injector){
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            controller = $injector.get('$controller')("mainController",{$scope:$scope});
        });
    });
    
    describe("Actions", function(){
        
        describe("change the parameter", function(){
           expect($scope.lll).toEqual(5);
        });
    });
   
});*/
describe('mainController', function() {
  beforeEach(module('appAng'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('jjjjj', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('mainController', { $scope: $scope });
      
      it('Should set verifyEmail in json and in scope to true', function() {
            $scope.changedParam('verifyEmail',true);
            expect($scope.verifyEmail).toEqual(true);
            expect($scope.changedParam.verifyEmail).toEqual(true);
      });
        
    });

   

    
  });
});