var app = angular.module('neptunoApp');
app.controller('CtrlListaProducto', ['$scope', '$http', function ($scope, $http) {
     $scope.listaProducto = [];
         var promise = $http.post('listaProducto', []);
         promise.then(function(data, status, headers, config) {
         $scope.listaProducto = data.data;
         }), function(error) {
         alert( "Error: " + JSON.stringify({error: error}));
         };
}]);

app.controller('CtrlGuardarProducto', ['$scope', '$http', function ($scope, $http) {
    var Producto={"nombreProducto":$scope.nombreProducto,"idProducto":$scope.idProducto,
    "descripcion":$scope.descripcionProducto,"precioVenta":$scope.precioVentaProducto,
    "precioCompra":$scope.precioCompraProducto,"existencias":$scope.existenciasProducto
}
    $scope.guardarProducto = function () {
    var promise = $http.post('http://localhost:8080/AngularSpring/guardarProducto',Producto);
    promise.then(function (data, status, headers, config) {   
    }), function (error) {
        alert("Error: " + JSON.stringify({ error: error }));
    };
};
}]);