(function () {
    // create collectionview, grid
    var cvEditing = new wijmo.collections.CollectionView(getData(10)),
        editingGrid = new wijmo.grid.FlexGrid('#editingGrid');

    // initialize grid
    editingGrid.initialize({
        selectionMode: wijmo.grid.SelectionMode.Row,
        itemsSource: cvEditing
    });

    // track the collection changes so that updating the grid.
    cvEditing.trackChanges = true;

    // define the new item value.
    cvEditing.newItemCreator = function () {
        var item = getData(1)[0];

        // aggregate the max value of id in the collection.
        item.id = wijmo.getAggregate(wijmo.Aggregate.Max, cvEditing.sourceCollection, 'id') + 1;
        return item;
    };

    // Add the processes for buttons' click
    document.getElementById('btnEdit').addEventListener('click', function () {
        cvEditing.editItem(cvEditing.currentItem);

        // update the content in the dialog with the current edited item.
        updateDialog(cvEditing.currentEditItem, true);
    });

    document.getElementById('btnAdd').addEventListener('click', function () {
        var newItem = cvEditing.addNew();

        // update the content in the dialog with the current added item
        updateDialog(newItem, false);
    });

    document.getElementById('btnDelete').addEventListener('click', function () {
        var position = cvEditing.currentPosition;
        cvEditing.remove(cvEditing.currentItem);
    });

    // commit editing or adding
    document.getElementById('btnCRUDOK').addEventListener('click', function () {
        // update the editing/adding item with the returned data from dialog.
        var updatedItem = getUpdatedData(),
            cItem = cvEditing.currentEditItem,
            names = getNames();

        if (!cItem) {
            cItem = cvEditing.currentAddItem;
        }
        if (!cItem) {
            return;
        }
        for (var i = 0; i < names.length; i++) {
            var fName = names[i];
            cItem[fName] = updatedItem[fName];
        }

        // commit editing/adding
        cvEditing.commitEdit();
        cvEditing.commitNew();
    });

    // cancel editing or adding
    document.getElementById('btnCRUDCancel').addEventListener('click', function () {
        cvEditing.cancelEdit();
        cvEditing.cancelNew();
    });

    // fill the dialog with the item.
    function updateDialog(item, isEdit) {
        document.getElementById('edtID').value = item.id !== null && typeof (item.id) != 'undefined' ? wijmo.Globalize.format(item.id) : '';
        document.getElementById('edtStart').value = item.start ? wijmo.Globalize.format(item.start) : '';
        document.getElementById('edtEnd').value = item.end ? wijmo.Globalize.format(item.end) : '';
        document.getElementById('edtCountry').value = item.country ? item.country : '';
        document.getElementById('edtProduct').value = item.product ? item.product : '';
        document.getElementById('edtColor').value = item.color ? item.color : '';
        document.getElementById('edtAmount').value = item.amount !== null && typeof item.amount != 'undefined' ? wijmo.Globalize.format(item.amount) : '';
        document.getElementById('edtActive').checked = item.active;

        var title = document.getElementById('dlgDetail').querySelector('div.modal-header h4.modal-title');
        title.innerHTML = isEdit ? 'Edit Item' : 'Add Item';
    }

    // get the content from the dialog
    function getUpdatedData() {
        var item = {},
            content = document.getElementById('edtID').value;

        if (content) {
            item.id = wijmo.Globalize.parseInt(content);
        }

        content = document.getElementById('edtStart').value;
        if (content) {
            item.start = wijmo.Globalize.parseDate(content);
        }

        content = document.getElementById('edtEnd').value;
        if (content) {
            item.end = wijmo.Globalize.parseDate(content);
        }

        item.country = document.getElementById('edtCountry').value;
        item.product = document.getElementById('edtProduct').value;
        item.color = document.getElementById('edtColor').value;

        content = document.getElementById('edtAmount').value;
        if (content) {
            item.amount = wijmo.Globalize.parseFloat(content);
        }

        item.active = document.getElementById('edtActive').checked;

        return item;
    }
})();