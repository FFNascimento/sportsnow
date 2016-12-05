var dashboard = angular.module('dashboard', [
    'ui.router',
    'dashboard.main',
    'dashboard.materialize',
    'dashboard.gerirProdutos',
    'dashboard.adminUsuarios'
]);

dashboard.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
});
