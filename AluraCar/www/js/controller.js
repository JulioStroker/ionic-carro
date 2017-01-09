angular.module('starter').controller('ListagemController', function ($scope, CarroService) {

    CarroService.obterCarros().then(function (dados) {
        $scope.listaDeCarros = dados;
    });
    $scope.dataAtual = new Date();

});

angular.module('starter').controller('CarroEscolhidoController', function ($scope, $stateParams) {

    $scope.carroEscolhido = angular.fromJson($stateParams.carro);

    $scope.listaDeAcessorios = [{ nome: "Freio Abs", preco: 8000 }, { nome: "Ar Condicionado", preco: 3000 }];

    $scope.mudou = function (acessorio, isMarcado) {
        if (isMarcado) {
            $scope.carroEscolhido.preco += acessorio.preco;
        } else {
            $scope.carroEscolhido.preco -= acessorio.preco;
        }
    };

});

angular.module('starter').controller('FinalizarPedidoController', function ($stateParams, $scope, $ionicPopup, $state, CarroService) {
    //Angular from Json transforma string em OBJ       
    $scope.carroFinalizado = angular.fromJson($stateParams.carro);
    $scope.pedido = {};

    $scope.finalizarpedido = function () {

        var pedidoFinalizado = {
            params: {
                carro: $scope.carroFinalizado.nome,
                preco: $scope.carroFinalizado.preco,
                nome: $scope.pedido.nome,
                endereco: $scope.pedido.endereco,
                email: $scope.pedido.email
            }
        }

        CarroService.salvarPedido(pedidoFinalizado).then(function (dados) {
            $ionicPopup.alert({
                title: 'Parabéns Pelo Pedido',
                template: 'Você acaba de comprar um novo carro =)'
            }).then(function () {
                $state.go('listagem')
            });
        }, function(erro){
            $ionicPopup.alert({
                title: 'Erro',
                template: 'Campos obrigatórios'
            })
        });
    }
});