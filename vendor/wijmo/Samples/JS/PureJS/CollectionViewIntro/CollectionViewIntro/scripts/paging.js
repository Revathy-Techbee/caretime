(function () {
    // create collectionview, grid, the navigation buttons' elements
    var cvPaging = new wijmo.collections.CollectionView(getData(55)),
        pagingGrid = new wijmo.grid.FlexGrid('#pagingGrid'),
        btnFirstPage = $('#btnMoveToFirstPage'),
        btnPreviousPage = $('#btnMoveToPreviousPage'),
        btnNextPage = $('#btnMoveToNextPage'),
        btnLastPage = $('#btnMoveToLastPage'),
        btnCurrentPage = $('#btnCurrentPage');

    // initialize grid
    pagingGrid.initialize({
        isReadOnly: true,
        itemsSource: cvPaging
    });

    // initialize the page size with 10.
    cvPaging.pageSize = 10;

    // initialize the input value.
    $('#pagingInput').val(cvPaging.pageSize);

    // init the button status.
    updateNaviagteButtons();

    // update the collectionview's pagesize according to the user's input.
    $('#pagingInput').on('blur', function () {
        var pagesize = $('#pagingInput').val();
        if (!pagesize) {
            pagesize = 0;
        } else {
            pagesize = wijmo.Globalize.parseInt(pagesize);
        }
        cvPaging.pageSize = pagesize;
        updateNaviagteButtons();
    });

    // update the navigation buttons' status
    function updateNaviagteButtons() {
        if (cvPaging.pageSize === 0) {
            $('#naviagtionPage').hide();
            return;
        }

        $('#naviagtionPage').show();

        if (cvPaging.pageIndex === 0) {
            btnFirstPage.attr('disabled', 'disabled');
            btnPreviousPage.attr('disabled', 'disabled');
            btnNextPage.removeAttr('disabled');
            btnLastPage.removeAttr('disabled');
        }
        else if (cvPaging.pageIndex === cvPaging.pageCount - 1) {
            btnFirstPage.removeAttr('disabled');
            btnPreviousPage.removeAttr('disabled');
            btnNextPage.attr('disabled', 'disabled');
            btnLastPage.attr('disabled', 'disabled');
        }
        else {
            btnFirstPage.removeAttr('disabled');
            btnPreviousPage.removeAttr('disabled');
            btnNextPage.removeAttr('disabled');
            btnLastPage.removeAttr('disabled');
        }

        btnCurrentPage.html((cvPaging.pageIndex + 1) + ' / ' + cvPaging.pageCount);
    }

    // commands: moving page.
    btnFirstPage.on('click', function () {
        // move to the first page.
        cvPaging.moveToFirstPage();
        updateNaviagteButtons();
    });

    btnPreviousPage.on('click', function () {
        // move to the previous page.
        cvPaging.moveToPreviousPage();
        updateNaviagteButtons();
    });

    btnNextPage.on('click', function () {
        // move to the next page.
        cvPaging.moveToNextPage();
        updateNaviagteButtons();
    });

    btnLastPage.on('click', function () {
        // move to the last page.
        cvPaging.moveToLastPage();
        updateNaviagteButtons();
    });
})();