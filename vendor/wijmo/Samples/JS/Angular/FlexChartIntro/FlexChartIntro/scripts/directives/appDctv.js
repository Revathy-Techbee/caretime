﻿'use strict';

var app = angular.module('app');

// call scope.$apply if needed (to avoid '$digest already in progress' warning)
// http://stackoverflow.com/questions/12729122/prevent-error-digest-already-in-progress-when-calling-scope-apply
function safeApply(scope, name, value) {
    if (typeof (scope[name]) !== 'undefined' && scope[name] !== value) {
        scope[name] = value;
        if (!scope.$$phase && !scope.$root.$$phase) {
            scope.$apply(name);
        }
    }
}

// InputDate directive
app.directive('appInputDate', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            control: '=',
            value: '=',
            min: '=',
            max: '=',
            format: '='
        },
        template: '<div/>',
        link: function (scope, element, attrs) {

            // create InputDate control
            var control = new wijmo.input.InputDate(element[0]);
            safeApply(scope, 'control', control);

            // get/set value
            scope.$watch('value', function () {
                if (scope.value != null) {
                    control.value = parseDate(scope.value);
                }
            });
            control.valueChanged.addHandler(function () {
                safeApply(scope, 'value', control.value);
            });

            // set min/max/format
            scope.$watch('min', function () {
                if (scope.min != null) {
                    control.min = parseDate(scope.min);
                }
            });
            scope.$watch('max', function () {
                if (scope.max != null) {
                    control.max = parseDate(scope.max);
                }
            });
            scope.$watch('format', function () {
                if (scope.format != null) {
                    control.format = scope.format;
                }
            });
        }
    }
    function parseDate(value) {
        if (wijmo.isString(value)) {
            var parts = value.split('-');
            if (parts.length == 3) {
                return new Date(parts[0], parts[1] - 1, parts[2]);
            }
            return new Date(value);
        }
        return value;
    }
});

// InputTime directive
app.directive('appInputTime', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            control: '=',
            value: '=',
            min: '=',
            max: '=',
            step: '=',
            format: '='
        },
        template: '<div/>',
        link: function (scope, element, attrs) {

            // create InputTime control
            var control = new wijmo.input.InputTime(element[0]);
            safeApply(scope, 'control', control);

            // get/set value
            scope.$watch('value', function () {
                if (scope.value != null) {
                    control.value = parseDate(scope.value);
                }
            });
            control.valueChanged.addHandler(function () {
                safeApply(scope, 'value', control.value);
            });

            // set min/max/step/format
            scope.$watch('min', function () {
                if (scope.min != null) {
                    control.min = parseDate(scope.min);
                }
            });
            scope.$watch('max', function () {
                if (scope.max != null) {
                    control.max = parseDate(scope.max);
                }
            });
            scope.$watch('step', function () {
                if (scope.step != null) {
                    control.step = scope.step;
                }
            });
            scope.$watch('format', function () {
                if (scope.format != null) {
                    control.format = scope.format;
                }
            });
        }
    }
    function parseDate(value) {
        if (wijmo.isString(value)) {
            var parts = value.split('-');
            if (parts.length == 3) {
                return new Date(parts[0], parts[1] - 1, parts[2]);
            }
            parts = value.split(':');
            if (parts.length == 2) {
                return new Date(0, 0, 0, parts[0] * 1, parts[1] * 1);
            }
            var pos = value.indexOf('GMT');
            if (pos > -1) {
                value = value.substr(0, pos);
            }
            return new Date(value);
        }
        return value;
    }
});

// InputNumber directive
app.directive('appInputNumber', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            control: '=',
            value: '=',
            min: '=',
            max: '=',
            step: '=',
            format: '=',
            placeholder: '='
        },
        template: '<div/>',
        link: function (scope, element, attrs) {

            // create InputNumber control
            var control = new wijmo.input.InputNumber(element[0]);
            safeApply(scope, 'control', control);

            // get/set value
            scope.$watch('value', function () {
                if (scope.value != null) {
                    control.value = scope.value;
                }
            });
            control.valueChanged.addHandler(function () {
                safeApply(scope, 'value', control.value);
            });

            // set min/max/step/format
            scope.$watch('min', function () {
                if (scope.min != null) {
                    control.min = scope.min;
                }
            });
            scope.$watch('max', function () {
                if (scope.max != null) {
                    control.max = scope.max;
                }
            });
            scope.$watch('step', function () {
                if (scope.step != null) {
                    control.step = scope.step;
                }
            });
            scope.$watch('format', function () {
                if (scope.format != null) {
                    control.format = scope.format;
                }
            });
            scope.$watch('placeholder', function () {
                if (scope.placeholder != null) {
                    control.placeholder = scope.placeholder;
                }
            });
        }
    }
});

