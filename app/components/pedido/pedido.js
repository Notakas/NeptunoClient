angular.module('neptunoApp').
    controller('CtrlListaPedido', ['$scope', '$http', function ($scope, $http) {
        $scope.listaPedidos = [];
        $scope.submit = function() {
            var promise = $http.post('listaPedido', []);
            promise.then(function(data, status, headers, config) {
            $scope.listaPedidos = data.data;
            }), function(error) {
            alert( "Error: " + JSON.stringify({error: error}));
            };
            $scope.listado = []; //vacía el listado al final del proceso
        };
}]);