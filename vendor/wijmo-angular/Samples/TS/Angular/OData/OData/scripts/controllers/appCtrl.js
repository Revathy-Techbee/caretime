'use strict';

var app = angular.module('app');

// app controller: load OData service tables and expose them as collection views
app.controller('appCtrl', function appCtrl($scope, $location) {

    // expose current view name to scope
    $scope.currentView = function () {
        return $location.path().toLowerCase();
    };

    // define data service URL and data types for specific columns
    var oDataService = 'Northwind.svc/',
        dataTypes = [
            { name: 'Unit_Price', type: wijmo.DataType.Number },
            { name: 'Freight', type: wijmo.DataType.Number },
            { name: /.*Date/, type: wijmo.DataType.Date }
         ];

    // create an ODataCollectionView for each table in the database

    // load Categories table
    $scope.cvCat = new wijmo.data.ODataCollectionView(
        { serviceUrl: oDataService, entityName: 'Categories' },
        ['Category_ID'],
        { serverSettings: { selects: ['Category_ID', 'Category_Name'] } },
        dataTypes, loaded, true);

    // load Customers table
    $scope.cvCst = new wijmo.data.ODataCollectionView(
        { serviceUrl: oDataService, entityName: 'Customers' },
        ['Customer_ID'],
        { serverSettings: { selects: ['Customer_ID', 'Company_Name'] } },
        dataTypes, loaded, true);

    // load Employees table
    $scope.cvEmp = new wijmo.data.ODataCollectionView(
        { serviceUrl: oDataService, entityName: 'Employees' },
        ['Employee_ID'],
        null,
        dataTypes, loaded, true);

    // load Suppliers table
    $scope.cvSup = new wijmo.data.ODataCollectionView(
        { serviceUrl: oDataService, entityName: 'Suppliers' },
        ['Supplier_ID'],
        { serverSettings: { selects: ['Supplier_ID', 'Company_Name'] } },
        dataTypes, loaded, true);

    // load Shippers table
    $scope.cvShp = new wijmo.data.ODataCollectionView(
        { serviceUrl: oDataService, entityName: 'Shippers' },
        ['Shipper_ID'],
        { serverSettings: { selects: ['Shipper_ID', 'Company_Name'] } },
        dataTypes, loaded, true);

    // load Products table
    $scope.cvPrd = new wijmo.data.ODataCollectionView(
        { serviceUrl: oDataService, entityName: 'Products' },
        ['Product_ID'],
        { serverSettings: { selects: ['Category_ID', 'Product_ID', 'Product_Name', 'Quantity_Per_Unit', 'Supplier_ID', 'Unit_Price', 'Units_In_Stock', 'Discontinued'] } },
        dataTypes, loaded, true);

    // load Orders table
    $scope.cvOrd = new wijmo.data.ODataCollectionView(
        { serviceUrl: oDataService, entityName: 'Orders' },
        ['Order_ID'],
        { serverSettings: { sorts: [{ property: 'Order_ID', asc: true }] } },
        dataTypes, loaded, true);

    // show products for selected category
    $scope.cvPrd.filter = function (item) {
        var cat = $scope.cvCat.currentItem;
        return cat && item.Category_ID == cat.Category_ID;
    }
    $scope.cvCat.currentChanged.addHandler(function () {
        $scope.cvPrd.refresh();
        $scope.$apply();
    });

    // show orders for selected customer
    $scope.cvOrd.filter = function (item) {
        var cus = $scope.cvCst.currentItem;
        return cus && item.Customer_ID == cus.Customer_ID;
    }
    $scope.cvCst.currentChanged.addHandler(function () {
        $scope.cvOrd.refresh();
        $scope.$apply();
    });

    // show order details for selected order
    $scope.cvOrd.currentChanged.addHandler(function () {
        getOrderDetail();
    });
    $scope.cvOrd.collectionChanged.addHandler(function () {
        getOrderDetail();
    });

    // Get the order details for current selected order.
    function getOrderDetail() {
        if (!$scope.cvOrd.currentItem) {
            return;
        }
        var orderID = $scope.cvOrd.currentItem.Order_ID;
        if (orderID) {
            $scope.cvDtl = new wijmo.data.ODataCollectionView(
                { serviceUrl: oDataService, entityName: 'Order_Details' },
                ['Order_ID', 'Product_ID'],
                { serverSettings: { filters: [{ property: 'Order_ID', value: orderID }] } },
                dataTypes, loaded, true);

            // initialize new OrderDetail (current order)
            $scope.cvDtl.newItemCreator = function () {
                return { Order_ID: $scope.cvOrd.currentItem.Order_ID, };
            }
        }
    }

    // tell scope when tables finish loading
    function loaded() {
        $scope.$apply();
    }

    // create data maps to show related items
    $scope.mapPrd = new wijmo.grid.DataMap($scope.cvPrd, 'Product_ID', 'Product_Name');
    $scope.mapEmp = new wijmo.grid.DataMap($scope.cvEmp, 'Employee_ID', 'Last_Name');
    $scope.mapSup = new wijmo.grid.DataMap($scope.cvSup, 'Supplier_ID', 'Company_Name');
    $scope.mapShp = new wijmo.grid.DataMap($scope.cvShp, 'Shipper_ID', 'Company_Name');

    // initialize new products (new id and current category)
    $scope.cvPrd.newItemCreator = function () {
        return { Category_ID: $scope.cvCat.currentItem.Category_ID };
    }

    // initialize new Order (current customer)
    $scope.cvOrd.newItemCreator = function () {
        return {
            Order_ID: getNewId($scope.cvOrd, 'Order_ID'),
            Customer_ID: $scope.cvCst.currentItem.Customer_ID
        };
    }

    // get new ID for an item by adding one to the maximum ID present in the
    // source (unfiltered) collection
    function getNewId(view, idField) {
        var items = view.sourceCollection;
        return items.length > 0 ? wijmo.getAggregate(wijmo.Aggregate.Max, view.sourceCollection, idField) + 1 : 0;
    }
});