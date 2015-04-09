﻿(function (wijmo, $, data) {
    'use strict';

    // create a CollectionView to keep track of selection
    var cv = new wijmo.collections.CollectionView(data.getData(100));

    // initialize details pane
    updateDetails();

    // update details when current item changes
    cv.currentChanged.addHandler(function (sender, args) {
        updateDetails();
    });

    // create a grid to show/edit the data
    var grid = new wijmo.grid.FlexGrid('#mdFlexGrid', {
        autoGenerateColumns: false,
        columns: [
            { header: 'Country', binding: 'country', width: '*' },
            { header: 'Date', binding: 'date' }
        ],
        itemsSource: cv
    });

    // update the details when the CollectionView's currentItem changes
    function updateDetails() {
        var item = cv.currentItem;
        $('#mdCurId').text(item.id);
        $('#mdCurCountry').text(item.country);
        $('#mdCurDate').text(wijmo.Globalize.format(item.date, 'd'));
        $('#mdCurRevenue').text(wijmo.Globalize.format(item.amount, 'c'));
        $('#mdCurActive').text(item.active);
    }
})(wijmo, jQuery, appData);