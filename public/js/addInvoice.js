app.controller('addInvoiceCtrl', addInvoice);

function addInvoice($scope, $http, $filter) {

	$scope.invoiceItems = [];
	$scope.newInvoice = {
		id: 0,
		customer_id: 0,
		discount: 0,
		total: 0,
	};
	$scope.test = 'test';
	function latestInvoice() {
		$http.get('http://localhost:8000/api/invoices').then(function(response){
			var id = response.data.length;
			$scope.newInvoice.id = id;
		})
	}
	function getProducts() {
		$http.get('http://localhost:8000/api/products').then(function (response) {
			var products = response.data;
			$scope.products = products;
		});
	}
	function getCustomers() {
		$http.get('http://localhost:8000/api/customers').then(function (response) {
			var customers = response.data;
			$scope.customers = customers;
		});
	}
	$scope.addInvoiceItem = function(invoiceId,productId,quantity) {
		var data = {};
		data.invoice_id = invoiceId;
		data.product_id = productId;
		data.quantity = quantity;
		$scope.invoiceItems.push(data);
		$http.post('http://localhost:8000/api/invoices/'+invoiceId+'/items/', data).then(function (data, response) {
			$scope.newInvoice.total +=quantity*$scope.productById(productId).price;
			$scope.invoiceUpdate();
			$scope.itemQuantity = '';
			$scope.selectedProduct = '';
		});
	}
	function invoiceInit () {
		console.log('started');
		var data={};
		$http.post('http://localhost:8000/api/invoices/', data).then(function (data, response) {})
	}
	$scope.invoiceUpdate = function() {
		$scope.newInvoice.customer_id = $scope.selectedCustomer.id;
		var data = $scope.newInvoice;
		console.log(data);
		$http.put('http://localhost:8000/api/invoices/'+data.id, data).then(function(data, response){
			console.log('success');
		}
			)
	}
	$scope.productById = function(currentId) {
		var result = $filter('filter')($scope.products, {id:currentId})[0];
		return result;
	}
	invoiceInit();
	latestInvoice();
	getProducts();
	getCustomers();
}