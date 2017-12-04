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

app.controller('CtrlGuardarEmpleado', ['$scope', '$http', function ($scope, $http) {

    var Empleado={"dni":$scope.dni,"nombreEmpleado":$scope.nombreEmpleado,"apellidos":$scope.apellidos,
    "cargo":$scope.cargo, "direccion":$scope.direccion,"ciudad":$scope.ciudad,"codigoPostal":$scope.codigoPostal,
    "pais":$scope.pais,"telefono":$scope.telefono
}

    $scope.guardarEmpleado = function () {
    var promise = $http.put('http://192.168.43.73:8081/TiendaNeptuno/guardarEmpleado',Empleado);
    promise.then(function (data, status, headers, config) {
    }), function (error) {
        alert("Error: " + JSON.stringify({ error: error }));
    };
};
}]);
