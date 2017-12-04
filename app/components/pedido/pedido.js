var app = angular.module('neptunoApp');
   app.controller('CtrlListaPedido', ['$scope', '$http', function ($scope, $http) {
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

app.controller("ctrlListaPedidoProducto",[ '$scope', '$http', function($scope, $http){
    $scope.loading=true;
    $scope.tabla=false;
        var promise = $http.post('http://localhost:8080/AngularSpring/', []); 
    promise.then(function(data, status, headers, config) { 
        $scope.lista=data.data;
        $scope.loading=false;
        $scope.tabla=true;
        }), function(error) {     
            alert( "Error: " + JSON.stringify({error: error}));  
    };
    $scope.listado=[]; 
    $scope.precioFinal=0;		
    
    $scope.Add = function() { 
    if($scope.descuento==null || $scope.descuento==""){
            $scope.descuento=0;
        }
    
    var precioAux = parseFloat((parseInt($scope.precioVenta)-((parseInt($scope.precioVenta)*parseInt($scope.descuento))/100))*
                            parseInt($scope.cantidad)).toFixed(2);
                            
    //juntar dos productos identicos
    var comprobar = false;
    var arrayCarrito = $scope.listado;
    for(var i=0;i<(arrayCarrito).length;i++){
        if(arrayCarrito[i]["nombreProducto"]==$scope.nombreProducto && arrayCarrito[i]["descuento"]==$scope.descuento){
                arrayCarrito[i]["cantidad"]=parseInt(arrayCarrito[i]["cantidad"])+parseInt($scope.cantidad);
                arrayCarrito[i]["precioVenta"]=parseInt(arrayCarrito[i]["precioVenta"])+parseInt(precioAux);
                comprobar = true;
                break;
        }
    }
    if(comprobar==false){
        var data = {
            "nombreProducto":$scope.nombreProducto,
            "cantidad":$scope.cantidad,
            "descuento":$scope.descuento,
            "precioVenta":precioAux
            }
    
        $scope.listado.push(data); 
    }
    else{
        $scope.listado = arrayCarrito;
    }
    
    $scope.precioFinal = parseFloat((parseInt($scope.precioFinal)+
                        (
                            (parseInt($scope.precioVenta)-((parseInt($scope.precioVenta)*parseInt($scope.descuento))/100))*
                            parseInt($scope.cantidad)
                        ))).toFixed(2); 
                         
    //restar unidades cuando añado al carrito					
    var array = $scope.lista; 
    for(var i=0;i<(array).length;i++){
        if(array[i]["idProducto"]==$scope.idProducto){
                array[i]["existencias"]=parseInt(array[i]["existencias"])-parseInt($scope.cantidad);
                break;
        }
    }
    $scope.lista=array;
    
                  
    };//funcion Add
  
}]);