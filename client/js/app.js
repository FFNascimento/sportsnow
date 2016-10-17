app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('login', {
		url: '/login',
		cache: false,
		templateUrl: 'views/login.html',
		controller: 'LoginController'
	});

	$urlRouterProvider.otherwise('login');
});
