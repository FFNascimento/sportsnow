'use strict';

// Defining Angular app model with all other dependent modules
var app = angular.module('app', [
    'ngRoute',
    'ui.router',
    'app.productList',
    'app.home',
    'app.about',
    'app.login',
    'app.detalhes',
    'app.cart',
    'LocalStorageModule',
    'ngLocale'
]);

app.run(function($rootScope, $location, localStorageService) {
    $rootScope.$on('signout', function() {
        localStorageService.clearAll();
        $location.path('/');
    })
})


app.config(function($routeProvider, $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider) {

    localStorageServiceProvider
        .setPrefix('myApp')
        .setStorageType('sessionStorage')
        .setNotify(true, true)

    // Settings for http communications
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $stateProvider
        .state('produtos', {
            url: '/produtos/:type',
            templateUrl: "components/views/produtos.html",
            controller: 'ProductListController'
        });

    $urlRouterProvider.otherwise('/');
});
