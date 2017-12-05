var app = angular.module('neptunoApp');
app.controller('CtrlListaCategoria', ['$scope', '$http', function ($scope, $http) {
     $scope.listaCategoria = [];
         var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/listaCategorias', []);
         promise.then(function(data, status, headers, config) {
         $scope.listaCategoria = data.data;
         }), function(error) {
         alert( "Error: " + JSON.stringify({error: error}));
         };
}]);

app.controller('CtrlGuardarCategoria', ['$scope', '$http','$routeParams', function ($scope, $http, $routeParams) {

    var promise = $http.get('http://192.168.43.73:8081/TiendaNeptuno/verCategoria/'+$routeParams.id);

    promise.then(function(data, status, headers, config) {
        categoria = data.data;
        $scope.nombreCategoria=categoria.nombreCategoria,
        $scope.idCategoria=categoria.idCategoria,
        $scope.descripcionCategoria=categoria.descripcion;
    }), function(error) {
        alert( "Error: " + JSON.stringify({error: error}));
    };
    $scope.guardarCategoria = function () {

        var categoria=new Object();
        categoria.nombreCategoria=$scope.nombreCategoria;
        categoria.idCategoria=$scope.idCategoria;
        categoria.descripcion=$scope.descripcionCategoria;
        if (categoria.idCategoria!=null)
            var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/updateCategoria',categoria);
        else
            var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/addCategoria',categoria);
            promise.then(function (data, status, headers, config) {
            }), function (error) {
            alert("Error: " + JSON.stringify({ error: error }));
        };
    };
}]);
