var app = angular.module('neptunoApp');
app.controller('CtrlListaCategoria', ['$scope', '$http', function ($scope, $http) {
     $scope.listaCategoria = [];
     $scope.submit = function() {
         var promise = $http.post('listaCategoria', []);
         promise.then(function(data, status, headers, config) {
         $scope.listaCategoria = data.data;
         }), function(error) {
         alert( "Error: " + JSON.stringify({error: error}));
         };
     };
}]);