// application
var app = angular.module('app');

// gridFooterFor directive
//
// <wj-flex-grid grid-footer-for="ownerGridId" ...
//
app.directive('gridFooterFor', function () {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            // get control instance, assert type
            var flex = wijmo.Control.getControl(element[0]);
            flex = wijmo.asType(flex, wijmo.grid.FlexGrid);

            // get master grid that controls this footer grid
            var masterId = attrs['gridFooterFor'];
            var masterHost = document.getElementById(masterId);
            var masterFlex = wijmo.Control.getControl(masterHost);
            wijmo.assert(flex && masterFlex && flex != masterFlex, 'bad parameters');

            // configure footer grid
            flex.isReadOnly = true;
            flex.selectionMode = wijmo.grid.SelectionMode.None;
            flex.headersVisibility = masterFlex.headersVisibility;
            flex.columnHeaders.rows.clear();
            var row = new wijmo.grid.Row();
            row.cssClass = 'wj-footer-grid';
            flex.rows.push(row);

            // remove scrollbars from footer grid
            var root = flex.hostElement.querySelector('[wj-part="root"]');
            root.style.overflow = 'hidden';

            // synchronize columns with master grid
            var extraCol = new wijmo.grid.Column();
            masterFlex.draggedColumn.addHandler(syncCols);
            masterFlex.resizedColumn.addHandler(syncCols);
            masterFlex.columns.collectionChanged.addHandler(syncCols);
            function syncCols() {

                // copy columns/sizes etc
                flex.columnLayout = masterFlex.columnLayout;
                flex.columns.push(extraCol);

                // set content of footer grid
                for (var i = 0; i < masterFlex.columns.length; i++) {
                    var col = masterFlex.columns[i];
                    var data = col.header ? col.header : col.binding;
                    flex.setCellData(0, i, 'f(' + data + ')', false);
                }
            }

            // synchronize scroll position with master grid
            masterFlex.scrollPositionChanged.addHandler(function () {
                flex.scrollPosition = masterFlex.scrollPosition;
            });
        }
    };
});

