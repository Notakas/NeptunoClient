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

app.controller('CtrlGuardarProveedor', ['$scope', '$http', function ($scope, $http) {
    var Proveedor={"nombreProveedor":$scope.nombreProveedor,"idProveedor":$scope.idProveedor,
    "ciudad":$scope.ciudadProveedor,"codigoPostal":$scope.codigoPostalProveedor,
    "pais":$scope.paisProveedor,"telefono":$scope.telefonoProveedor
}
    $scope.guardarProveedor = function () {
    var promise = $http.post('http://localhost:8080/AngularSpring/guardarProveedor',Proveedor);
    promise.then(function (data, status, headers, config) {   
    }), function (error) {
        alert("Error: " + JSON.stringify({ error: error }));
    };
};
}]);