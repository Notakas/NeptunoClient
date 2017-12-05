var app = angular.module('neptunoApp');
app.controller('CtrlListaEmpleado', ['$scope', '$http', function ($scope, $http) {
     $scope.listaEmpleado = [];
         var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/listaEmpleados', []);
         promise.then(function(data, status, headers, config) {
         $scope.listaEmpleado = data.data;
         }), function(error) {
         alert( "Error: " + JSON.stringify({error: error}));
         };
}]);

app.controller('CtrlGuardarEmpleado', ['$scope', '$http','$routeParams', function ($scope, $http, $routeParams) {

    var promise = $http.get('http://192.168.43.73:8081/TiendaNeptuno/verEmpleado/'+$routeParams.id);

    promise.then(function(data, status, headers, config) {
        empleado = data.data;
        $scope.dni=empleado.dni;
        $scope.nombreEmpleado=empleado.nombreEmpleado;
        $scope.apellidos=empleado.apellidos;
        $scope.cargo=empleado.cargo;
        $scope.direccion=empleado.direccion;
        $scope.ciudad=empleado.ciudad;
        $scope.codigoPostal=empleado.codigoPostal;
        $scope.pais=empleado.pais;
        $scope.telefono=empleado.telefono;
    }), function(error) {
        alert( "Error: " + JSON.stringify({error: error}));
    };
    $scope.guardarEmpleado = function () {

        var empleado=new Object();

        empleado.dni=$scope.dni;
        empleado.nombreEmpleado=$scope.nombreEmpleado;
        empleado.apellidos=$scope.apellidos;
        empleado.cargo=$scope.cargo;
        empleado.direccion=$scope.direccion;
        empleado.ciudad=$scope.ciudad;
        empleado.codigoPostal=$scope.codigoPostal;
        empleado.pais=$scope.pais;
        empleado.telefono=$scope.telefono;
        if (empleado.idEmpleado!=null)
            var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/updateEmpleado',empleado);
        else
            var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/addEmpleado',empleado);
            promise.then(function (data, status, headers, config) {
            }), function (error) {
            alert("Error: " + JSON.stringify({ error: error }));
        };
    };
}]);
