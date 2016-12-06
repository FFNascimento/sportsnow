angular.module('dashboard.relatorioProdutos', ['dashboard.productService'])

// Routing configuration for this module
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('relatorioProdutos', {
            url: '/relatorioProdutos',
            parent: 'mainAdmin',
            views: {
                "funcionalidades": {
                    templateUrl: 'components/views/admin/relatorioProdutos.html',
                    controller: 'RelatorioProdutosController'
                }
            }

        });
}])

.controller('RelatorioProdutosController', ['$scope', 'productService', '$rootScope',
    function($scope, productService, $rootScope) {
        $scope.title = productService.messageList().reportProductTittle;

        $scope.init = function() {
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15 // Creates a dropdown of 15 years to control year
            });
        }

        $scope.init();
    }
]);
