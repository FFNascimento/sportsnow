'use strict';

angular.module('app.cart', ['ngRoute', 'LocalStorageModule', 'ui.router'])

// Routing configuration for this module
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('cart', {
            url: '/cart',
            controller: 'CartController',
            templateUrl: 'components/views/cart.html'
        });
}])

// Controller definition for this module
.controller('CartController', ['$scope', '$http', '$timeout', 'localStorageService', '$state', function($scope, $http, $timeout, localStorageService, $state) {

    init();

    function init() {
        var itens = localStorageService.get('cart');
        console.log(itens);
    }
}]);
