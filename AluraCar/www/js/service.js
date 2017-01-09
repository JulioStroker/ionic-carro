 angular.module('starter').service('CarroService', function($http){
     var url = 'http://aluracar.herokuapp.com/';
     
     //WTF??????
     //Que Diabos é isso?
     //Chamada mais feia !  
     return {
         obterCarros : function(){
             return $http.get(url).then(function(response){
                 return response.data;
             });
         },
         salvarPedido: function(pedido){
             return $http.get(url + 'salvarPedido', pedido).then(function(response){
                 return "OK";
             });
         }
     }
 });