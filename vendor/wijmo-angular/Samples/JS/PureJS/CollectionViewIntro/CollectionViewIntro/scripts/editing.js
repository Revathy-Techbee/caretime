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
    }

    // Add the processes for buttons' click
    $('#btnEdit').on('click', function () {
        cvEditing.editItem(cvEditing.currentItem);

        // update the content in the dialog with the current edited item.
        updateDialog(cvEditing.currentEditItem, true);
    });

    $('#btnAdd').on('click', function () {
        cvEditing.addNew();

        // update the content in the dialog with the current added item
        updateDialog(cvEditing.currentAddItem, false);
    });

    $('#btnDelete').on('click', function () {
        var position = cvEditing.currentPosition;
        cvEditing.remove(cvEditing.currentItem);
    });

    // commit editing or adding
    $('#btnCRUDOK').on('click', function () {
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
    $('#btnCRUDCancel').on('click', function () {
        cvEditing.cancelEdit();
        cvEditing.cancelNew();
    });

    // fill the dialog with the item.
    function updateDialog(item, isEdit) {
        $('#edtID').val(item.id !== null && typeof (item.id) !== 'undefined' ? wijmo.Globalize.format(item.id) : '');
        $('#edtStart').val(item.start ? wijmo.Globalize.format(item.start) : '');
        $('#edtEnd').val(item.end ? wijmo.Globalize.format(item.end) : '');
        $('#edtCountry').val(item.country ? item.country : '');
        $('#edtProduct').val(item.product ? item.product : '');
        $('#edtColor').val(item.color ? item.color : '');
        $('#edtAmount').val(item.amount !== null && typeof item.amount !== 'undefined' ? wijmo.Globalize.format(item.amount) : '');
        $('#edtActive').prop('checked', item.active);

        if (isEdit) {
            $('#dlgDetail').find('div.modal-header h4.modal-title').html('Edit Item');
        }
        else {
            $('#dlgDetail').find('div.modal-header h4.modal-title').html('Add Item');
        }
    }

    // get the content from the dialog
    function getUpdatedData() {
        var item = {},
            content = $('#edtID').val();

        if (content) {
            item.id = wijmo.Globalize.parseInt(content);
        }

        content = $('#edtStart').val();
        if (content) {
            item.start = wijmo.Globalize.parseDate(content);
        }

        content = $('#edtEnd').val();
        if (content) {
            item.end = wijmo.Globalize.parseDate(content);
        }

        item.country = $('#edtCountry').val();
        item.product = $('#edtProduct').val();
        item.color = $('#edtColor').val();

        content = $('#edtAmount').val();
        if (content) {
            item.amount = wijmo.Globalize.parseFloat(content);
        }

        item.active = !!$('#edtActive').prop('checked');

        return item;
    }
})();