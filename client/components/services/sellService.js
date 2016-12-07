angular.module('app.sellService', [])
    .factory('sellService', ['$http', function($http) {
        return {
            sellProducts: function(venda) {
                console.log(venda);
                return $http({
                    method: 'POST',
                    url: 'api/sell/products',
                    data: venda
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
