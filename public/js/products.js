angular.module('invoices').controller('productsCtrl', productsCtrl);

function productsCtrl($scope, $http, $filter) {
	$scope.productEditing = false;
	console.log('product page loaded');
		function getProducts() {
			$http.get('http://localhost:8000/api/products').then(function (response) {
				var products = response.data;
				$scope.products = products;
				for (var i = 0; i < products.length; i++) {
					$scope.productEditing[i] = false;
				};
			});
		}
		$scope.editProduct = function(productId) {
			$('.product-'+productId+' td').css('display', 'none');
		}
		$scope.preventEdit = function() {
			console.log('preventing');
			$('.edit-product').addClass('disabled');
		}
		$scope.enableEdit = function() {
			$('.edit-product').removeClass('disabled');
		}
		$scope.updateProduct = function(productId) {
			var neededProduct = $filter('filter')($scope.products, {id:productId})[0];
			$http.put('http://localhost:8000/api/products/'+productId, neededProduct).then(function(neededProduct, response){
				console.log(neededProduct);
				console.log('success');
			})
		}
		getProducts();
}