var app = angular.module('neptunoApp', ['ngRoute','neptunoControllers']);
var app = angular.module('neptunoControllers', []);
app.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
$routeProvider.when('/', {
templateUrl: 'index.html',
}).when('/listaProducto', {
    templateUrl: 'app/components/producto/listaProducto.html',
    controller: 'CtrlListaProducto'
}).when('/listaProveedor', {
    templateUrl: 'app/components/proveedor/listaProveedor.html',
    controller: 'CtrlListaProveedor'
}).when('/listaCategoria', {
    templateUrl: 'app/components/categoria/listaCategoria.html',
    controller: 'CtrlListaCategoria'
}).when('/listaEmpleado', {
    templateUrl: 'app/components/empleado/listaEmpleado.html',
    controller: 'CtrlListaEmpleado'
}).when('/listaCliente', {
    templateUrl: 'app/components/cliente/listaCliente.html',
    controller: 'CtrlListaCliente'
}).when('/listaPedido', {
    templateUrl: 'app/components/pedido/listaPedido.html',
    controller: 'CtrlListaPedido'
}).when('/añadirProducto', {
    templateUrl: 'app/components/producto/guardarProducto.html',
    controller: 'CtrlGuardarProducto'
}).when('/añadirProveedor', {
    templateUrl: 'app/components/proveedor/guardarProveedor.html',
    controller: 'CtrlGuardarProveedor'
}).when('/añadirCliente', {
    templateUrl: 'app/components/cliente/guardarCliente.html',
    controller: 'CtrlGuardarCliente'
}).when('/añadirEmpleado', {
    templateUrl: 'app/components/empleado/guardarEmpleado.html',
    controller: 'CtrlGuardarEmpleado'
}).when('/añadirCategoria', {
    templateUrl: 'app/components/categoria/guardarCategoria.html',
    controller: 'CtrlGuardarCategoria'
}).when('/añadirPedido', {
    templateUrl: 'app/components/pedido/guardarPedido.html',
    controller: 'CtrlGuardarPedido'
}).when('/modificarProducto/:id', {
    templateUrl: 'app/components/producto/guardarProducto.html',
    controller: 'CtrlGuardarProducto'
}).when('/modificarCliente/:id', {
    templateUrl: 'app/components/cliente/guardarCliente.html',
    controller: 'CtrlGuardarCliente'
}).when('/modificarEmpleado/:id', {
    templateUrl: 'app/components/empleado/guardarEmpleado.html',
    controller: 'CtrlGuardarEmpleado'
}).when('/modificarProveedor/:id', {
    templateUrl: 'app/components/proveedor/guardarProveedor.html',
    controller: 'CtrlGuardarProveedor'
}).when('/modificarPedido/:id', {
    templateUrl: 'app/components/pedido/guardarPedido.html',
    controller: 'CtrlGuardarPedido'
}).when('/modificarCategoria/:id', {
    templateUrl: 'app/components/categoria/guardarCategoria.html',
    controller: 'CtrlGuardarCategoria'
});
$locationProvider.html5Mode(false).hashPrefix('!');
}]);
