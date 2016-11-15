'use strict';

// Defining Angular app model with all other dependent modules
var app = angular.module('app', ['ngRoute',
    'app.home',
    'app.about',
    'app.login',
    'LocalStorageModule'
]);

app.run(function($rootScope, $location, localStorageService) {
    $rootScope.on('signout', function() {
        localStorageService.clearAll();
        $location.path('/');
    })
})

app.config(function($routeProvider, $locationProvider, $httpProvider, localStorageServiceProvider) {

    // Declaration of the default route if neither of the controllers
    // is supporting the request path
    $routeProvider.otherwise({
        redirectTo: '/'
    });

    // Settings for http communications
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // disabling # in Angular urls
    // $locationProvider.html5Mode({
    // 		enabled: true,
    //      requireBase: false
    // });
    localStorageServiceProvider
        .setPrefix('myApp')
        .setStorageType('sessionStorage')
        .setNotify(true, true)
});
