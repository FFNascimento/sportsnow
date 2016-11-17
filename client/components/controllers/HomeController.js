// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('app.home', ['ngRoute', 'LocalStorageModule', 'ui.router'])

// Routing configuration for this module
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            controller: 'HomeController',
            templateUrl: 'components/views/home.html'
        });
}])

// Controller definition for this module
.controller('HomeController', ['$scope', '$http', 'localStorageService', '$rootScope', function($scope, $http, localStorageService, $rootScope) {

    // Just a housekeeping.
    // In the init method we are declaring all the
    // neccesarry settings and assignments to be run once
    // controller is invoked
    $scope.userLogged = null;
    init();

    function init() {
        $scope.userLogged = localStorageService.get('loggedUser');
        $rootScope.$broadcast("update-login");
    };

    $scope.products = {};

    $scope.getAPIData = function() {
        $http({
            method: 'GET',
            url: '/api/get/products'
        }).then(function success(res) {
            $scope.products = res.data;
        }, function error(err) {});
    };

    $scope.getAPIData();

}]);