// ComboBox directive
app.directive('appCombobox', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            control: '=',
            text: '=',
            itemsSource: '=',
            showDropDownButton: '=',
            displayMemberPath: '=',
            selectedValuePath: '=',
            selectedIndex: '=',
            selectedValue: '=',
            isEditable: '=',
            placeholder: '=',
            isContentHtml: '='
        },
        template: '<div/>',
        link: function (scope, element, attrs) {

            // create combo
            var control = new wijmo.input.ComboBox(element[0]);
            safeApply(scope, 'control', control);
            if (scope.itemsSource != null) {
                control.itemsSource = scope.itemsSource;
            }

            // notify of text/value changes
            control.textChanged.addHandler(function () {
                safeApply(scope, 'text', control.text);
                safeApply(scope, 'selectedIndex', control.selectedIndex);
                safeApply(scope, 'selectedValue', control.selectedValue);
            });

            // apply text
            scope.$watch('text', function () {
                if (scope.text != null) {
                    control.text = scope.text;
                }
            });

            // apply placeholder
            scope.$watch('placeholder', function () {
                if (scope.placeholder != null) {
                    control.placeholder = scope.placeholder;
                }
            });

            // apply properties
            scope.$watch('itemsSource', function () {
                if (scope.itemsSource != null) {
                    control.itemsSource = scope.itemsSource;
                }
            });
            scope.$watch('isEditable', function () {
                if (scope.isEditable != null) {
                    control.isEditable = scope.isEditable;
                }
            });
            scope.$watch('displayMemberPath', function () {
                if (scope.displayMemberPath != null) {
                    control.displayMemberPath = scope.displayMemberPath;
                }
            });
            scope.$watch('selectedValuePath', function () {
                if (scope.selectedValuePath != null) {
                    control.selectedValuePath = scope.selectedValuePath;
                }
            });
            scope.$watch('selectedIndex', function () {
                if (scope.selectedIndex != null) {
                    control.selectedIndex = scope.selectedIndex;
                }
            });
            scope.$watch('selectedValue', function () {
                if (scope.selectedValue != null) {
                    control.selectedValue = scope.selectedValue;
                }
            });
            scope.$watch('showDropDownButton', function () {
                if (scope.showDropDownButton != null) {
                    control.showDropDownButton = scope.showDropDownButton;
                }
            });
            scope.$watch('isContentHtml', function () {
                if (scope.isContentHtml != null) {
                    control.isContentHtml = scope.isContentHtml;
                }
            });
        }
    }
});

// AutoComplete directive
app.directive('appAutocomplete', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            control: '=',
            text: '=',
            itemsSource: '=',
            itemsSourceFunction: '=',
            displayMemberPath: '=',
            selectedValuePath: '=',
            selectedIndex: '=',
            selectedValue: '=',
            showDropDownButton: '=',
            placeholder: '=',
            cssMatch: '='
        },
        template: '<div/>',
        link: function (scope, element, attrs) {

            // create autocomplete
            var control = new wijmo.input.AutoComplete(element[0]);
            safeApply(scope, 'control', control);
            if (scope.itemsSource != null) {
                control.itemsSource = scope.itemsSource;
            }

            // notify of text changes
            control.textChanged.addHandler(function () {
                safeApply(scope, 'text', control.text);
                safeApply(scope, 'selectedValue', control.selectedValue);
                safeApply(scope, 'selectedIndex', control.selectedIndex);
            });

            // apply properties
            scope.$watch('text', function () {
                if (scope.text != null) {
                    control.text = scope.text;
                }
            });
            scope.$watch('placeholder', function () {
                if (scope.placeholder != null) {
                    control.placeholder = scope.placeholder;
                }
            });
            scope.$watch('itemsSource', function () {
                if (scope.itemsSource != null) {
                    control.itemsSource = scope.itemsSource;
                }
            });
            scope.$watch('itemsSourceFunction', function () {
                if (scope.itemsSourceFunction != null) {
                    control.itemsSourceFunction = scope.itemsSourceFunction;
                }
            });
            scope.$watch('displayMemberPath', function () {
                if (scope.displayMemberPath != null) {
                    control.displayMemberPath = scope.displayMemberPath;
                }
            });
            scope.$watch('selectedValuePath', function () {
                if (scope.selectedValuePath != null) {
                    control.selectedValuePath = scope.selectedValuePath;
                }
            });
            scope.$watch('selectedValue', function () {
                if (scope.selectedValue != null) {
                    control.selectedValue = scope.selectedValue;
                }
            });
            scope.$watch('selectedIndex', function () {
                if (scope.selectedIndex != null) {
                    control.selectedIndex = scope.selectedIndex;
                }
            });
            scope.$watch('showDropDownButton', function () {
                if (scope.showDropDownButton != null) {
                    control.showDropDownButton = scope.showDropDownButton;
                }
            });
            scope.$watch('cssMatch', function () {
                if (scope.cssMatch != null) {
                    control.cssMatch = scope.cssMatch;
                }
            });
        }
    }
});

