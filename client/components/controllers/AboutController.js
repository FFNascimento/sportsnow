// AboutController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('app.about', ['ngRoute', 'ui.router'])

// Routing configuration for this module
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('sobre', {
            url: '/about',
            controller: 'AboutController',
            templateUrl: 'components/views/aboutView.html'
        });
}])

// Controller definition for this module
.controller('AboutController', ['$scope', function($scope) {

    // Just a housekeeping.
    // In the init method we are declaring all the
    // neccesarry settings and assignments to be run once
    // controller is invoked
    init();

    function init() {

    };

    this.message = "Hello About!";

}]);
