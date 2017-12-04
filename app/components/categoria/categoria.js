var app = angular.module('neptunoApp');
app.controller('CtrlListaCategoria', ['$scope', '$http', function ($scope, $http) {
    $scope.listaCategoria = [];
    var promise = $http.post('listaCategoria', []);
    promise.then(function (data, status, headers, config) {
        $scope.listaCategoria = data.data;
    }), function (error) {
        alert("Error: " + JSON.stringify({ error: error }));
    };
}]);

app.controller('CtrlGuardarCategoria', ['$scope', '$http', function ($scope, $http) {
    var categoria={
                    "nombreCategoria":$scope.nombreCategoria,
                    "idCategoria":$scope.idCategoria,
                    "descripcion":$scope.descripcionCategoria
    }
    $scope.guardarCategoria = function () {
    var promise = $http.post('http://localhost:8080/AngularSpring/guardarCategoria',categoria);
    promise.then(function (data, status, headers, config) {   
    }), function (error) {
        alert("Error: " + JSON.stringify({ error: error }));
    };
};
}]);