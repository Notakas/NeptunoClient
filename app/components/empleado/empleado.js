var app = angular.module('neptunoApp');
app.controller('CtrlListaEmpleado', ['$scope', '$http', function ($scope, $http) {
     $scope.listaEmpleado = [];
         var promise = $http.post('listaEmpleado', []);
         promise.then(function(data, status, headers, config) {
         $scope.listaEmpleado = data.data;
         }), function(error) {
         alert( "Error: " + JSON.stringify({error: error}));
         };
}]);