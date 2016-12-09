var dashboard = angular.module('dashboard', [
    'ui.router',
    'dashboard.main',
    'dashboard.materialize',
    'dashboard.gerirProdutos',
    'dashboard.adminUsuarios',
    'dashboard.relatorioProdutos',
    'dashboard.relatorioUsuarios',
    'app.localstorage'
]);

dashboard.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/dashboard');
});

dashboard.run(['$rootScope', '$window', 'LocalStorageService',
    function($rootScope, $window, LocalStorageService) {
        $rootScope.$on('$stateChangeStart', function(e, to) {
            var user = LocalStorageService.getData(LocalStorageService.storeMap.USER);
            if (!user) {
                console.log('sem user');
                e.preventDefault();
                $window.location.href = '/';
            } else {
                if (to.data && to.data.needAdmin && user.permission !== 'ADMIN') {
                    e.preventDefault();
                    $window.location.href = '/';
                }
            }
        });
    }
]);
