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
    $scope.listaEmpleado = [];
    var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/listaEmpleados/', []);
    promise.then(function(data, status, headers, config) {
    $scope.listaEmpleado = data.data;
    }), function(error) {
    alert( "Error: " + JSON.stringify({error: error}));
    };

    $scope.listaClientes = [];
    var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/listaClientes/', []);
    promise.then(function(data, status, headers, config) {
    $scope.listaClientes = data.data;
    }), function(error) {
    alert( "Error: " + JSON.stringify({error: error}));
    };

    var promise = $http.get('http://192.168.43.73:8081/TiendaNeptuno/verPedido/'+$routeParams.id);
    $scope.estadoPedido="En preparacion";
    $scope.mensaje="listo";
        promise.then(function(data, status, headers, config) {
            pedido = data.data;
            $scope.idPedido=pedido.idPedido;
            $scope.dniCreacionPedido=pedido.empleado.dni;
            $scope.cifClientePedido=pedido.cliente.cif;
            $scope.estadoPedido=pedido.estadoPedido;
            $scope.destinatarioPedido=pedido.destinatario;
            $scope.direccionEntregaPedido=pedido.direccionEntrega;
            $scope.codigoPostalPedido=pedido.codigoPostal;
            $scope.paisPedido=pedido.pais;
        }), function(error) {
            alert( "Error: " + JSON.stringify({error: error}));
        };
    		
    $scope.guardarPedido=function(){
        var pedido=new Object();
        pedido.idPedido=$scope.idPedido;
        pedido.empleado =  $scope.dniCreacionPedido;
        pedido.cliente = $scope.cifClientePedido;
        pedido.estadoPedido=$scope.estadoPedido;
        pedido.destinatario=$scope.destinatarioPedido;
        pedido.direccionEntrega=$scope.direccionEntregaPedido;
        pedido.codigoPostal=$scope.codigoPostalPedido;
        pedido.pais=$scope.paisPedido;
        var nuevolistado = [];
        for (i=0;i<$scope.listado.length;i++){
            var lineapedidon = new Object();
            lineapedidon.cantidad=parseInt($scope.listado[i].cantidad);
            lineapedidon.descuento=parseFloat($scope.listado[i].descuento);
            lineapedidon.precioUnidad=parseFloat($scope.listado[i].precioVenta);
            var producton = new Object();
            producton.idProducto =parseInt($scope.listado[i].idProducto);
            var categorian = new Object();
            categorian.idCategoria = parseInt($scope.listado[i].idCategoria) //QUEDA POR OBTENER EL ID DE CATEGORIA
            var proveedorn = new Object();
            proveedorn.idProveedor = parseInt($scope.listado[i].idProveedor) //QUEDA POR OBTENER EL ID DE PROVEEDOR
            producton.categoria = categorian;
            producton.proveedor = proveedorn;
            lineapedidon.producto = producton;

            nuevolistado.push(lineapedidon);
        }

        pedido.lineasPedido=nuevolistado;
        pedido.importeTotal=parseFloat($scope.precioFinal);
        if (pedido.idPedido!=null ||pedido.idPedido!=0)
            var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/updatePedido',pedido);
        else
        $scope.estadoPedido="En preparacion";
        $scope.mensaje="listo";
            var promise = $http.post('http://192.168.43.73:8081/TiendaNeptuno/addPedido',pedido);
        promise.then(function (data, status, headers, config) {
        }), function (error) {
            alert("Error: " + JSON.stringify({ error: error }));
        };
    }

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
            "idCategoria":$scope.idCategoria,
            "idProveedor":$scope.idProveedor,
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
        var f4 = document.getElementById('idCategoria');
        var f5 = document.getElementById('idProveedor');
        
        
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

        f4.value = cells[3].innerHTML;
        var event = new Event('input', {
            'bubbles': true,
            'cancelable': true
        });

        f4.dispatchEvent(event);
        var event = new Event('change', {
            'bubbles': true,
            'cancelable': true
        });

        f4.dispatchEvent(event);

        f5.value = cells[4].innerHTML;
        var event = new Event('input', {
            'bubbles': true,
            'cancelable': true
        });

        f5.dispatchEvent(event);
        var event = new Event('change', {
            'bubbles': true,
            'cancelable': true
        });

        f5.dispatchEvent(event);
        
        
    };
}