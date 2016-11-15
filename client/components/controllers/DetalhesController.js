// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('app.detalhes', ['ngRoute', 'LocalStorageModule'])

// Routing configuration for this module
.config(['$routeProvider', function($routeprovider) {
    $routeprovider.when('/detalhes/:id', {
        controller: 'DetalhesController',
        templateUrl: 'components/views/home.html'
    });
}])

// Controller definition for this module
.controller('DetalhesController', ['$scope', 'localStorageService', '$routeParams', '$location', function($scope, localStorageService, $routeParams, $location) {
    // Just a housekeeping.
    // In the init method we are declaring all the
    // neccesarry settings and assignments to be run once
    // controller is invoked
    $scope.userLogged = null
    init();

    function init() {
        $scope.userLogged = localStorageService.get('loggedUser');
        var _id = $routeParams.id;
        if (_id) {
            $http({
                method: 'GET',
                url: 'api/get/product/',
                params: {
                    id: _id
                }
            }).then(function success(res) {

            })
        } else {
            $location.path('/');
        }
    };

}]);
