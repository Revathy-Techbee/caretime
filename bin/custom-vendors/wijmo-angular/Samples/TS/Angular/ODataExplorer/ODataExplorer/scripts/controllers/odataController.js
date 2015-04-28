var app = angular.module('app', ['wj']);

// odata controller: load OData service tables and expose them as collection views
app.controller('odataController', function odataController($scope) {

    // define data types for specific columns (JSON doesn't handle dates...)
    var dataTypes = [
        { name: /.*Date/, type: wijmo.DataType.Date }
    ];

    // data context
    $scope.ctx = {
        services: new wijmo.collections.CollectionView([
            { name: 'Northwind', url: 'http://services.odata.org/Northwind/Northwind.svc' },
            // TODO: find more JSON-enabled OData sources...
        ]),
        entities: new wijmo.collections.CollectionView(),
        data: null
    };

    // load entity list now and when the selected service changes
    loadEntityList();
    $scope.ctx.services.currentChanged.addHandler(function () {
        loadEntityList();
    });
    function loadEntityList() {

        // clear current list
        $scope.ctx.entities.sourceCollection = [];

        // load new list
        var url = $scope.ctx.services.currentItem.url,
            entityList = new wijmo.data.ODataCollectionView(
                { serviceUrl: url, entityName: '' }, // service url
                null, // keys
                null, // options
                null, // data types
                function () { // callback
                    $scope.ctx.entities.sourceCollection = this.items;
                    $scope.$apply();
                }
            );
    }

    // load data when the selected entity changes
    $scope.ctx.entities.currentChanged.addHandler(loadEntityData);
    $scope.ctx.entities.collectionChanged.addHandler(loadEntityData);
    function loadEntityData() {
        var url = $scope.ctx.services.currentItem.url,
            entityName = $scope.ctx.entities.currentItem;
        $scope.ctx.data = new wijmo.data.ODataCollectionView(
            { serviceUrl: url, entityName: entityName }, // service url
            null, // keys
            { serverSettings: { take: 10 } }, // options
            dataTypes, // data types
            function () { // callback
                $scope.$apply();
            });
        $scope.ctx.data.pageSize = 10;
    }
});