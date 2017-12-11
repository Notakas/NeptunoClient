var app = angular.module('neptunoApp');
app.controller('CtrlListaProducto', ['$scope', '$http', function ($scope, $http) {
     $scope.listaProducto = [];
         var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/listaProductos', []);
         promise.then(function(data, status, headers, config) {
         $scope.listaProducto = data.data;
         }), function(error) {
         alert( "Error: " + JSON.stringify({error: error}));
         };
}]);

app.controller('CtrlGuardarProducto', ['$scope', '$http','$routeParams', '$location', function($scope, $http, $routeParams, $location){

    var promise = $http.get('http://192.168.43.73:8081/TiendaNeptuno/verProducto/'+$routeParams.id);

    promise.then(function(data, status, headers, config) {
        producto = data.data;
        $scope.nombreProducto=producto.nombreProducto;
        $scope.idProducto=producto.idProducto;
        $scope.descripcionProducto=producto.descripcion;
        $scope.precioVentaProducto=producto.precioVenta;
        $scope.precioCompraProducto=producto.precioCompra;
        $scope.existenciasProducto=producto.existencias;
    }), function(error) {
        alert( "Error: " + JSON.stringify({error: error}));
    };
    $scope.guardarProducto = function () {

        var producto=new Object();

        producto.nombreProducto=$scope.nombreProducto;
        producto.idProducto=$scope.idProducto;
        producto.descripcion=$scope.descripcionProducto;
        producto.precioVenta=$scope.precioVentaProducto;
        producto.precioCompra=$scope.precioCompraProducto;
        producto.existencias=$scope.existenciasProducto;
        if (producto.idProducto!=null)
            var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/updateProducto',producto);
        else
            var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/addProducto',producto);
            promise.then(function (data, status, headers, config) {
            }), function (error) {
            alert("Error: " + JSON.stringify({ error: error }));
        };
        $location.path("listaProducto")
    };
}]);