// Menu directive
app.directive('appMenu', function () {

    // gets the HTML in an element, removing empty ng-scope spans and trimming
    function getHtml(element) {
        var html = element.innerHTML;
        html = html.replace(/ class="ng-scope"/g, '');
        html = html.replace(/<span>\s*<\/span>/g, '');
        html = html.replace(/\n/g, '');
        html = html.replace(/<span>\s+/g, '<span> ');
        html = html.replace(/\s+<\/span>/g, ' </span>');
        return html.trim();
    };

    // update header to show the currently selected value
    function updateHeader(scope, control) {
        control.header = scope.header;
        if (typeof (scope.value) != 'undefined' && control.selectedItem && control.displayMemberPath) {
            var currentValue = control.selectedItem[control.displayMemberPath];
            if (currentValue != null) {
                control.header += ': <b>' + currentValue + '</b>';
            }
        }
    };

    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            control: '=',
            header: '@',
            value: '=',
            showDropDownButton: '=',
            itemClicked: '&'
        },
        template: '<div ng-transclude/>',
        link: function (scope, element, attrs) {

            // clean up element
            element[0].innerHTML = '';

            // create menu
            var control = new wijmo.input.Menu(element[0]);
            safeApply(scope, 'control', control);

            // populate menu
            if (scope.items.length) {
                var arr = [];
                for (var i = 0; i < scope.items.length; i++) {
                    var item = scope.items[i].scope;
                    arr.push({
                        hdr: item.header,
                        val: item.value,
                        cmd: item.cmd,
                        cmdParam: item.cmdParam
                    });
                }
                control.displayMemberPath = 'hdr';
                control.selectedValuePath = 'val';
                control.commandPath = 'cmd';
                control.commandParameterPath = 'cmdParam';
                control.itemsSource = arr;
                updateHeader(scope, control);
            }

            // raise itemClicked event
            var hasValue = attrs["value"] != null;
            control.itemClicked.addHandler(function () {

                // update scope value
                if (hasValue) {
                    safeApply(scope, 'value', control.selectedValue);
                }

                // update control header
                updateHeader(scope, control);

                // raise itemClicked event
                if (scope.itemClicked()) {
                    var fn = scope.itemClicked();
                    fn(control, wijmo.EventArgs.empty);
                }
            });

            // apply properties
            scope.$watch('value', function () {
                if (scope.value != null) {
                    control.selectedValue = scope.value;
                    updateHeader(scope, control);
                }
            });
            scope.$watch('header', function () {
                if (scope.header != null) {
                    updateHeader(scope, control);
                }
            });
            scope.$watch('showDropDownButton', function () {
                if (scope.showDropDownButton != null) {
                    control.showDropDownButton = scope.showDropDownButton;
                }
            });
        },
        controller: function ($scope) {
            var items = $scope.items = [];
            this.addItem = function (scope, element) {
                if (scope.header == null) {
                    scope.header = getHtml(element[0]);
                }
                items.push({ scope: scope, element: element });
            }
        },
    }
});
app.directive('appMenuItem', function () {
    return {
        require: '^appMenu',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            value: '=',
            cmd: '=',
            cmdParam: '='
        },
        template: '<span ng-transclude/>',
        link: function (scope, element, attrs, menu) {
            menu.addItem(scope, element);
        }
    }
});
app.directive('appMenuSeparator', function () {
    return {
        require: '^appMenu',
        restrict: 'E',
        replace: true,
        template: '<span/>',
        link: function (scope, element, attrs, menu) {
            scope.header = '<div class="wj-separator" style="width:100%;height:1px;margin:3px 0px;background-color:rgba(0,0,0,.2)"/>';
            menu.addItem(scope, element);
        }
    }
});

