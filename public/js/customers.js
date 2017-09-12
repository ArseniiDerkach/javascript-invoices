angular.module('invoices').controller('customersCtrl', customersCtrl);

function customersCtrl($scope, $http, $filter) {
	console.log('Customer page loaded');
		function getCustomers() {
			$http.get('http://localhost:8000/api/customers').then(function (response) {
				var customers = response.data;
				$scope.customers = customers;
			});
		}
		$scope.editCustomer = function(customerId) {
			$('.customer-'+customerId+' td').css('display', 'none');
		}
		$scope.preventEdit = function() {
			console.log('preventing');
			$('.edit-customer').addClass('disabled');
		}
		$scope.enableEdit = function() {
			$('.edit-customer').removeClass('disabled');
		}
		$scope.updateCustomer = function(customerId) {
			var neededCustomer = $filter('filter')($scope.customers, {id:customerId})[0];
			$http.put('http://localhost:8000/api/customers/'+customerId, neededCustomer).then(function(neededCustomer, response){
				console.log(neededCustomer);
				console.log('success');
			})
		}
		getCustomers();
}