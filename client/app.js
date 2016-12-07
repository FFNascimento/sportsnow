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
    'app.comprar',
    'app.minhaConta',
    'app.localstorage',
    'app.admin',
    'ngLocale'
]);

app.run(['$rootScope', 'LocalStorageService', '$state', function($rootScope, LocalStorageService, $state) {
    $rootScope.$on('signout', function() {
        LocalStorageService.unset(LocalStorageService.storeMap.USER);
        $state.go('home');
    });

    $rootScope.$on('$stateChangeStart', function(e, to) {
        var user = LocalStorageService.getData(LocalStorageService.storeMap.USER);

        if (to.data && to.data.needUserLogged && !user) {
            e.preventDefault();
            $state.go('login');
        }
    });
}])


app.config(function($routeProvider, $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

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