// ListBox directive
app.directive('appListbox', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            control: '=',
            itemsSource: '=',
            displayMemberPath: '=',
            selectedIndex: '=',
            selectedItem: '=',
            isContentHtml: '='
        },
        template: '<div/>',
        link: function (scope, element, attrs) {

            // create ListBox
            var control = new wijmo.input.ListBox(element[0]);
            safeApply(scope, 'control', control);
            if (scope.itemsSource != null) {
                control.itemsSource = scope.itemsSource;
            }

            // get/set selected index/item
            scope.$watch('selectedIndex', function () {
                if (scope.selectedIndex != null) {
                    control.selectedIndex = scope.selectedIndex;
                }
            });
            scope.$watch('selectedItem', function () {
                if (scope.selectedItem != null) {
                    control.selectedItem = scope.selectedItem;
                }
            });
            control.selectedIndexChanged.addHandler(function () {
                safeApply(scope, 'selectedIndex', control.selectedIndex);
                safeApply(scope, 'selectedItem', control.selectedItem);
            });

            // apply properties
            scope.$watch('itemsSource', function () {
                if (scope.itemsSource != null) {
                    control.itemsSource = scope.itemsSource;
                }
            });
            scope.$watch('displayMemberPath', function () {
                if (scope.displayMemberPath != null) {
                    control.displayMemberPath = scope.displayMemberPath;
                }
            });
            scope.$watch('isContentHtml', function () {
                if (scope.isContentHtml != null) {
                    control.isContentHtml = scope.isContentHtml;
                }
            });
        }
    }
});

// Calendar directive
app.directive('appCalendar', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            control: '=',
            value: '=',
            min: '=',
            max: '='
        },
        template: '<div/>',
        link: function (scope, element, attrs) {

            // create calendar
            var control = new wijmo.input.Calendar(element[0]);
            safeApply(scope, 'control', control);

            // get/set value
            scope.$watch('value', function () {
                if (scope.value != null) {
                    control.value = parseDate(scope.value);
                }
            });
            control.valueChanged.addHandler(function () {
                safeApply(scope, 'value', control.value);
            });

            // set min/max
            scope.$watch('min', function () {
                if (scope.min != null) {
                    control.min = parseDate(scope.min);
                }
            });
            scope.$watch('max', function () {
                if (scope.max != null) {
                    control.max = parseDate(scope.max);
                }
            });
        }
    }
    function parseDate(value) {
        if (wijmo.isString(value)) {
            var parts = value.split('-');
            if (parts.length == 3) {
                return new Date(parts[0], parts[1] - 1, parts[2]);
            }
            return new Date(value);
        }
        return value;
    }
});

