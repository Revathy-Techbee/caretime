var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var wijmo;
(function (wijmo) {
    (function (_data) {
        /**
        * Extends @see:CollectionView to support OData service.
        *
        * OData is a standardized protocol for creating and consuming data APIs.
        * OData builds on core protocols like HTTP and commonly accepted methodologies like REST.
        * The result is a uniform way to expose full-featured data APIs. (http://www.odata.org/)
        *
        * You can use the result objects from the OData service as data sources for any Wijmo controls,
        * and in addition to full CRUD support and real-time updates you automatically get
        * CollectionView features including sorting, filtering, paging, and grouping.
        */
        var ODataCollectionView = (function (_super) {
            __extends(ODataCollectionView, _super);
            /**
            * Initializes a new instance of an @see:ODataCollectionView.
            *
            * @param url Base url for the OData service.
            * @param keys Array of field names used as keys for this table.
            * @param options Object with query options (such as take, skip, sort, etc).
            * @param dataTypes Array with field names and data type overrides.
            * @param notify Function called when the data is loaded.
            * @param loadAllData Whether to load all data from the table.
            */
            function ODataCollectionView(url, keys, options, dataTypes, notify, loadAllData) {
                var ajaxSettings = {
                    jsonp: '$callback',
                    dataType: 'json',
                    data: {
                        $format: 'json',
                        $inlinecount: 'allpages'
                    },
                    timeout: 60 * 1000
                }, requestUrl;

                this._items = new wijmo.collections.ObservableArray();
                this._serviceUrl = url.serviceUrl;
                this._serviceUrl += (this._serviceUrl.lastIndexOf('/') === this._serviceUrl.length - 1) ? '' : '/';
                this._entityName = url.entityName;
                this._keys = keys;
                this._dataTypes = dataTypes;
                this._callback = notify;
                this._loadAllData = !!loadAllData;

                requestUrl = this._serviceUrl + this._entityName;

                _super.call(this, this._items);

                if (options) {
                    ajaxSettings = $.extend({}, ajaxSettings, options.ajax);
                    ajaxSettings.data = $.extend({}, ajaxSettings.data);

                    if (options.serverSettings) {
                        if (options.serverSettings.take) {
                            ajaxSettings.data.$take = options.serverSettings.take;
                        }

                        if (options.serverSettings.skip) {
                            ajaxSettings.data.$skip = options.serverSettings.skip;
                        }

                        if (options.serverSettings.filters) {
                            ajaxSettings.data.$filter = ODataCollectionView._parseFilter(options.serverSettings.filters);
                        }

                        if (options.serverSettings.sorts) {
                            ajaxSettings.data.$orderby = $.map(options.serverSettings.sorts, function (sd) {
                                return sd.property + (sd.asc ? '' : ' desc');
                            }).join(', ');
                        }

                        if (options.serverSettings.selects) {
                            ajaxSettings.data.$select = options.serverSettings.selects.join(', ');
                        }
                    }
                }

                this._requestData(requestUrl, ajaxSettings);
            }
            /**
            * Override commitNew to add the new item to the database.
            */
            ODataCollectionView.prototype.commitNew = function () {
                this._requestWrite('Add', this.currentAddItem);
                _super.prototype.commitNew.call(this);
            };

            /**
            * Override commitEdit to modify the item in the database.
            */
            ODataCollectionView.prototype.commitEdit = function () {
                var sameContent = this._sameContent(this.currentEditItem, this._edtClone);
                if (!sameContent && !this.currentAddItem) {
                    this._requestWrite('Update', this.currentEditItem);
                }
                _super.prototype.commitEdit.call(this);
            };

            /**
            * Override remove to remove the item from the database.
            */
            ODataCollectionView.prototype.remove = function (item) {
                this._requestWrite('Delete', this.currentItem);
                _super.prototype.remove.call(this, item);
            };

            // Get Data from OData service
            ODataCollectionView.prototype._requestData = function (url, ajaxSettings) {
                var self = this;
                if (url) {
                    $.ajax(url, $.extend({}, ajaxSettings, {
                        success: function (res) {
                            var resData = [], nextLink = res['odata.nextLink'];
                            if (res.value) {
                                resData = res.value;
                            } else if (res.d) {
                                resData = res.d;
                            } else if ($.isArray(res)) {
                                resData = res;
                            }

                            $.each(resData, function (_, item) {
                                self._convertItem(item, self._dataTypes);
                                self._items.push(item);
                            });

                            if (self._loadAllData && nextLink) {
                                self._requestData(self._serviceUrl + nextLink, {
                                    data: {
                                        $format: 'json'
                                    }
                                });
                            } else {
                                if (res['odata.count']) {
                                    self._totalItemCount = parseInt(res['odata.count']);
                                }
                                self.moveCurrentToFirst();

                                if (self._callback) {
                                    self._callback();
                                }
                            }
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            throw textStatus + errorThrown;
                        }
                    }));
                }
            };

            // convert the properties of an item to the proper types
            ODataCollectionView.prototype._convertItem = function (item, dataTypes) {
                for (var k in item) {
                    if (dataTypes) {
                        for (var i = 0; i < dataTypes.length; i++) {
                            var name = dataTypes[i].name, type = dataTypes[i].type;
                            if ((wijmo.isString(name) && name == k) || (wijmo.tryCast(name, RegExp) && name.test(k))) {
                                item[k] = wijmo.changeType(item[k], type, null);
                                break;
                            }
                        }
                    }
                }
            };

            // Send write request to the OData service for updating the database
            ODataCollectionView.prototype._requestWrite = function (operationType, item) {
                var self = this, updateValid = true, paras = [], writeUrl = self._serviceUrl + self._entityName, requestMethodType = wijmo.data.ODataCollectionView._requestMethodType[operationType], jsonEntity = operationType === 'Delete' ? null : JSON.stringify(self._preProcessData(item));

                if (jsonEntity === '{}') {
                    return;
                }

                if (item) {
                    if (operationType !== 'Add') {
                        if (self._keys) {
                            $.each(self._keys, function (_, key) {
                                var val = item[key];
                                if (!!val) {
                                    paras.push(key + '=' + val);
                                } else {
                                    updateValid = false;
                                    return false;
                                }
                            });
                        }
                        if (updateValid) {
                            writeUrl += '(' + paras.join(', ') + ')';
                        }
                    }

                    if (updateValid) {
                        $.ajax(writeUrl, {
                            type: requestMethodType,
                            contentType: 'application/json;',
                            datatype: 'json',
                            data: jsonEntity,
                            success: function (data) {
                                if (operationType === 'Add') {
                                    if (self._keys) {
                                        $.each(self._keys, function (_, key) {
                                            if (item[key] === null || item[key] === undefined) {
                                                item[key] = $(data).find(key).text();
                                            }
                                        });
                                    }
                                    self.commitEdit();
                                }
                                //console.log(operationType + ': success');
                            },
                            error: function (xhr, textStatus, errorThrown) {
                                throw textStatus + errorThrown;
                            }
                        });
                    }
                }
            };

            // To avoid the error 'Cannot convert a primitive value to the expected type' from the OData service.
            // We shall parse the number value to string first, when add or update data.
            ODataCollectionView.prototype._preProcessData = function (item) {
                var cloneItem = {};
                if (item) {
                    $.each(item, function (key, val) {
                        if (typeof val === 'number') {
                            cloneItem[key] = val.toString();
                        } else {
                            cloneItem[key] = val;
                        }
                    });
                }
                return cloneItem;
            };

            Object.defineProperty(ODataCollectionView.prototype, "TotalItemCount", {
                // Return the total item count of the OData service
                get: function () {
                    return isNaN(this._totalItemCount) ? 0 : this._totalItemCount;
                },
                enumerable: true,
                configurable: true
            });

            // Parse the filters property of the ODataCollectionViewSettings to
            // OData filter expressions
            ODataCollectionView._parseFilter = function (filters) {
                var _this = this;
                var expressions = [];

                $.each(filters, function (_, filter) {
                    var property = filter.property, value = filter.value, op = filter.operator, args = '(' + property + ', \'' + value + '\')', quote = true, expression = '';

                    if (!op) {
                        op = 'eq';
                    } else {
                        op = ODataCollectionView._filterOperators[filter.operator];
                    }

                    if (value instanceof Date) {
                        quote = false;
                        value = _this._convertDate(value);
                    }

                    switch (op) {
                        case 'contains':
                            expression = 'indexof' + args + ' ge 0';
                            break;
                        case 'notcontains':
                            expression = 'indexof' + args + ' lt 0';
                            break;
                        case 'beginswith':
                            expression = 'startswith' + args + ' eq true';
                            break;
                        case 'endswith':
                            expression = 'endswith' + args + ' eq true';
                            break;
                        default:
                            expression = filter.property + ' ' + op + ' ' + ((isNaN(filter.value) && quote) ? ('\'' + filter.value + '\'') : filter.value);
                            break;
                    }

                    expressions.push(expression);
                });

                return expressions.join(' and ');
            };

            // Convert the javascript Date to the date that OData protocol can accept.
            ODataCollectionView._convertDate = function (date, toUTC) {
                var pad = function (val) {
                    return (val < 10) ? '0' + val : val + '';
                };

                if (date) {
                    var dateStr = toUTC ? date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(date.getUTCDate()) + 'T' + pad(date.getUTCHours()) + ':' + pad(date.getUTCMinutes()) + ':' + pad(date.getUTCSeconds()) + 'Z' : date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + 'T' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());

                    return 'datetime\'' + dateStr + '\'';
                }

                return '';
            };
            ODataCollectionView._filterOperators = {
                '<': 'lt',
                '<=': 'le',
                '>': 'gt',
                '>=': 'ge',
                '==': 'eq',
                '!=': 'ne',
                less: 'lt',
                lessorequal: 'le',
                greater: 'gt',
                greaterorequal: 'ge',
                equals: 'eq',
                notequal: 'ne',
                contains: true,
                notcontains: true,
                beginswith: true,
                endswith: true
            };

            ODataCollectionView._requestMethodType = {
                Add: 'Post',
                Update: 'Put',
                Delete: 'Delete'
            };
            return ODataCollectionView;
        })(wijmo.collections.CollectionView);
        _data.ODataCollectionView = ODataCollectionView;
    })(wijmo.data || (wijmo.data = {}));
    var data = wijmo.data;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=ODataCollectionView.js.map
