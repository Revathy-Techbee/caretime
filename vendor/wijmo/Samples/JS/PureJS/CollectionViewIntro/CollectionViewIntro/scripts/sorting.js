(function () {
    // create collectionview, grid, the jQuery elements, the field name list.
    var cvSorting = new wijmo.collections.CollectionView(getData(10)),
        sortingGrid = new wijmo.grid.FlexGrid('#sortingGrid'),
        sortingFieldNameList = $('#sortingFieldNameList'),
        sortingOrderList = $('#sortingOrderList'),
        sortingNames = getNames();

    // initialize grid
    sortingGrid.initialize({
        isReadOnly: true,
        allowSorting: false,
        itemsSource: cvSorting
    });

    // initialize the list items for field names and orders.
    sortingFieldNameList.append('<option value="" selected="selected">Please choose the field you want to sort by...</option>');
    for (var i = 0; i < sortingNames.length; i++) {
        sortingFieldNameList.append('<option value="' + sortingNames[i] + '">' + sortingNames[i] + '</option>');
    }

    // track the list change in order to udpate the sortDescriptions property.
    sortingFieldNameList.on('change', sortGrid);
    sortingOrderList.on('change', sortGrid);

    function sortGrid() {
        var fieldName = sortingFieldNameList.val(),
            ascending = sortingOrderList.val(),
            sd, sNew;

        if (!fieldName) {
            return;
        }

        ascending = ascending === 'true';
        sd = cvSorting.sortDescriptions;
        sdNew = new wijmo.collections.SortDescription(fieldName, ascending);

        // remove any old sort descriptors and add the new one
        sd.splice(0, sd.length, sdNew);
    }
})();