// FlexGrid directive
app.directive('appGrid', function ($compile) {

    // functions
    function getCellScope(panel, r, c) {
        return {
            $row: panel.rows[r],
            $col: panel.rows[c],
            $item: panel.rows[r].dataItem
        };
    }
    function getCellTemplate(col) {
        var tpl = col.cellTemplate;
        if (tpl) {
            tpl = tpl.replace(/ng\-style/g, 'style');
            tpl = tpl.replace(/ class\=\"ng\-scope\"( \"ng\-binding\")?/g, '');
            tpl = tpl.replace(/<span>\s*<\/span>/g, '');
        }
        return tpl;
    }

    // directive
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            control: '=',
            itemsSource: '=',
            childItemsPath: '=',
            selectionMode: '=',
            allowMerging: '=',
            allowDragging: '=',
            allowResizing: '=',
            allowAddNew: '=',
            rowHeaders: '=',
            readOnly: '=',
        },
        template: '<div ng-transclude/>',
        link: function (scope, element, attrs) {

            // clean up element
            element[0].innerHTML = '';

            // create flexgrid
            var control = new wijmo.grid.FlexGrid(element[0]);
            scope.grid = control;
            safeApply(scope, 'control', control);

            // apply column info
            if (scope.columns && scope.columns.length) {
                control.autoGenerateColumns = false;
                control.columns.clear();
                for (var i = 0; i < scope.columns.length; i++) {
                    var c = new wijmo.grid.Column();
                    var ci = scope.columns[i];
                    if (ci.binding) {
                        c.binding = ci.binding;
                        c.name = ci.name;
                    }
                    if (ci.name) c.name = ci.name;
                    if (ci.type) c.dataType = wijmo.DataType[ci.type];
                    if (ci.map) c.dataMap = ci.map;
                    if (ci.format) c.format = ci.format;
                    if (ci.header) c.header = ci.header;
                    if (ci.width) c.width = (ci.width.indexOf('*') > -1) ? ci.width : ci.width * 1;
                    if (ci.minWidth) c.minWidth = ci.minWidth * 1;
                    if (ci.maxWidth) c.maxWidth = ci.maxWidth * 1;
                    if (ci.align) c.align = ci.align;
                    if (ci.allowDragging) c.allowDragging = ci.allowDragging == 'false' ? false : true;
                    if (ci.allowResizing) c.allowResizing = ci.allowResizing == 'false' ? false : true;
                    if (ci.allowMerging) c.allowMerging = ci.allowMerging == 'false' ? false : true;
                    if (ci.readOnly) c.isReadOnly = ci.readOnly == 'false' ? false : true;
                    if (ci.aggregate) c.aggregate = wijmo.Aggregate[ci.aggregate];
                    if (ci.cellTemplate) c.cellTemplate = ci.cellTemplate;
                    if (ci.cellStyle) c.cellStyle = ci.cellStyle;
                    if (ci.isContentHtml) c.isContentHtml = ci.isContentHtml;
                    control.columns.push(c);
                }
            }

            // honor cell templates
            var controlItemFormatter = control.itemFormatter;
            control.itemFormatter = function (panel, r, c, cell) {

                // call original formatter if any
                if (controlItemFormatter) {
                    controlItemFormatter(panel, r, c, cell);
                }

                // apply directive template and style
                if (panel.cellType == wijmo.grid.CellType.Cell) {
                    var col = panel.columns[c],
                        tpl = getCellTemplate(col);

                    // apply cell template
                    if (tpl) {

                        // make column read-only
                        col.isReadOnly = true;

                        // build cell scope
                        var cellScope = getCellScope(panel, r, c);

                        // evaluate template
                        var html = tpl.replace(/\{\{(.*)\}\}/g, function (match, expression) {
                            var value = scope.$parent.$eval(expression, cellScope);
                            return value != null ? value : '';
                        });

                        // assign result to cell and compile it so ng-click works
                        cell.innerHTML = html;
                        $compile(cell)(scope.$parent);
                    }

                    // apply cell style
                    if (col.cellStyle) {

                        // build cell style object
                        var cellStyle = col.cellStyle,
                            cellScope = getCellScope(panel, r, c),
                            style = scope.$parent.$eval(cellStyle, cellScope);

                        // apply style to cell
                        if (style) {
                            for (var key in style) {
                                cell.style[key] = style[key];
                            }
                        }
                    }
                }
            }

            // apply properties
            scope.$watch('itemsSource', function () {
                if (scope.itemsSource != null) {
                    control.itemsSource = scope.itemsSource;
                }
            });
            scope.$watch('childItemsPath', function () {
                if (scope.childItemsPath != null) {
                    control.childItemsPath = scope.childItemsPath;
                }
            });
            scope.$watch('selectionMode', function () {
                if (scope.selectionMode != null) {
                    control.selectionMode = wijmo.grid.SelectionMode[scope.selectionMode];
                }
            });
            scope.$watch('allowMerging', function () {
                if (scope.allowMerging != null) {
                    control.allowMerging = wijmo.grid.AllowMerging[scope.allowMerging];
                }
            });
            scope.$watch('allowDragging', function () {
                if (scope.allowDragging != null) {
                    control.allowDragging = wijmo.grid.AllowDragging[scope.allowDragging];
                }
            });
            scope.$watch('allowResizing', function () {
                if (scope.allowResizing != null) {
                    control.allowResizing = wijmo.grid.AllowResizing[scope.allowResizing];
                }
            });
            scope.$watch('allowAddNew', function () {
                if (scope.allowAddNew != null) {
                    control.allowAddNew = scope.allowAddNew;
                }
            });
            scope.$watch('readOnly', function () {
                if (scope.readOnly != null) {
                    control.isReadOnly = scope.readOnly;
                }
            });
            scope.$watch('rowHeaders', function () {
                if (scope.rowHeaders == false) {
                    control.rowHeaders.columns.clear();
                }
            });
        },
        controller: function ($scope) {
            var scope = $scope;
            var columns = $scope.columns = [];
            this.addColumn = function (columnScope) {
                columns.push(columnScope);
            }
            this.setDataMap = function (columnScope) {
                if (columnScope.map && columnScope.binding && scope.grid) {
                    var column = scope.grid.columns.getColumn(columnScope.binding);
                    if (column) {
                        column.dataMap = columnScope.map;
                    }
                }
            }
        }
    }
});
app.directive('appGridColumn', function () {
    return {
        restrict: 'E',
        require: '^appGrid',
        replace: true,
        transclude: true,
        scope: {
            name: '@',
            type: '@',
            map: '=',
            binding: '@',
            format: '@',
            header: '@',
            width: '@',
            minWidth: '@',
            maxWidth: '@',
            align: '@',
            allowDragging: '@',
            allowResizing: '@',
            allowMerging: '@',
            readOnly: '@',
            aggregate: '@',
            isContentHtml: '='
        },
        template: '<div ng-transclude/>',
        compile: function (element, attrs) {
            return this.link;
        },
        link: function (scope, element, attrs, grid) {

            // get column template (HTML content)
            var tpl = element[0].innerHTML;
            if (tpl) {
                scope.cellTemplate = tpl;
            }

            // get column style
            var style = attrs['ngStyle'];
            if (style) {
                scope.cellStyle = style;
            }

            // add column scope to parent grid
            scope.binding = attrs['binding'];
            scope.header = attrs['header'];
            grid.addColumn(scope);

            // update column's data map
            scope.$watch('map', function () {
                if (scope.map) {
                    grid.setDataMap(scope);
                }
            });
        }
    }
});

