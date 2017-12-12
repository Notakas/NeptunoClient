var app = angular.module('neptunoApp');
app.controller('CtrlListaCliente', ['$scope', '$http', function ($scope, $http) {
     $scope.listaCliente = [];
         var promise = $http.post('http://localhost:8080/TiendaNeptuno/listaClientes', []);
         promise.then(function(data, status, headers, config) {
         $scope.listaCliente = data.data;
         }), function(error) {
         alert( "Error: " + JSON.stringify({error: error}));
         };
}]);

app.controller('CtrlGuardarCliente', ['$scope', '$http','$routeParams', '$location', function ($scope, $http, $routeParams, $location) {

    var promise = $http.get('http://localhost:8080/TiendaNeptuno/verCliente/'+$routeParams.id);

    promise.then(function(data, status, headers, config) {
        cliente = data.data;
        $scope.cifCliente=cliente.cif,
        $scope.nombreEmpresaCliente=cliente.nombreEmpresa,
        $scope.nombrePersonaCliente=cliente.nombrePersona,
        $scope.direccionCliente=cliente.direccion,
        $scope.codigoPostalCliente=cliente.codigoPostal,
        $scope.paisCliente=cliente.pais,
        $scope.telefonoCliente=cliente.telefono;
    }), function(error) {
        alert( "Error: " + JSON.stringify({error: error}));
    };
    $scope.guardarCliente = function () {

        var cliente=new Object();
        cliente.cif=$scope.cifCliente;
        cliente.nombreEmpresa=$scope.nombreEmpresaCliente;
        cliente.nombrePersona=$scope.nombrePersonaCliente;
        cliente.direccion=$scope.direccionCliente;
        cliente.codigoPostal=$scope.codigoPostalCliente;
        cliente.pais=$scope.paisCliente;
        cliente.telefono=$scope.telefonoCliente;

        if (cliente.cif!=null)
            var promise = $http.post('http://localhost:8080/TiendaNeptuno/updateCliente',cliente);
        else
            var promise = $http.post('http://localhost:8080/TiendaNeptuno/addCliente',cliente);
            promise.then(function (data, status, headers, config) {
            }), function (error) {
            alert("Error: " + JSON.stringify({ error: error }));
        };
        $location.path("listaCliente")
    };
}]);
