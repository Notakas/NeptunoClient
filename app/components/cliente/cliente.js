var app = angular.module('neptunoApp');
app.controller('CtrlListaCliente', ['$scope', '$http', function ($scope, $http) {
     $scope.listaCliente = [];
     $scope.submit = function() {
         var promise = $http.post('listaCliente', []);
         promise.then(function(data, status, headers, config) {
         $scope.listaCliente = data.data;
         }), function(error) {
         alert( "Error: " + JSON.stringify({error: error}));
         };
     };
}]);

app.controller('CtrlGuardarCliente', ['$scope', '$http', function ($scope, $http) {
    var cliente={"nombreCliente":$scope.nombreCliente,"idCliente":$scope.idCliente,
    "descripcion":$scope.descripcionCliente
}
    $scope.guardarCliente = function () {
    var promise = $http.post('http://localhost:8080/AngularSpring/guardarCliente',Cliente);
    promise.then(function (data, status, headers, config) {   
    }), function (error) {
        alert("Error: " + JSON.stringify({ error: error }));
    };
};
}]);