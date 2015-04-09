(function (wijmo, $, data) {
    'use strict';

    // create grid, some data
    var grid = new wijmo.grid.FlexGrid('#fFlexGrid'),
        cv = new wijmo.collections.CollectionView(data.getData(100)),
        filterText = '';

    // populate the grid with data
    grid.itemsSource = cv;

    // update grid when filter changes
    $('#fFilter').on('keyup', function () {
        filterText = $(this).val().toLowerCase();
        cv.refresh();
    });

    // CollectionView filter
    cv.filter = function (item) {
        if (filterText) {
            return item.country.toLowerCase().indexOf(filterText) > -1;
        } else {
            return true;
        }
    };
})(wijmo, jQuery, appData);