var app = angular.module('neptunoApp');
app.controller('CtrlListaCliente', ['$scope', '$http', function ($scope, $http) {
     $scope.listaCliente = [];
         var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/listaClientes', []);
         promise.then(function(data, status, headers, config) {
         $scope.listaCliente = data.data;
         }), function(error) {
         alert( "Error: " + JSON.stringify({error: error}));
         };
}]);

app.controller('CtrlGuardarCliente', ['$scope', '$http','$routeParams', '$location', function ($scope, $http, $routeParams, $location) {

    var promise = $http.get('http://192.168.43.73:8081/TiendaNeptuno/verCliente/'+$routeParams.id);

    promise.then(function(data, status, headers, config) {
        cliente = data.data;
        $scope.cifCliente=cliente.cifCliente,
        $scope.nombreEmpresaCliente=cliente.nombreEmpresaCliente,
        $scope.nombrePersonaCliente=cliente.nombrePersonaCliente,
        $scope.direccionCliente=cliente.direccionCliente,
        $scope.codigoPostalCliente=cliente.codigoPostalCliente,
        $scope.paisCliente=cliente.paisCliente,
        $scope.telefonoCliente=cliente.telefonoCliente;
    }), function(error) {
        alert( "Error: " + JSON.stringify({error: error}));
    };
    $scope.guardarCliente = function () {

        var cliente=new Object();
        cliente.cifCliente=$scope.cifCliente;
        cliente.nombreEmpresaCliente=$scope.nombreEmpresaCliente;
        cliente.nombrePersonaCliente=$scope.nombrePersonaCliente;
        cliente.direccionCliente=$scope.direccionCliente;
        cliente.codigoPostalCliente=$scope.codigoPostalCliente;
        cliente.paisCliente=$scope.paisCliente;
        cliente.telefonoCliente=$scope.telefonoCliente;

        if (cliente.cifCliente!=null)
            var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/updateCliente',cliente);
        else
            var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/addCliente',cliente);
            promise.then(function (data, status, headers, config) {
            }), function (error) {
            alert("Error: " + JSON.stringify({ error: error }));
        };
        $location.path("listaCliente")
    };
}]);
