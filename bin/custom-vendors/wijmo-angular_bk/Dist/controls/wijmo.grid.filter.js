/*
    *
    * Wijmo Library 5.20143.32
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    * 
    * Licensed under the Wijmo Commercial License. 
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */
var wijmo;
(function (wijmo) {
    (function (_grid) {
        /**
        * Defines the @see:FlexGridFilter and associated classes.
        *
        * The @see:FlexGridFilter class is an extension that adds column
        * filtering to @see:FlexGrid controls.
        *
        * This extension depends on the <b>wijmo.grid</b> and <b>wijmo.input</b>
        * modules.
        */
        (function (filter) {
            'use strict';

            /**
            * Implements an Excel-style filter for @see:FlexGrid controls.
            *
            * To enable filtering on a @see:FlexGrid control, create an instance
            * of the @see:FlexGridFilter and pass the grid as a parameter to the
            * constructor. For example:
            *
            * <pre>
            * // create FlexGrid
            * var flex = new wijmo.grid.FlexGrid('#gridElement');
            * // enable filtering on the FlexGrid
            * var filter = new wijmo.grid.FlexGridFilter(flex);
            * </pre>
            *
            * Once this is done, a filter icon is added to the grid's column headers.
            * Clicking the icon shows an editor where the user can edit the filter
            * conditions for that column.
            *
            * The @see:FlexGridFilter class depends on the <b>wijmo.grid</b> and
            * <b>wijmo.input</b> modules.
            */
            var FlexGridFilter = (function () {
                /**
                * Initializes a new instance of the @see:FlexGridFilter.
                *
                * @param grid The @see:FlexGrid to filter.
                */
                function FlexGridFilter(grid) {
                    this._showIcons = true;
                    /**
                    * Occurs after the filter is applied.
                    */
                    this.filterApplied = new wijmo.Event();
                    // check dependencies
                    var depErr = 'Missing dependency: FlexGridFilter requires ';
                    wijmo.assert(wijmo.grid.FlexGrid != null, depErr + 'wijmo.grid.');
                    wijmo.assert(wijmo.input.ComboBox != null, depErr + 'wijmo.input.');

                    // initialize filter
                    this._filters = [];
                    this._grid = wijmo.asType(grid, _grid.FlexGrid, false);
                    this._grid.formatItem.addHandler(this._formatItem.bind(this));
                    this._grid.itemsSourceChanged.addHandler(this.clear.bind(this));
                    this._grid.hostElement.addEventListener('mousedown', this._mouseDown.bind(this), true);

                    // initialize event handlers
                    this._ehBoundsChanged = this._boundsChanged.bind(this);
                    this._ehWheel = this._wheel.bind(this);

                    // initialize column filters
                    this._grid.invalidate();
                }
                Object.defineProperty(FlexGridFilter.prototype, "showFilterIcons", {
                    /**
                    * Gets or sets a value indicating whether the @see:FlexGridFilter adds filter
                    * editing buttons to the grid's column headers.
                    */
                    get: function () {
                        return this._showIcons;
                    },
                    set: function (value) {
                        this._showIcons = wijmo.asBoolean(value);
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FlexGridFilter.prototype, "filterColumns", {
                    /**
                    * Gets or sets an array containing the names or bindings of the columns
                    * that have filters.
                    *
                    * Setting this property to null or to an empty array adds filters to all
                    * columns.
                    */
                    get: function () {
                        return this._filterColumns;
                    },
                    set: function (value) {
                        this._filterColumns = wijmo.asArray(value);
                        this.clear();
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Gets the filter for the given column.
                *
                * @param col The @see:Column that the filter applies to.
                * @param create The value indicating whether to create the filter if it does not exist.
                */
                FlexGridFilter.prototype.getColumnFilter = function (col, create) {
                    if (typeof create === "undefined") { create = true; }
                    for (var i = 0; i < this._filters.length; i++) {
                        if (this._filters[i].column == col) {
                            return this._filters[i];
                        }
                    }

                    // not found, create one now
                    if (create) {
                        var cf = new filter.ColumnFilter(col);
                        this._filters.push(cf);
                        return cf;
                    }

                    // not found, not created
                    return null;
                };

                /**
                * Shows the filter editor for the given grid column.
                *
                * @param col The @see:Column that contains the filter to edit.
                */
                FlexGridFilter.prototype.editColumnFilter = function (col) {
                    // remove current editor
                    this.closeEditor();

                    // get column by name of by reference
                    col = wijmo.isString(col) ? this._grid.columns.getColumn(col) : wijmo.asType(col, _grid.Column, false);

                    // get the header cell to position editor
                    var ch = this._grid.columnHeaders, rc = ch.getCellBoundingRect(ch.rows.length - 1, col.index);

                    // get the filter and the editor
                    var div = document.createElement('div'), flt = this.getColumnFilter(col, true), edt = new filter.ColumnFilterEditor(div, flt);
                    wijmo.setCss(div, {
                        position: 'fixed',
                        zIndex: 100,
                        left: rc.left,
                        top: rc.bottom
                    });
                    wijmo.addClass(div, 'wj-dropdown-panel');

                    // close editor when buttons are clicked or when it loses focus
                    var self = this;
                    edt.filterChanged.addHandler(function () {
                        self.closeEditor();
                        self.apply();
                    });

                    // subscribe with useCapture = true, to emulate focusout that is not supported in FireFox
                    div.addEventListener('blur', function () {
                        setTimeout(function () {
                            if (!edt.containsFocus()) {
                                self.closeEditor();
                            }
                        }, 0);
                    }, true);

                    // close editor when window is resized or scrolls, and
                    // when the user moves the wheel
                    window.addEventListener('resize', this._ehBoundsChanged);
                    window.addEventListener('scroll', this._ehBoundsChanged);
                    window.addEventListener('wheel', this._ehWheel.bind);

                    // show editor and give it focus
                    var host = document.body;
                    host.appendChild(div);
                    div.tabIndex = -1;
                    div.focus();

                    // save reference to editor
                    this._divEdt = div;
                    this._edtCol = col;
                };

                /**
                * Closes the filter editor.
                */
                FlexGridFilter.prototype.closeEditor = function () {
                    if (this._divEdt) {
                        // remove event listeners
                        window.removeEventListener('resize', this._ehBoundsChanged);
                        window.removeEventListener('scroll', this._ehBoundsChanged);
                        window.removeEventListener('wheel', this._ehWheel.bind);

                        // remove editor
                        this._divEdt.parentElement.removeChild(this._divEdt);
                        this._divEdt = null;
                        this._edtCol = null;
                    }
                };

                /**
                * Applies the current column filters to the grid.
                */
                FlexGridFilter.prototype.apply = function () {
                    var cv = this._grid.collectionView;
                    if (cv) {
                        if (cv.filter) {
                            cv.refresh();
                        } else {
                            cv.filter = this._filter.bind(this);
                        }
                    }
                    this.onFilterApplied();
                };

                /**
                * Clears all column filters.
                */
                FlexGridFilter.prototype.clear = function () {
                    this._filters = [];
                    this.apply();
                };

                /**
                * Raises the @see:filterApplied event.
                */
                FlexGridFilter.prototype.onFilterApplied = function () {
                    this.filterApplied.raise(this);
                };

                // predicate function used to filter the CollectionView
                FlexGridFilter.prototype._filter = function (item) {
                    for (var i = 0; i < this._filters.length; i++) {
                        if (!this._filters[i].apply(item)) {
                            return false;
                        }
                    }
                    return true;
                };

                // handle the formatItem event to add filter icons to the column header cells
                FlexGridFilter.prototype._formatItem = function (sender, e) {
                    // check that this is a filter cell
                    if (this._showIcons && e.panel.cellType == 2 /* ColumnHeader */ && e.row == this._grid.columnHeaders.rows.length - 1) {
                        // check that this column should have a filter
                        var col = this._grid.columns[e.col];
                        if (!this._filterColumns || this._filterColumns.indexOf(col.binding) > -1) {
                            // show filter glyph for this column
                            var cf = this.getColumnFilter(col, true);
                            var op = cf.isActive ? .85 : .25;
                            var filterGlyph = '<div ' + FlexGridFilter._WJA_FILTER + ' style ="float:right;cursor:pointer;opacity:' + op + '">' + '<span class="wj-glyph-check"></span>' + '</div>';
                            e.cell.innerHTML += filterGlyph;
                        }
                    }
                };

                // handle mouse down to show/hide the filter editor
                FlexGridFilter.prototype._mouseDown = function (e) {
                    if (this._hasAttribute(e.target, FlexGridFilter._WJA_FILTER)) {
                        var ht = this._grid.hitTest(e);
                        if (ht.gridPanel == this._grid.columnHeaders) {
                            var col = this._grid.columns[ht.col];
                            if (this._divEdt && this._edtCol == col) {
                                this.closeEditor();
                            } else {
                                this.editColumnFilter(col);
                            }
                            e.stopPropagation();
                            e.preventDefault();
                        }
                    }
                };

                // checks whether an element or any of its ancestors contains an attribute
                FlexGridFilter.prototype._hasAttribute = function (e, att) {
                    for (; e; e = e.parentNode) {
                        if (e.getAttribute && e.getAttribute(att) != null)
                            return true;
                    }
                    return false;
                };

                // updates a position of the filter dialog on the screen
                FlexGridFilter.prototype._updatePosition = function () {
                    var ch = this._grid.columnHeaders, rc = ch.getCellBoundingRect(ch.rows.length - 1, this._edtCol.index);
                    wijmo.setCss(this._divEdt, {
                        left: rc.left,
                        top: rc.bottom
                    });
                };

                // close the editor when control bounds change
                // (window resized, scrolling, etc)
                FlexGridFilter.prototype._boundsChanged = function (e) {
                    // We can't close on scroll, because Chrome scrolls by itself to fit a focused element on the screen.
                    // As a result the filter dialog can be closed immediately after opening, or later after drop-down calendar
                    // was opened.
                    if (e.type == 'scroll') {
                        this._updatePosition();
                        return;
                    }

                    this.closeEditor();
                };

                // close the editor when user moves the mouse wheel on
                // any other controls
                FlexGridFilter.prototype._wheel = function (e) {
                    if (this._divEdt && !wijmo.contains(this._divEdt, e.target)) {
                        this.closeEditor();
                    }
                };
                FlexGridFilter._WJA_FILTER = 'wj-filter';
                return FlexGridFilter;
            })();
            filter.FlexGridFilter = FlexGridFilter;
        })(_grid.filter || (_grid.filter = {}));
        var filter = _grid.filter;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=FlexGridFilter.js.map

var wijmo;
(function (wijmo) {
    (function (grid) {
        (function (filter) {
            'use strict';

            /**
            * Defines a filter for a column on a @see:FlexGrid control.
            *
            * Column filters contain two conditions that may be combined
            * using an 'and' or an 'or' operator.
            *
            * This class is used by the @see:FlexGridFilter class; you
            * rarely use it directly.
            */
            var ColumnFilter = (function () {
                /**
                * Initializes a new instance of a @see:ColumnFilter.
                *
                * @param column The column to filter.
                */
                function ColumnFilter(column) {
                    this._c1 = new filter.FilterCondition();
                    this._c2 = new filter.FilterCondition();
                    this._and = true;
                    this._col = column;
                }
                Object.defineProperty(ColumnFilter.prototype, "column", {
                    /**
                    * Gets the @see:Column to filter.
                    */
                    get: function () {
                        return this._col;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ColumnFilter.prototype, "condition1", {
                    /**
                    * Gets the first condition in the filter.
                    */
                    get: function () {
                        return this._c1;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ColumnFilter.prototype, "condition2", {
                    /**
                    * Gets the second condition in the filter.
                    */
                    get: function () {
                        return this._c2;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ColumnFilter.prototype, "and", {
                    /**
                    * Gets a value indicating whether to combine the two conditions
                    * with an AND or an OR operator.
                    */
                    get: function () {
                        return this._and;
                    },
                    set: function (value) {
                        this._and = wijmo.asBoolean(value);
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ColumnFilter.prototype, "isActive", {
                    /**
                    * Gets a value indicating whether the filter is active.
                    *
                    * The filter is active if at least one of the two conditions
                    * has its operator set to a non-null value.
                    */
                    get: function () {
                        return this._c1._op != null || this._c2._op != null;
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Returns a value indicating whether the given value passes this @see:Filter.
                *
                * @param value The value to test.
                */
                ColumnFilter.prototype.apply = function (value) {
                    var col = this.column, c1 = this.condition1, c2 = this.condition2;

                    // no binding? accept everything
                    if (!col.binding) {
                        return true;
                    }

                    // retrieve the value
                    value = value[col.binding];
                    if (col.dataMap) {
                        value = col.dataMap.getDisplayValue(value);
                    } else if (wijmo.isDate(value)) {
                        if (wijmo.isString(c1.value) || wijmo.isString(c2.value)) {
                            value = wijmo.Globalize.format(value, col.format);
                        }
                    } else if (wijmo.isBoolean(value)) {
                        value = value.toString();
                    }

                    // apply conditions
                    var rv1 = c1.apply(value), rv2 = c2.apply(value);

                    // combine results
                    if (c1.operator != null && c2.operator != null) {
                        return this._and ? rv1 && rv2 : rv1 || rv2;
                    } else {
                        return c1.operator != null ? rv1 : c2.operator != null ? rv2 : true;
                    }
                };
                return ColumnFilter;
            })();
            filter.ColumnFilter = ColumnFilter;
        })(grid.filter || (grid.filter = {}));
        var filter = grid.filter;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=ColumnFilter.js.map

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var wijmo;
(function (wijmo) {
    (function (grid) {
        (function (_filter) {
            'use strict';

            // initialize groupHeaderFormat
            wijmo.culture.FlexGridFilter = {
                header: 'Show items where the value',
                and: 'And',
                or: 'Or',
                apply: 'Apply',
                clear: 'Clear',
                stringOperators: [
                    { name: '(not set)', op: null },
                    { name: 'Equals', op: 0 /* EQ */ },
                    { name: 'Does not equal', op: 1 /* NE */ },
                    { name: 'Begins with', op: 6 /* BW */ },
                    { name: 'Ends with', op: 7 /* EW */ },
                    { name: 'Contains', op: 8 /* CT */ },
                    { name: 'Does not contain', op: 9 /* NC */ }
                ],
                numberOperators: [
                    { name: '(not set)', op: null },
                    { name: 'Equals', op: 0 /* EQ */ },
                    { name: 'Does not equal', op: 1 /* NE */ },
                    { name: 'Is Greater than', op: 2 /* GT */ },
                    { name: 'Is Greater than or equal to', op: 3 /* GE */ },
                    { name: 'Is Less than', op: 4 /* LT */ },
                    { name: 'Is Less than or equal to', op: 5 /* LE */ }
                ],
                dateOperators: [
                    { name: '(not set)', op: null },
                    { name: 'Equals', op: 0 /* EQ */ },
                    { name: 'Is Before', op: 4 /* LT */ },
                    { name: 'Is After', op: 2 /* GT */ }
                ],
                booleanOperators: [
                    { name: '(not set)', op: null },
                    { name: 'Equals', op: 0 /* EQ */ },
                    { name: 'Does not equal', op: 1 /* NE */ }
                ]
            };

            /**
            * The editor used to inspect and modify @see:ColumnFilter objects.
            *
            * This class is used by the @see:FlexGridFilter class; you
            * rarely use it directly.
            */
            var ColumnFilterEditor = (function (_super) {
                __extends(ColumnFilterEditor, _super);
                /**
                * Initializes a new instance of the @see:ColumnFilterEditor.
                *
                * @param element The DOM element that hosts the control, or a selector
                * for the host element (e.g. '#theCtrl').
                * @param filter The @see:ColumnFilter to edit.
                */
                function ColumnFilterEditor(element, filter) {
                    _super.call(this, element);
                    /**
                    * Occurs after the filter is modified.
                    */
                    this.filterChanged = new wijmo.Event();

                    // save reference to filter
                    this._filter = wijmo.asType(filter, _filter.ColumnFilter, false);

                    // instantiate and apply template
                    var tpl = this.getTemplate();
                    this.applyTemplate('wj-control wj-columnfiltereditor wj-content', tpl, {
                        _divHdr: 'div-hdr',
                        _divCmb1: 'div-cmb1',
                        _divVal1: 'div-val1',
                        _btnAnd: 'btn-and',
                        _btnOr: 'btn-or',
                        _spAnd: 'sp-and',
                        _spOr: 'sp-or',
                        _divCmb2: 'div-cmb2',
                        _divVal2: 'div-val2',
                        _btnApply: 'btn-apply',
                        _btnClear: 'btn-clear'
                    });

                    // localization
                    this._divHdr.textContent = wijmo.culture.FlexGridFilter.header;
                    this._spAnd.textContent = wijmo.culture.FlexGridFilter.and;
                    this._spOr.textContent = wijmo.culture.FlexGridFilter.or;
                    this._btnApply.textContent = wijmo.culture.FlexGridFilter.apply;
                    this._btnClear.textContent = wijmo.culture.FlexGridFilter.clear;

                    // create combos and value editors
                    this._cmb1 = this._createOperatorCombo(this._divCmb1);
                    this._cmb2 = this._createOperatorCombo(this._divCmb2);
                    this._val1 = this._createValueInput(this._divVal1);
                    this._val2 = this._createValueInput(this._divVal2);

                    // add event listeners
                    this._btnAnd.addEventListener('change', this._btnAndOrChanged.bind(this));
                    this._btnOr.addEventListener('change', this._btnAndOrChanged.bind(this));
                    this._btnApply.addEventListener('click', this._btnApplyClearClicked.bind(this));
                    this._btnClear.addEventListener('click', this._btnApplyClearClicked.bind(this));

                    // initialize all values
                    this._updateUIFromFilter();
                }
                Object.defineProperty(ColumnFilterEditor.prototype, "filter", {
                    /**
                    * Gets a reference to the @see:ColumnFilter being edited.
                    */
                    get: function () {
                        return this._filter;
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Raises the @see:filterChanged event.
                */
                ColumnFilterEditor.prototype.onFilterChanged = function (e) {
                    this.filterChanged.raise(this, e);
                };

                // update UI from filter
                ColumnFilterEditor.prototype._updateUIFromFilter = function () {
                    // initialize conditions
                    var c1 = this._filter.condition1, c2 = this._filter.condition2;
                    this._cmb1.selectedValue = c1.operator;
                    this._cmb2.selectedValue = c2.operator;
                    if (this._val1 instanceof wijmo.input.ComboBox) {
                        this._val1.text = c1.value;
                        this._val2.text = c2.value;
                    } else {
                        this._val1.value = c1.value;
                        this._val2.value = c2.value;
                    }

                    // initialize and/or buttons
                    this._btnAnd.checked = this._filter.and;
                    this._btnOr.checked = !this._filter.and;
                };

                // update filter from UI
                ColumnFilterEditor.prototype._updateFilterFromUI = function () {
                    // initialize conditions
                    var c1 = this._filter.condition1, c2 = this._filter.condition2;
                    c1.operator = this._cmb1.selectedValue;
                    c2.operator = this._cmb2.selectedValue;
                    if (this._val1 instanceof wijmo.input.ComboBox) {
                        c1.value = this._val1.text;
                        c2.value = this._val2.text;
                    } else {
                        c1.value = this._val1.value;
                        c2.value = this._val2.value;
                    }

                    // initialize and/or operator
                    this._filter.and = this._btnAnd.checked;
                };

                // create operator combo
                ColumnFilterEditor.prototype._createOperatorCombo = function (element) {
                    // get operator list based on column data type
                    var col = this._filter.column, list = wijmo.culture.FlexGridFilter.stringOperators;
                    if (col.dataType == 4 /* Date */ && !this._isTimeFormat(col.format)) {
                        list = wijmo.culture.FlexGridFilter.dateOperators;
                    } else if (col.dataType == 2 /* Number */ && !col.dataMap) {
                        list = wijmo.culture.FlexGridFilter.numberOperators;
                    } else if (col.dataType == 3 /* Boolean */ && !col.dataMap) {
                        list = wijmo.culture.FlexGridFilter.booleanOperators;
                    }

                    // create and initialize the combo
                    var cmb = new wijmo.input.ComboBox(element);
                    cmb.itemsSource = list;
                    cmb.displayMemberPath = 'name';
                    cmb.selectedValuePath = 'op';

                    // return combo
                    return cmb;
                };

                // create operator input
                ColumnFilterEditor.prototype._createValueInput = function (element) {
                    var col = this._filter.column, ctl = null;
                    if (col.dataType == 4 /* Date */ && !this._isTimeFormat(col.format)) {
                        ctl = new wijmo.input.InputDate(element);
                        ctl.format = col.format;
                    } else if (col.dataType == 2 /* Number */ && !col.dataMap) {
                        ctl = new wijmo.input.InputNumber(element);
                        ctl.format = col.format;
                    } else {
                        ctl = new wijmo.input.ComboBox(element);
                        if (col.dataMap) {
                            ctl.itemsSource = col.dataMap.getDisplayValues();
                            ctl.isEditable = true;
                        } else if (col.dataType == 3 /* Boolean */) {
                            ctl.itemsSource = ['true', 'false'];
                        }
                    }
                    ctl.required = false;
                    return ctl;
                };

                // checks whether a format represents a time (and not just a date)
                ColumnFilterEditor.prototype._isTimeFormat = function (fmt) {
                    if (!fmt)
                        return false;
                    fmt = wijmo.culture.Globalize.calendar.patterns[fmt] || fmt;
                    return /[hmst]+/i.test(fmt);
                };

                // update and/or buttons
                ColumnFilterEditor.prototype._btnAndOrChanged = function (e) {
                    this._btnAnd.checked = e.target == this._btnAnd;
                    this._btnOr.checked = e.target == this._btnOr;
                };

                // handle apply/clear buttons
                ColumnFilterEditor.prototype._btnApplyClearClicked = function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // apply or clear filter
                    if (e.target == this._btnApply) {
                        this._updateFilterFromUI();
                    } else if (e.target == this._btnClear) {
                        this._filter.condition1.operator = null;
                        this._filter.condition2.operator = null;
                        this._filter.and = true;
                        this._filter.condition1.value = null;
                        this._filter.condition2.value = null;
                    }

                    // show current filter state
                    this._updateUIFromFilter();

                    // raise event so caller can apply the new filter
                    this.onFilterChanged();
                };
                ColumnFilterEditor.controlTemplate = '<div style="padding:6px">' + '<div wj-part="div-hdr"></div>' + '<div wj-part="div-cmb1"></div><br/>' + '<div wj-part="div-val1"></div><br/>' + '<div>' + '<label><input wj-part="btn-and" type="radio"> <span wj-part="sp-and">And</span> </label>&nbsp;&nbsp;&nbsp;' + '<label><input wj-part="btn-or" type="radio"> <span wj-part="sp-or">Or</span> </label>' + '</div>' + '<div wj-part="div-cmb2"></div><br/>' + '<div wj-part="div-val2"></div><br/>' + '<div style="cursor:pointer;text-align:right;margin-top:6px">' + '<a wj-part="btn-apply" href="">Apply</a>&nbsp;&nbsp;&nbsp;' + '<a wj-part="btn-clear" href="">Clear</a>' + '</div>';
                return ColumnFilterEditor;
            })(wijmo.Control);
            _filter.ColumnFilterEditor = ColumnFilterEditor;
        })(grid.filter || (grid.filter = {}));
        var filter = grid.filter;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=ColumnFilterEditor.js.map

var wijmo;
(function (wijmo) {
    (function (grid) {
        (function (filter) {
            'use strict';

            /**
            * Defines a filter condition.
            *
            * This class is used by the @see:FlexGridFilter class; you
            * rarely use it directly.
            */
            var FilterCondition = (function () {
                function FilterCondition() {
                    this._op = null;
                }
                Object.defineProperty(FilterCondition.prototype, "operator", {
                    /**
                    * Gets or sets the operator used by this @see:Condition.
                    */
                    get: function () {
                        return this._op;
                    },
                    set: function (value) {
                        this._op = wijmo.asEnum(value, Operator, true);
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FilterCondition.prototype, "value", {
                    /**
                    * Gets or sets the value used by this @see:Condition.
                    */
                    get: function () {
                        return this._val;
                    },
                    set: function (value) {
                        this._val = value;
                        this._strVal = wijmo.isString(value) ? value.toString().toLowerCase() : null;
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Returns a value that determines whether the given value passes this @see:Condition.
                *
                * @param value The value to test.
                */
                FilterCondition.prototype.apply = function (value) {
                    // use lower-case strings for all operations
                    var val = this._strVal || this._val;
                    if (wijmo.isString(value)) {
                        value = value.toLowerCase();
                    }

                    switch (this._op) {
                        case null:
                            return true;
                        case 0 /* EQ */:
                            return wijmo.isDate(value) && wijmo.isDate(val) ? wijmo.DateTime.sameDate(value, val) : value == val;
                        case 1 /* NE */:
                            return value != val;
                        case 2 /* GT */:
                            return value > val;
                        case 3 /* GE */:
                            return value >= val;
                        case 4 /* LT */:
                            return value < val;
                        case 5 /* LE */:
                            return value <= val;
                        case 6 /* BW */:
                            return this._strVal && wijmo.isString(value) ? value.indexOf(this._strVal) == 0 : false;
                        case 7 /* EW */:
                            return this._strVal && wijmo.isString(value) && value.length >= this._strVal.length ? value.substr(value.length - this._strVal.length) == val : false;
                        case 8 /* CT */:
                            return this._strVal && wijmo.isString(value) ? value.indexOf(this._strVal) > -1 : false;
                        case 9 /* NC */:
                            return this._strVal && wijmo.isString(value) ? value.indexOf(this._strVal) < 0 : false;
                    }
                    throw 'Unknown operator';
                };
                return FilterCondition;
            })();
            filter.FilterCondition = FilterCondition;

            /**
            * Specifies filter condition operators.
            */
            (function (Operator) {
                /** Equals. */
                Operator[Operator["EQ"] = 0] = "EQ";

                /** Does not equal. */
                Operator[Operator["NE"] = 1] = "NE";

                /** Greater than. */
                Operator[Operator["GT"] = 2] = "GT";

                /** Greater than or equal to. */
                Operator[Operator["GE"] = 3] = "GE";

                /** Less than. */
                Operator[Operator["LT"] = 4] = "LT";

                /** Less than or equal to. */
                Operator[Operator["LE"] = 5] = "LE";

                /** Begins with. */
                Operator[Operator["BW"] = 6] = "BW";

                /** Ends with. */
                Operator[Operator["EW"] = 7] = "EW";

                /** Contains. */
                Operator[Operator["CT"] = 8] = "CT";

                /** Does not contain. */
                Operator[Operator["NC"] = 9] = "NC";
            })(filter.Operator || (filter.Operator = {}));
            var Operator = filter.Operator;
        })(grid.filter || (grid.filter = {}));
        var filter = grid.filter;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=FilterCondition.js.map

