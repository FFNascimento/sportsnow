var dashboard = angular.module('dashboard', [
    'ui.router',
    'dashboard.main',
    'dashboard.materialize',
    'dashboard.gerirProdutos'
]);

dashboard.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
});
