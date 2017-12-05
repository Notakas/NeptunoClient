var app = angular.module('neptunoApp');
   app.controller('CtrlListaPedido', ['$scope', '$http', function ($scope, $http) {
        $scope.listaPedidos = [];
            var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/listaPedidos/', []);
            promise.then(function(data, status, headers, config) {
            $scope.listaPedidos = data.data;
            }), function(error) {
            alert( "Error: " + JSON.stringify({error: error}));
            };
}]);

app.controller("CtrlGuardarPedido",[ '$scope', '$http', '$routeParams' ,'$location', function($scope, $http, $routeParams ,$location){
    run();
    $scope.loading=true;
    $scope.tabla=false;
        var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/listaProductos/', []); 
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
            "idProducto":$scope.idProducto,
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

function run() {
    var t = document.getElementById('myTable');
    t.onclick = function (event) {
        event = event || window.event; //IE8
        var target = event.target || event.srcElement;
        while (target && target.nodeName != 'TR') { // find TR
            target = target.parentElement;
        }
        //if (!target) { return; } //tr should be always found
        var cells = target.cells; //cell collection - https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableRowElement
        //var cells = target.getElementsByTagName('td'); //alternative
        if (!cells.length || target.parentNode.nodeName == 'THEAD') {
            return;
        }
        var f1 = document.getElementById('idProducto');
        var f2 = document.getElementById('nombreProducto');
        var f3 = document.getElementById('precioVenta');
        
        
        f1.value = cells[0].innerHTML;
        var event = new Event('input', {
            'bubbles': true,
            'cancelable': true
        });

        f1.dispatchEvent(event);
        var event = new Event('change', {
            'bubbles': true,
            'cancelable': true
        });

        f1.dispatchEvent(event);
        f2.value = cells[1].innerHTML;
        var event = new Event('input', {
            'bubbles': true,
            'cancelable': true
        });

        f2.dispatchEvent(event);
        var event = new Event('change', {
            'bubbles': true,
            'cancelable': true
        });

        f2.dispatchEvent(event);
        
        f3.value = cells[2].innerHTML;
        var event = new Event('input', {
            'bubbles': true,
            'cancelable': true
        });

        f3.dispatchEvent(event);
        var event = new Event('change', {
            'bubbles': true,
            'cancelable': true
        });
        
        f3.dispatchEvent(event);

        
        
    };
}