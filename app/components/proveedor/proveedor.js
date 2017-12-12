var app = angular.module('neptunoApp');
app.controller('CtrlListaProveedor', ['$scope', '$http', function ($scope, $http) {
     $scope.listaProveedor = [];
         var promise = $http.post('localhost:8080/TiendaNeptuno/listaProveedores', []);
         promise.then(function(data, status, headers, config) {
         $scope.listaProveedor = data.data;
         }), function(error) {
         alert( "Error: " + JSON.stringify({error: error}));
         };
}]);

app.controller('CtrlGuardarProveedor', ['$scope', '$http','$routeParams', '$location', function ($scope, $http, $routeParams, $location) {


    var promise = $http.get('localhost:8080/TiendaNeptuno/verProveedor/'+$routeParams.id);

    promise.then(function(data, status, headers, config) {
        proveedor = data.data;
        $scope.nombreProveedor=proveedor.nombreProveedor;
        $scope.direccionProveedor=proveedor.direccion;
        $scope.ciudadProveedor=proveedor.ciudad;
        $scope.idProveedor=proveedor.idProveedor;
        $scope.codigoPostalProveedor=proveedor.codigoPostal;
        $scope.paisProveedor=proveedor.pais;
        $scope.telefonoProveedor=proveedor.telefono;
    }), function(error) {
        alert( "Error: " + JSON.stringify({error: error}));
    };

    $scope.guardarProveedor = function () {
        var proveedor=new Object();
        proveedor.nombreProveedor=$scope.nombreProveedor;
        proveedor.direccion=$scope.direccionProveedor;
        proveedor.ciudad=$scope.ciudadProveedor;
        proveedor.codigoPostal=$scope.codigoPostalProveedor;
        proveedor.idProveedor=$scope.idProveedor;
        proveedor.pais=$scope.paisProveedor;
        proveedor.telefono=$scope.telefonoProveedor;
        if (proveedor.idProveedor!=null ||proveedor.idProveedor!=0)
            var promise = $http.post('http://localhost:8080/TiendaNeptuno/updateProveedor',proveedor);
        else
            var promise = $http.post('http://localhost:8080/TiendaNeptuno/addProveedor',proveedor);
        promise.then(function (data, status, headers, config) {
        }), function (error) {
            alert("Error: " + JSON.stringify({ error: error }));
        };
        $location.path("listaProveedor")
    };
}]);
