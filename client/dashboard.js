var dashboard = angular.module('dashboard', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'components/views/admin/login.html',
            controller: 'components/controller/admin/LoginController.js'
        })
})
