var app = angular.module('invoices', []);
	app.controller('invoiceListCtrl', invoiceList);

function invoiceList($scope, $http, $filter) {
	console.log('hello');
	function getInvoices() {
		$http.get('http://localhost:8000/api/invoices').then(function(response){
			$scope.invoices = response.data;
			console.log($scope.invoices);
		})
	}
	function getCustomers() {
		$http.get('http://localhost:8000/api/customers').then(function (response) {
			var customers = response.data;
			$scope.customers = customers;
		});
	}
	$scope.customerById = function(customerId) {
		var result = $filter('filter')($scope.customers, {id:customerId})[0];
		return result;
	}
	getInvoices();
	getCustomers();
}
