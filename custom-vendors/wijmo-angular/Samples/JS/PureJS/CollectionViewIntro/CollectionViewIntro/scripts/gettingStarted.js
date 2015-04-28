(function () {
    // create collectionview, grid
    var cvGettingStarted = new wijmo.collections.CollectionView(getData(10)),
        gsGrid = new wijmo.grid.FlexGrid('#gsGrid');

    // initialize grid
    gsGrid.initialize({
        itemsSource: cvGettingStarted
    });
})();