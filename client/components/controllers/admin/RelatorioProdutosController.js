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

.controller('RelatorioProdutosController', ['$scope', 'productService', '$rootScope', '$http',
    function($scope, productService, $rootScope, $http) {
        $scope.title = productService.messageList().reportProductTittle;
        $scope.dateFrom = null;
        $scope.dateTo = null;
        $scope.produtosVendidos = [];

        $scope.init = function() {
          //Objeto datapicker criado
            $('.datepicker').pickadate({
                format: 'yyyy-mm-dd',
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15 // Creates a dropdown of 15 years to control year
            });
        }

        $scope.init();

        $scope.searchProducts = function() {
            //Convertendo dado de data
            $scope.dateFrom = $scope.dateFrom.split("-");
            $scope.dateTo = $scope.dateTo.split("-");

            //Transformando datas em timestamp
            var inputFrom = $scope.dateFrom[1] + "," + $scope.dateFrom[2] + "," + $scope.dateFrom[0];
            inputFrom = new Date(inputFrom).getTime();

            var inputTo = $scope.dateTo[1] + "," + $scope.dateTo[2] + "," + $scope.dateTo[0];
            inputTo = new Date(inputTo).getTime();

            //Chamada da API de relatório de produtos por período
            $http({
                method: 'GET',
                url: 'api/get/report/products/' + inputFrom + '/' + inputTo,
            }).then(function(res) {
              //Retornando resultados da chamada em um array
                $scope.produtosVendidos = res.data;
            });

        }
    }
]);
