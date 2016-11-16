'use strict';

var cart = angular.module('app.cart', ['ngRoute', 'LocalStorageModule', 'ui.router', 'app.cart.service'])

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
.controller('CartController', ['$scope', '$http', '$timeout', 'localStorageService', '$state', 'cartService', function($scope, $http, $timeout, localStorageService, $state, cartService) {
    cartService.set('cart', localStorageService.get('cart'));
    $scope.cart = cartService.value.cart;
    $scope.total = 0;
    $scope.frete = 0;

    init();

    function init() {
        getTotal();
    }

    function updateCart() {
        localStorageService.set('cart', $scope.cart);
        cartService.set('cart', localStorageService.get('cart'));
        getTotal();
    }

    function getTotal() {
        var total = 0;
        angular.forEach($scope.cart.itens, function(item) {
            total += item.price * item.quantity;
        });
        $scope.total = total;
    }

    $scope.increaseQt = function(item) {
        if (item.quantity < 6) {
            item.quantity++;
            updateCart();
        }
    }

    $scope.decreaseQt = function(item) {
        if (item.quantity > 1) {
            item.quantity--;
            updateCart();
        }
    }

    $scope.remove = function(item) {
        $scope.cart.itens.splice(item, 1);
        updateCart();
    }



}]);
