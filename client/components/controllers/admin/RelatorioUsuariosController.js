angular.module('dashboard.relatorioUsuarios', ['app.user.service'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('relatorioUsuarios', {
            url: '/relatorioUsuarios',
            parent: 'mainAdmin',
            views: {
                "funcionalidades": {
                    templateUrl: 'components/views/admin/relatorioUsuarios.html',
                    controller: 'RelatorioUsuariosController'
                }
            }
        });
}])
