'use strict';

// RouteCtrl - expose app.routes and the current route for the navbar
app.controller('RouteCtrl', function ($scope, $route) {
        $scope.$route = $route;
        $scope.links = app.routes;
});

// HomeCtrl - expose the changed entities in the EntityManager
app.controller('HomeCtrl', ['$scope', function ($scope) {

    $scope.reset = function () {
        app.dataservice.rejectChanges();
    }

    $scope.update = function () {
        app.dataservice.saveChanges();
    }

    // expose all the changed entities from the entityManager
    $scope.changedEntities = app.dataservice.getChanges();
    app.dataservice.subscribeChanges(function (changeargs) {
        $scope.changedEntities = app.dataservice.getChanges();
    });

}]);

// CustomerCtrl - load the customers and configure the grid to display them
app.controller('CustomerCtrl', ['$scope', function ($scope) {

	$scope.flexGrid = null;
	$scope.numberInput = null;
	$scope.customers = new wijmo.collections.CollectionView();
	$scope.customer = null;
	$scope.pageSize = 10;
	$scope.currentPage = 1;
	$scope.pageCount = 0;
	$scope.filterText = null;
	$scope.totalServerItems = 0;
    $scope.customers.currentChanged.addHandler(function () {
    	$scope.customer = $scope.customers.currentItem;
    });

    $scope.customers.collectionChanged.addHandler(function () {
    	$scope.customer = $scope.customers.currentItem;
    });

    $scope.reset = function (customer) {
    	customer.entityAspect.rejectChanges();
    	$scope.flexGrid.collectionView.cancelEdit();
    }

    $scope.update = function (customer) {
    	$scope.flexGrid.collectionView.commitEdit();
    	app.dataservice.saveChanges([customer]);
    	$scope.getPagedDataAsync($scope.pageSize, $scope.currentPage, $scope.filterText);
    }

    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        var skip = (page - 1) * pageSize;
        var take = pageSize * 1;
        app.dataservice.getCustomerPage(skip, take, searchText)
            .then(customersQuerySucceeded)
            .fail(queryFailed);
    };

    $scope.moveToNextPage = function () {
    	if ($scope.currentPage < $scope.pageCount) {
    		$scope.currentPage++;
    	}
    };

    $scope.moveToPreviousPage = function () {
    	if ($scope.currentPage > 1) {
    		$scope.currentPage--;
    	}
    };

    $scope.moveToFirstPage = function () {
    	$scope.currentPage = 1;
    };

    $scope.moveToLastPage = function () {
    	$scope.currentPage = $scope.pageCount;
    };

    $scope.getPagedDataAsync($scope.pageSize, $scope.currentPage, $scope.filterText);

    $scope.$watch('filterText', function (newVal, oldVal) {
    	if (newVal !== oldVal) {
    		$scope.getPagedDataAsync($scope.pageSize, $scope.currentPage, $scope.filterText);
    	}
    });

    $scope.$watch('currentPage', function (newVal, oldVal) {
    	if (newVal !== oldVal) {
    		$scope.getPagedDataAsync($scope.pageSize, $scope.currentPage, $scope.filterText);
    	}
    });

    function updateItem() {
    	$scope.flexGrid.collectionView.editItem($scope.customer);
    	$scope.flexGrid.collectionView.commitEdit();
    }

	// update page size
    $scope.$watch('pageSize', function (newVal, oldVal) {
    	if (newVal !== oldVal) {
    		$scope.currentPage = 1;
    		$scope.getPagedDataAsync($scope.pageSize, $scope.currentPage, $scope.filterText);
    		if ($scope.pageSize === 0) {
    			$scope.pageCount = 1
    		}
    	}
    });

    //#region private functions
    function customersQuerySucceeded(data) {
    	$scope.customers.sourceCollection = data.results;
    	if (data.inlineCount !== null && data.inlineCount !== undefined) {
        	$scope.totalServerItems = data.inlineCount;
        	if ($scope.pageSize === 0) {
        		$scope.pageCount = 1
        	} else {
        		$scope.pageCount = Math.ceil(data.inlineCount / $scope.pageSize);
        	}
        	if ($scope.numberInput) {
        		$scope.numberInput.max = $scope.pageCount;
        	}
        }
        $scope.$apply();
        app.logger.info("Fetched " + data.results.length + " Customers ");
    }

    function queryFailed(error) {
        app.logger.error(error.message, "Query failed");
    }

    app.dataservice.subscribeChanges(updateItem);
}]);

// OrderCtrl - load the orders and configure the grid to display them.
app.controller('OrderCtrl', function ($scope) {

	$scope.orderGrid = null;

	$scope.orders = new wijmo.collections.CollectionView();

	$scope.currentOrder = null;

	$scope.orders.currentChanged.addHandler(function () {
		$scope.currentOrder = $scope.orders.currentItem;
	});

	$scope.orders.collectionChanged.addHandler(function () {
		$scope.currentOrder = $scope.orders.currentItem;
	});

	$scope.update = function (currentOrder) {
		app.dataservice.saveChanges([currentOrder]);
		$scope.orderGrid.collectionView.commitEdit();
	};

	$scope.reset = function (currentOrder) {
		currentOrder.entityAspect.rejectChanges();
		$scope.orderGrid.collectionView.cancelEdit();
	}

    app.dataservice.getOrders()
        .then(querySucceeded)
        .fail(queryFailed);

    $scope.$watch("orderGrid", function () {
    	if ($scope.orderGrid) {
    		// store reference to grid
    		var grid = $scope.orderGrid,
				tip = new wijmo.Tooltip(),
                rng = null;

    		// monitor the mouse over the grid
    		grid.hostElement.addEventListener('mousemove', function (evt) {
    			var ht = grid.hitTest(evt);
    			if (!ht.cellRange.equals(rng)) {
    				// new cell selected, show tooltip
    				if (ht.cellType == wijmo.grid.CellType.Cell) {
    					rng = ht.cellRange;
    					var cellElement = document.elementFromPoint(evt.clientX, evt.clientY),
							cellBounds = wijmo.Rect.fromBoundingRect(cellElement.getBoundingClientRect()),
							data = wijmo.escapeHtml(grid.getCellData(rng.row, rng.col, true)),
                            tipContent = '<b>' + data + '</b>';
    					if (cellElement.className.indexOf('wj-cell') > -1) {
    						tip.show(grid.hostElement, tipContent, cellBounds);
    					} else {
    						tip.hide(); // cell must be behind scroll bar...
    					}
    				}
    			}
    		});
    		grid.hostElement.addEventListener('mouseout', function () {
    			tip.hide();
    			rng = null;
    		});
    	}
    });

    //#region private functions
    function querySucceeded(data) {
        $scope.orders.sourceCollection = data.results;
        $scope.$apply();
        app.logger.info("Fetched " + data.results.length + " Orders ");
    }

    function queryFailed(error) {
        logger.error(error.message, "Query failed");
    }
});
