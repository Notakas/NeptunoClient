var app = angular.module('neptunoApp');
app.controller('CtrlListaEmpleado', ['$scope', '$http', function ($scope, $http) {
     $scope.listaEmpleado = [];
         var promise = $http.post('http://localhost:8080/TiendaNeptuno/listaEmpleados', []);
         promise.then(function(data, status, headers, config) {
         $scope.listaEmpleado = data.data;
         }), function(error) {
         alert( "Error: " + JSON.stringify({error: error}));
         };
}]);

app.controller('CtrlGuardarEmpleado', ['$scope', '$http','$routeParams', '$location', function($scope, $http, $routeParams, $location){

    var promise = $http.get('http://localhost:8080/TiendaNeptuno/verEmpleado/'+$routeParams.id);

    promise.then(function(data, status, headers, config) {
        empleado = data.data;
        $scope.tienedni=empleado.dni!=null;
        $scope.dniEmpleado=empleado.dni;
        $scope.nombreEmpleado=empleado.nombreEmpleado;
        $scope.apellidosEmpleado=empleado.apellidos;
        $scope.cargoEmpleado=empleado.cargo;
        $scope.direccionEmpleado=empleado.direccion;
        $scope.ciudadEmpleado=empleado.ciudad;
        $scope.codigoPostalEmpleado=empleado.codigoPostal;
        $scope.paisEmpleado=empleado.pais;
        $scope.telefonoEmpleado=empleado.telefono;
    }), function(error) {
        alert( "Error: " + JSON.stringify({error: error}));
    };


    $scope.guardarEmpleado = function () {

        var empleado=new Object();

        empleado.dni=$scope.dniEmpleado;
        empleado.nombreEmpleado=$scope.nombreEmpleado;
        empleado.apellidos=$scope.apellidosEmpleado;
        empleado.cargo=$scope.cargoEmpleado;
        empleado.direccion=$scope.direccionEmpleado;
        empleado.ciudad=$scope.ciudadEmpleado;
        empleado.codigoPostal=$scope.codigoPostalEmpleado;
        empleado.pais=$scope.paisEmpleado;
        empleado.telefono=$scope.telefonoEmpleado;
        if ($scope.tienedni)
            var promise = $http.post('http://localhost:8080/TiendaNeptuno/updateEmpleado',empleado);
        else
            var promise = $http.post('http://localhost:8080/TiendaNeptuno/addEmpleado',empleado);
            promise.then(function (data, status, headers, config) {
            }), function (error) {
            alert("Error: " + JSON.stringify({ error: error }));
        };
        $location.path("listaEmpleado")
    };
}]);