// CollectionView navigator directive (Bootstrap and Wijmo)
app.directive('appCollectionViewNavigator', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: { cv: '=' }, // ICollectionView bound to this item
        template:
            '<div class="btn-group">' +
            '<button type="button" class="btn btn-default"' +
            '    ng-click="cv.moveCurrentToFirst()"' +
            '    ng-disabled="cv.currentPosition <= 0">' +
            '    <span class="glyphicon glyphicon-fast-backward"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-default"' +
            '    ng-click="cv.moveCurrentToPrevious()"' +
            '    ng-disabled="cv.currentPosition <= 0">' +
            '    <span class="glyphicon glyphicon-step-backward"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-default" disabled style="width:100px">' +
            '    {{cv.currentPosition + 1 | number}} / {{cv.itemCount | number}}' +
            '</button>' +
            '<button type="button" class="btn btn-default"' +
            '    ng-click="cv.moveCurrentToNext()"' +
            '    ng-disabled="cv.currentPosition >= cv.itemCount - 1">' +
            '    <span class="glyphicon glyphicon-step-forward"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-default"' +
            '    ng-click="cv.moveCurrentToLast()"' +
            '    ng-disabled="cv.currentPosition >= cv.itemCount - 1">' +
            '    <span class="glyphicon glyphicon-fast-forward"></span>' +
            '</button>' +
            '</div>'
    }
});

// CollectionView pager directive  (Bootstrap and Wijmo)
app.directive('appCollectionViewPager', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: { cv: '=' }, // ICollectionView bound to this item
        template:
            '<div class="btn-group">' +
            '<button type="button" class="btn btn-default"' +
            '    ng-click="cv.moveToFirstPage()"' +
            '    ng-disabled="cv.pageIndex <= 0">' +
            '    <span class="glyphicon glyphicon-fast-backward"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-default"' +
            '    ng-click="cv.moveToPreviousPage()"' +
            '    ng-disabled="cv.pageIndex <= 0">' +
            '    <span class="glyphicon glyphicon-step-backward"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-default" disabled style="width:100px">' +
            '    {{cv.pageIndex + 1 | number}} / {{cv.pageCount | number}}' +
            '</button>' +
            '<button type="button" class="btn btn-default"' +
            '    ng-click="cv.moveToNextPage()"' +
            '    ng-disabled="cv.pageIndex >= cv.pageCount - 1">' +
            '    <span class="glyphicon glyphicon-step-forward"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-default"' +
            '    ng-click="cv.moveToLastPage()"' +
            '    ng-disabled="cv.pageIndex >= cv.pageCount - 1">' +
            '    <span class="glyphicon glyphicon-fast-forward"></span>' +
            '</button>' +
            '</div>'
    }
});

