var app = angular.module("neptunoApp");
app.controller("CtrlLogin",[ '$scope', '$http', '$location', function($scope, $http, $location){
	$scope.login = function() { 
	
	var data = {
				"dniEmpleado":$scope.dniEmpleado,
				"contrasena":$scope.contrasena
				}

	
		var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno', data); 
		promise.then(function(data, status, headers, config) { 
			$scope.mensaje=data.data.Mensaje;
			}), function(error) {     
				alert( "Error: " + JSON.stringify({error: error}));  
		};
		$location.path("")
	  };
}]);
