'use strict';

var cart = angular.module('app.cart', ['ngRoute', 'app.localstorage', 'ui.router', 'app.cart.service'])

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
.controller('CartController', ['$scope', '$http', '$timeout', 'LocalStorageService', '$state', 'cartService', '$rootScope',
    function($scope, $http, $timeout, LocalStorageService, $state, cartService, $rootScope) {
        cartService.set('cart', LocalStorageService.getData(LocalStorageService.storeMap.CART) || []);
        $scope.cart = cartService.value.cart || {
            itens: []
        };
        $scope.total = 0;
        $scope.frete = 0;
        $scope.userLogged = null;
        init();

        function init() {
            $scope.userLogged = LocalStorageService.getData(LocalStorageService.storeMap.USER);
            getTotal();
            $rootScope.$broadcast("update-cart");
        }

        $rootScope.$on("update-cart", function() {
            cartService.set('cart', LocalStorageService.getData(LocalStorageService.storeMap.CART) || []);
            $scope.cart = cartService.value.cart || {
                itens: []
            };
        });

        $rootScope.$on("clearCart", function() {
            LocalStorageService.unset(LocalStorageService.storeMap.CART);
            $rootScope.$broadcast("update-cart");
        });

        $rootScope.$on("update-login", function() {
            $scope.userLogged = LocalStorageService.getData(LocalStorageService.storeMap.USER);
        });

        function updateCart() {
            LocalStorageService.setData(LocalStorageService.storeMap.CART, $scope.cart);
            cartService.set('cart', LocalStorageService.getData(LocalStorageService.storeMap.CART) || []);
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
