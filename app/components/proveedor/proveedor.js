var app = angular.module('neptunoApp');
app.controller('CtrlListaProveedor', ['$scope', '$http', function ($scope, $http) {
     $scope.listaProveedor = [];
         var promise = $http.post('listaProveedor', []);
         promise.then(function(data, status, headers, config) {
         $scope.listaProveedor = data.data;
         }), function(error) {
         alert( "Error: " + JSON.stringify({error: error}));
         };
}]);

app.controller('CtrlGuardarProveedor', ['$scope', '$http', function ($scope, $http, $routeParams) {
    var promise = $http.post('listaProveedor',$routeParams.id);
    promise.then(function(data, status, headers, config) {
    var proveedor = data.data;
    $scope.nombreProveedor=proveedor.nombreProveedor;
    $scope.ciudadProveedor=proveedor.ciudad;
    $scope.idProveedor=proveedor.idProveedor;
    $scope.codigoPostalProveedor=proveedor.codigoPostal;
    $scope.paisProveedor=proveedor.pais;
    $scope.telefonoProveedor=proveedor.telefono;
    }), function(error) {
    alert( "Error: " + JSON.stringify({error: error}));
    };
    $scope.guardarProveedor = function () {
    var promise = $http.post('http://localhost:8080/AngularSpring/guardarProveedor',proveedor);
    promise.then(function (data, status, headers, config) {   
    }), function (error) {
        alert("Error: " + JSON.stringify({ error: error }));
    };
};
}]);