// FlexChart directive
app.directive('appChart', function () {

    var styleAttrs = 'stroke,strokeWidth,fill,opacity';

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            control: '=',
            itemsSource: '=',
            bindingX: '=',
            chartType: '=',
            selectionMode: '=',
            selection: '=',
            legendPosition: '=',
            stacking: '=',
            rotated: '=',
            header: '=',
            footer: '=',
            titleX: '=', titleY: '=',
            formatX: '=', formatY: '=',
            minX: '=', minY: '=',
            maxX: '=', maxY: '=',
            unitX: '=', unitY: '=',
            gridX: '=', gridY: '=',
            axisX: '=', axisY: '=',
            legendToggle: '=',
            tooltip: '@'
        },
        template: '<div ng-transclude/>',
        link: function (scope, element, attrs) {

            // clean up element
            element[0].innerHTML = '';

            // create FlexChart control
            var control = new wijmo.chart.FlexChart(element[0]);
            safeApply(scope, 'control', control);

            // update selection
            control.selectionChanged.addHandler(function (s, e) {
                if (typeof (scope.selection) !== 'undefined') {
                    safeApply(scope, 'selection', control.selection);
                    scope.$root.$apply();
                }
            });

            // add series
            if (scope.series) {
                var snames = styleAttrs.split(',');
                for (var i = 0; i < scope.series.length; i++) {
                    var s = scope.series[i],
                        series = new wijmo.chart.Series();

                    // add simple properties
                    series.name = s.name;
                    series.bindingX = s.bindingX;
                    series.binding = s.binding;
                    series.itemsSource = s.itemsSource;
                    series.chartType = s.chartType;

                    // build series style
                    for (var j = 0; j < snames.length; j++) {
                        var sname = snames[j];
                        if (s[sname]) {
                            if (!series.style) series.style = {};
                            series.style[sname] = s[sname];
                        }
                    }

                    // use same style for symbols as for chart elements (bars/lines)
                    series.symbolStyle = series.style;

                    // add series to chart
                    control.series.push(series);
                }
            }

            // apply properties
            scope.$watch('itemsSource', function () {
                if (scope.itemsSource != null) {
                    control.itemsSource = scope.itemsSource;
                }
            });
            scope.$watch('bindingX', function () {
                if (scope.bindingX != null) {
                    control.bindingX = scope.bindingX;
                }
            });
            scope.$watch('chartType', function () {
                if (scope.chartType != null) {
                    control.chartType = scope.chartType;
                }
            });
            scope.$watch('selectionMode', function () {
                if (scope.selectionMode != null) {
                    control.selectionMode = scope.selectionMode;
                }
            });
            scope.$watch('legendPosition', function () {
                if (scope.legendPosition != null) {
                    control.legend.position = scope.legendPosition;
                }
            });
            scope.$watch('stacking', function () {
                if (scope.stacking != null) {
                    control.stacking = scope.stacking;
                }
            });
            scope.$watch('rotated', function () {
                if (scope.rotated != null) {
                    control.rotated = scope.rotated;
                }
            });
            scope.$watch('tooltip', function () {
                if (scope.tooltip != null) {
                    control.tooltip.content = scope.tooltip;
                }
            });
            scope.$watch('header', function () {
                if (scope.header != null) {
                    control.header = scope.header;
                }
            });
            scope.$watch('footer', function () {
                if (scope.footer != null) {
                    control.footer = scope.footer;
                }
            });
            scope.$watch('titleX', function () {
                if (scope.titleX != null) {
                    control.axisX.title = scope.titleX;
                }
            });
            scope.$watch('titleY', function () {
                if (scope.titleY != null) {
                    control.axisY.title = scope.titleY;
                }
            });
            scope.$watch('formatX', function () {
                if (scope.formatX != null) {
                    control.axisX.format = scope.formatX;
                }
            });
            scope.$watch('formatY', function () {
                if (scope.formatY != null) {
                    control.axisY.format = scope.formatY;
                }
            });
            scope.$watch('minX', function () {
                if (scope.minX != null) {
                    control.axisX.min = scope.minX;
                }
            });
            scope.$watch('minY', function () {
                if (scope.minY != null) {
                    control.axisY.min = scope.minY;
                }
            });
            scope.$watch('maxX', function () {
                if (scope.maxX != null) {
                    control.axisX.max = scope.maxX;
                }
            });
            scope.$watch('maxY', function () {
                if (scope.maxY != null) {
                    control.axisY.max = scope.maxY;
                }
            });
            scope.$watch('unitX', function () {
                if (scope.unitX != null) {
                    control.axisX.majorUnit = scope.unitX;
                }
            });
            scope.$watch('unitY', function () {
                if (scope.unitY != null) {
                    control.axisY.majorUnit = scope.unitY;
                }
            });
            scope.$watch('gridX', function () {
                if (scope.gridX != null) {
                    control.axisX.majorGrid = scope.gridX;
                }
            });
            scope.$watch('gridY', function () {
                if (scope.gridY != null) {
                    control.axisY.majorGrid = scope.gridY;
                }
            });
            scope.$watch('axisX', function () {
                if (scope.axisX != null) {
                    control.axisX.axisLine = scope.axisX;
                }
            });
            scope.$watch('axisY', function () {
                if (scope.axisY != null) {
                    control.axisY.axisLine = scope.axisY;
                }
            });
            scope.$watch('legendToggle', function () {
                if (scope.legendToggle != null) {
                    if (!control.options) {
                        control.options = {};
                    }
                    control.options.legendToggle = scope.legendToggle;
                }
            });
        },
        controller: function ($scope) {
            var scope = $scope;
            var series = $scope.series = [];
            this.addSeries = function (seriesScope, seriesAttrs) {

                // copy attributes into series scope
                var names = ('name,binding,bindingX,' + styleAttrs).split(',');
                for (var i = 0; i < names.length; i++) {
                    var name = names[i];
                    if (!seriesScope[name] && seriesAttrs[name]) {
                        seriesScope[name] = seriesAttrs[name];
                    }
                }

                // add series to list
                series.push(seriesScope);
            }
        }
    }
});
app.directive('appChartSeries', function () {
    return {
        restrict: 'E',
        require: '^appChart',
        replace: true,
        scope: {
            itemsSource: '=',
            chartType: '='
        },
        template: '<div/>',
        link: function (scope, element, attrs, chart) {
            chart.addSeries(scope, attrs);
        }
    }
});

