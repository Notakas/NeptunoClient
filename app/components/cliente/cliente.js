var app = angular.module('neptunoApp');
app.controller('CtrlListaCliente', ['$scope', '$http', function ($scope, $http, clienteService) {
    $scope.listaCliente = [];
    var promise = $http.post('listaCliente', []);
    promise.then(function (data, status, headers, config) {
        $scope.listaCliente = data.data;
    }), function (error) {
        alert("Error: " + JSON.stringify({ error: error }));
    };
}]);

app.controller('CtrlGuardarCliente', ['$scope', '$http', function ($scope, $http) {
    var promise = $http.post('http://192.168.43.73:8080/TiendaNeptuno/verCliente/1', []);
    promise.then(function (data, status, headers, config) {
        
    }), function (error) {
        alert("Error: " + JSON.stringify({ error: error }));
    };

    cliente = {
        "cif": $scope.cifCliente,
        "nombreEmpresa": $scope.nombreEmpresaCliente,
        "nombrePersona": $scope.nombrePersonaCliente ? 1 : 0,
        "direccion": $scope.direccionCliente,
        "codigoPostal": $scope.codigoPostalCliente,
        "pais": $scope.paisCliente,
        "telefono": $scope.telefonoCliente
    }


    $scope.submit = function () {
        var promise;
        if (cliente.idProveedor!=null)
        promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/updateCliente',cliente);
        else
        promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/addCliente',cliente);
        promise.then(function (data, status, headers, config) {
        }), function (error) {
            alert("Error: " + JSON.stringify({ error: error }));
        };
    };
}]);
