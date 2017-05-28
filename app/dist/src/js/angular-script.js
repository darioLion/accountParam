var appAng = angular.module('appAng', ['ngRoute', 'ngLoad']);
appAng.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/", {
            templateUrl: 'app/partials/edit.html'
        })
        .when("/readonly", {
            templateUrl: 'app/partials/view.html'
        })
        .otherwise({
            redirectTo: "/"
        });
});
appAng.controller('mainController', function ($scope, $http, $sce) {
    $scope.select = [
        {
            mode: "ignore"
        },
        {
            mode: "failOnSiteConflictingIdentity"
        },
        {
            mode: "failOnAnyConflictingIdentity"
        }
    ];
    $scope.changedParameters = {};
    $scope.saveAccountOptions = function () {
        $scope.newParameters = JSON.stringify($scope.changedParameters);
        var setUrl = "https://accounts.gigya.com/accounts.setPolicies?userkey=AJA3Cw9XcJZf&secret=1J%2BYxAY47khnuXf4GKSggLpPFBbQv8Hq&apikey=3_inujb44QPskKBok5VwhYnqy40eaVrwAJXXLsqaHRI_6DCM3KHhxNXjjcFQe0PASK&accountOptions=" + $scope.newParameters + "&format=jsonp";

        $http.jsonp($sce.trustAsResourceUrl(setUrl), {
            jsonpCallbackParam: 'callback'
        }).then(
            function success(data) {
                if (data.data.errorCode === 0) {
                    Materialize.toast('Succesfully changed', 4000);
                    $scope.changedParameters = {};
                } else {
                    Materialize.toast('Error occured, data was not saved', 4000);
                }
            },
            function error(data) {
                Materialize.toast('Error occured', 4000);
            });
    };
    
    $scope.changedParam = function (parameter, value) {
        $scope.changedParameters[parameter] = value;
        $scope[parameter] = value;
        
    };
      
    window.onload = function () {
        
        var getUrl = "https://accounts.gigya.com/accounts.getPolicies?userkey=AJA3Cw9XcJZf&secret=1J%2BYxAY47khnuXf4GKSggLpPFBbQv8Hq&apikey=3_inujb44QPskKBok5VwhYnqy40eaVrwAJXXLsqaHRI_6DCM3KHhxNXjjcFQe0PASK&format=jsonp";
        $http.jsonp($sce.trustAsResourceUrl(getUrl), {
            jsonpCallbackParam: 'callback'
        }).then(
            function success(data) {
                $scope.data = data.data.accountOptions;
                $scope.verifyEmail = $scope.data.verifyEmail;
                $scope.verifyProviderEmail = $scope.data.verifyProviderEmail;
                $scope.allowUnverifiedLogin = $scope.data.allowUnverifiedLogin;
                $scope.preventLoginIDHarvesting = $scope.data.preventLoginIDHarvesting;
                $scope.sendWelcomeEmail = $scope.data.sendWelcomeEmail;
                $scope.sendAccountDeletedEmail = $scope.data.sendAccountDeletedEmail;
                $scope.defaultLanguage = $scope.data.defaultLanguage;
                $scope.loginIdentifierConflict = $scope.data.loginIdentifierConflict;
                $scope.loginIdentifiers = $scope.data.loginIdentifiers;
            },
            function error(data, status) {
                Materialize.toast('Data can not be loaded', 4000);
            });
    }
});