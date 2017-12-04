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