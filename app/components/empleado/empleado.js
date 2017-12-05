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

var app = angular.module('neptunoApp');
app.controller('CtrlListaProducto', ['$scope', '$http', function ($scope, $http) {
     $scope.listaProducto = [];
         var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/listaProducto', []);
         promise.then(function(data, status, headers, config) {
         $scope.listaProducto = data.data;
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

        empleado.dni;
        empleado.nombreEmpleado;
        empleado.apellidos;
        empleado.cargo;
        empleado.direccion;
        empleado.ciudad;
        empleado.codigoPostal;
        empleado.pais;
        empleado.telefono;
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
