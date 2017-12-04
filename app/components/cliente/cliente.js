var app = angular.module('neptunoApp');
app.controller('CtrlListaCliente', ['$scope', '$http', function ($scope, $http) {
     $scope.listaCliente = [];
     $scope.submit = function() {
         var promise = $http.post('listaCliente', []);
         promise.then(function(data, status, headers, config) {
         $scope.listaCliente = data.data;
         }), function(error) {
         alert( "Error: " + JSON.stringify({error: error}));
         };
     };
}]);