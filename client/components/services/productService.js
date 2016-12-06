angular.module('dashboard.productService', [])
    .factory('productService', ['$http', function($http) {
        return {
            getAllProducts: function() {
                return $http({
                    method: 'GET',
                    url: 'api/get/products'
                });
            },
            getProduct: function(productId) {
                return $http({
                    method: 'GET',
                    url: 'api/get/product/' + productId
                });
            },
            createProduct: function(product) {
                return $http({
                    method: 'PUT',
                    url: '/api/add/product',
                    data: product
                });
            },
            updateProduct: function(product) {
                return $http({
                    method: 'POST',
                    url: '/api/update/product',
                    data: product
                });
            },
            removeProduct: function(productId) {
                return $http({
                    method: 'DELETE',
                    url: '/api/delete/product/' + productId
                });
            },
            messageList: function() {
                return {
                    mainTitle: "Gerenciar Produtos",
                    creatingTitle: "Criar novo produto",
                    editingTitle: "Editar Produto",
                    successMsgTitle: "Sucesso!",
                    successMsg: "Produto cadastrado com sucesso!",
                    editingMsgTitle: "Atenção",
                    editingMsg: "Dados do produto alterados com sucesso!",
                    deletingMsgTitle: "Atenção",
                    deletingMsg: "Produto removido com sucesso!",
                    errorMsgTitle: "Erro!",
                    errorMsg: "Não foi possível realizar a opção desejada!",
                    reportProductTittle: "Relatório de Produtos"
                };
            }
        };
    }]);
