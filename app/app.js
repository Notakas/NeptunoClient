var app = angular.module('neptunoApp', ['ngRoute','neptunoControllers']);
app.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
$routeProvider.when('/', {
templateUrl: 'components/login/login.html',
controller: 'CtrlLogin'
}).when('/añadirProducto', {
    templateUrl: 'components/producto/addProducto.html',
    controller: 'CtrlAddProducto'
}).when('/añadirProveedor', {
    templateUrl: 'components/proveedor/addProveedor.html',
    controller: 'CtrlAddProveedor'
}).when('/añadirCliente', {
    templateUrl: 'components/cliente/addCliente.html',
    controller: 'CtrlAddCliente'
}).when('/añadirEmpleado', {
    templateUrl: 'components/empleado/addEmpleado.html',
    controller: 'CtrlAddEmpleado'
}).when('/añadirCategoria', {
    templateUrl: 'components/categoria/addCategoria.html',
    controller: 'CtrlAddCategoria'
}).when('/añadirPedido', {
    templateUrl: 'components/pedido/addPedido.html',
    controller: 'CtrlAddPedido'
}).when('/modificarProducto/:id', {
    templateUrl: 'components/producto/guardarProducto.html',
    controller: 'CtrlGuardarProducto'
}).when('/modificarCliente/:id', {
    templateUrl: 'components/cliente/guardarCliente.html',
    controller: 'CtrlGuardarCliente'
}).when('/modificarEmpleado/:id', {
    templateUrl: 'components/empleado/guardarEmpleado.html',
    controller: 'CtrlGuardarEmpleado'
}).when('/modificarProveedor/:id', {
    templateUrl: 'components/proveedor/guardarProveedor.html',
    controller: 'CtrlGuardarProveedor'
}).when('/modificarPedido/:id', {
    templateUrl: 'components/pedido/guardarPedido.html',
    controller: 'CtrlGuardarPedido'
}).when('/modificarCategoria/:id', {
    templateUrl: 'components/producto/guardarCategoria.html',
    controller: 'CtrlGuardarCategoria'
});
$locationProvider.html5Mode(false).hashPrefix('!');
}]);