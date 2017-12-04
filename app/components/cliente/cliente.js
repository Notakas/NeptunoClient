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

app.controller('CtrlGuardarCliente', ['$scope', '$http', function ($scope, $http) {
    var cliente = {
        "cif": $scope.cifCliente,
        "nombreEmpresa": $scope.nombreEmpresaCliente,
        "nombrePersona": $scope.nombrePersonaCliente,
        "direccion": $scope.direccionCliente,
        "codigoPostal": $scope.codigoPostalCliente,
        "pais": $scope.paisCliente,
        "telefono": $scope.telefonoCliente
    }

    $scope.submit = function () {
        var promise = $http.post('listaCliente', cliente);
        promise.then(function (data, status, headers, config) {
        }), function (error) {
            alert("Error: " + JSON.stringify({ error: error }));
        };
    };
}]);