'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
  'ngRoute'
]).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('login', {
		url: '/login',
		cache: false,
		templateUrl: 'views/login.html',
		controller: 'LoginController'
	});

	$urlRouterProvider.otherwise('login');
});
