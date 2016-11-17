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
.controller('CartController', ['$scope', '$http', '$timeout', 'localStorageService', '$state', 'cartService', '$rootScope',
    function($scope, $http, $timeout, localStorageService, $state, cartService, $rootScope) {
        cartService.set('cart', localStorageService.get('cart') || []);
        $scope.cart = cartService.value.cart || {
            itens: []
        };
        $scope.total = 0;
        $scope.frete = 0;
        $scope.userLogged = null;
        init();

        function init() {
            $scope.userLogged = localStorageService.get('loggedUser');
            getTotal();
            $rootScope.$broadcast("update-cart");
        }

        $rootScope.$on("update-cart", function() {
            cartService.set('cart', localStorageService.get('cart') || []);
            $scope.cart = cartService.value.cart || {
                itens: []
            };
        });

        $rootScope.$on("update-login", function() {
            $scope.userLogged = localStorageService.get('loggedUser');
        });

        function updateCart() {
            localStorageService.set('cart', $scope.cart);
            cartService.set('cart', localStorageService.get('cart') || []);
            getTotal();
            $rootScope.$broadcast("update-cart");
        }

        function getTotal() {
            var total = 0;
            if ($scope.cart) {
                angular.forEach($scope.cart.itens, function(item) {
                    total += item.price * item.quantity;
                });
                $scope.total = total;
            }
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

    }
]);
