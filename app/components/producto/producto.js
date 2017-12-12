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

        promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/listaCategorias', []);
        promise.then(function(data, status, headers, config){
            $scope.categorias = data.data;
        }), function(error) {
            alert( "Error: " + JSON.stringify({error: error}));
        };

        promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/listaProveedores', []);
        promise.then(function(data, status, headers, config){
            $scope.proveedores = data.data;
        }), function(error) {
            alert( "Error: " + JSON.stringify({error: error}));
        };
    var promise = $http.get('http://192.168.43.73:8081/TiendaNeptuno/verProducto/'+$routeParams.id);

    promise.then(function(data, status, headers, config) {
        producto = data.data;
        $scope.nombreProducto=producto.nombreProducto;
        $scope.idProducto=producto.idProducto;
        $scope.descripcionProducto=producto.descripcion;
        $scope.precioVentaProducto=producto.precioVenta;
        $scope.precioCompraProducto=producto.precioCompra;
        $scope.existenciasProducto=producto.existencias;

            for (i=0;i<$scope.categorias.length;i++){
                    if ($scope.categorias[i].nombreCategoria == producto.categoria.nombreCategoria)
                    $scope.categoria=$scope.categorias[i];

                }
            for (i=0;i<$scope.proveedores.length;i++){
                    if ($scope.proveedores[i].nombreProveedor == producto.proveedor.nombreProveedor)
                    $scope.proveedor=$scope.proveedores[i];

                }
                
    }), function(error) {
        alert( "Error: " + JSON.stringify({error: error}));
    };



    $scope.guardarProducto = function () {

        var producto=new Object();

        producto.nombreProducto=$scope.nombreProducto;
        producto.idProducto=$scope.idProducto;
        producto.descripcion=$scope.descripcionProducto;
        producto.categoria=$scope.categoria;
        producto.proveedor=$scope.proveedor;
        producto.precioVenta=parseFloat($scope.precioVentaProducto);
        producto.precioCompra=parseFloat($scope.precioCompraProducto);
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