// Tooltip directive
app.directive('appTooltip', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var tt = new wijmo.Tooltip();
            //tt.trigger = wijmo.Trigger.Click;
            tt.setTooltip(element[0], attrs['appTooltip']);
        }
    }
});

// Boostrap Tooltip directive
app.directive('appTooltipBootstrap', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var options = {
                //placement: 'auto',
                trigger: 'click',
                html: true,
                title: $(attrs['appTooltip']).html() //'hello! this is some <b>HTML</b> for me and you.',
            }
            element.tooltip(options);
        }
    }
});

// Bootstrap Tabs directive
app.directive('appTab', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: function ($scope, $element) {
            var panes = $scope.panes = [];

            $scope.select = function (pane) {
                angular.forEach(panes, function (pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            }

            this.addPane = function (pane) {
                if (panes.length == 0) $scope.select(pane);
                panes.push(pane);
            }
        },
        template:
          '<div class="tabbable">' +
            '<ul class="nav nav-tabs">' +
              '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
                '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
              '</li>' +
            '</ul>' +
            '<div class="tab-content" ng-transclude></div>' +
          '</div>',
        replace: true
    };
});
app.directive('appTabPane', function () {
    return {
        require: '^appTab',
        restrict: 'E',
        transclude: true,
        scope: { title: '@' },
        link: function (scope, element, attrs, tabsCtrl) {
            tabsCtrl.addPane(scope);
        },
        template:
          '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
          '</div>',
        replace: true
    };
});