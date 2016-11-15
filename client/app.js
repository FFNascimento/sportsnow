'use strict';

// Defining Angular app model with all other dependent modules
var app = angular.module('app',[
	'ngRoute',
	'ui.router',
	'app.productList',
	'app.home',
	'app.about',
	'app.login'
]);

app.config(function($routeProvider, $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

	// Settings for http communications
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$stateProvider

	.state('products', {
    	url: '/products/:type',
        templateUrl: "components/views/produtos.html",
        controller: 'ProductListController'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
});