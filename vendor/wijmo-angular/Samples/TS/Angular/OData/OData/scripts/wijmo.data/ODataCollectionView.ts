module wijmo.data {

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
    export class ODataCollectionView extends wijmo.collections.CollectionView {
        _items: wijmo.collections.ObservableArray;
        _callback: Function;
        _loadAllData: boolean;
        _dataTypes: any[];
        _totalItemCount: number;
        _keys: string[];
        _serviceUrl: string;
        _entityName: string;

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
        constructor(url: IRemoteUrl, keys?: string[], options?: IODataCollectionViewSettings, dataTypes?: any[], notify?: Function, loadAllData?: boolean) {
            var ajaxSettings: JQueryAjaxSettings = <JQueryAjaxSettings> {
                    jsonp: '$callback',
                    dataType: 'json',
                    data: {
                        $format: 'json',
                        $inlinecount: 'allpages'
                    },
                    timeout: 60 * 1000
                },
                requestUrl;

            this._items = new wijmo.collections.ObservableArray();
            this._serviceUrl = url.serviceUrl;
            this._serviceUrl += (this._serviceUrl.lastIndexOf('/') === this._serviceUrl.length - 1) ? '' : '/';
            this._entityName = url.entityName;
            this._keys = keys;
            this._dataTypes = dataTypes;
            this._callback = notify;
            this._loadAllData = !!loadAllData;

            requestUrl = this._serviceUrl + this._entityName;

            super(this._items);

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
                        ajaxSettings.data.$orderby = $.map(options.serverSettings.sorts, sd => sd.property + (sd.asc ? '' : ' desc')).join(', ');
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
        commitNew() {
            this._requestWrite('Add', this.currentAddItem);
            super.commitNew();
        }
        /**
         * Override commitEdit to modify the item in the database.
         */
        commitEdit() {
            var sameContent = this._sameContent(this.currentEditItem, this._edtClone);
            if (!sameContent && !this.currentAddItem) {
                this._requestWrite('Update', this.currentEditItem);
            }
            super.commitEdit();
        }
        /**
         * Override remove to remove the item from the database.
         */
        remove(item: any) {
            this._requestWrite('Delete', this.currentItem);
            super.remove(item);
        }

        // Get Data from OData service
        private _requestData(url: string, ajaxSettings: JQueryAjaxSettings) {
            var self = this;
            if (url) {
                $.ajax(url, $.extend({}, ajaxSettings, {
                    success: (res) => {
                        var resData = [],
                            nextLink = res['odata.nextLink'];
                        if (res.value) {
                            resData = res.value;
                        } else if (res.d) {
                            resData = res.d;
                        } else if ($.isArray(res)) {
                            resData = res;
                        }

                        $.each(resData, (_, item) => {
                            self._convertItem(item, self._dataTypes);
                            self._items.push(item);
                        });

                        if (self._loadAllData && nextLink) {
                            self._requestData(self._serviceUrl + nextLink, {
                                data: {
                                    $format: 'json',
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
                    error: (xhr, textStatus, errorThrown) => {
                        throw textStatus + errorThrown;
                    }
                }));
            } 
        }

        // convert the properties of an item to the proper types
        private _convertItem(item: any, dataTypes: any[]) {
            for (var k in item) {
                if (dataTypes) {
                    for (var i = 0; i < dataTypes.length; i++) {
                        var name = dataTypes[i].name,
                            type = dataTypes[i].type;
                        if ((isString(name) && name == k) || (tryCast(name, RegExp) && name.test(k))) {
                            item[k] = wijmo.changeType(item[k], type, null);
                            break;
                        }
                    }
                }
            }
        }

        // Send write request to the OData service for updating the database
        private _requestWrite(operationType: string, item: any) {
            var self = this,
                updateValid = true,
                paras = [],
                writeUrl = self._serviceUrl + self._entityName,
                requestMethodType = wijmo.data.ODataCollectionView._requestMethodType[operationType],
                jsonEntity = operationType === 'Delete' ? null : JSON.stringify(self._preProcessData(item));

            if (jsonEntity === '{}') {
                return;
            }

            if (item) {
                if (operationType !== 'Add') {
                    if (self._keys) {
                        $.each(self._keys, (_, key) => {
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
                                    $.each(self._keys, (_, key) => {
                                        if (item[key] === null || item[key] === undefined) {
                                            item[key] = $(data).find(key).text();
                                        }
                                    });
                                }
                                self.commitEdit();
                            }
                            //console.log(operationType + ': success');
                        },
                        error: (xhr, textStatus, errorThrown) => {
                            throw textStatus + errorThrown;
                        }
                    });
                }
            }
		}

		// To avoid the error 'Cannot convert a primitive value to the expected type' from the OData service.
		// We shall parse the number value to string first, when add or update data. 
		private _preProcessData(item: any): any {
			var cloneItem = {};
			if (item) {
				$.each(item, (key, val) => {
					if (typeof val === 'number') {
						cloneItem[key] = val.toString();
					} else {
						cloneItem[key] = val;
					}
				});
			}
			return cloneItem;
		}

        // Return the total item count of the OData service
        get TotalItemCount() {
            return isNaN(this._totalItemCount) ? 0 : this._totalItemCount;
        }

        // OData filter Operators
        static _filterOperators = {
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

        // Parse the filters property of the ODataCollectionViewSettings to 
        // OData filter expressions
        static _parseFilter(filters: IFilter[]): string {
            var expressions = [];

            $.each(filters, (_, filter: IFilter) => {
                var property = filter.property,
                    value = filter.value,
                    op = filter.operator,
                    args = '(' + property + ', \'' + value + '\')',
                    quote = true,
                    expression = '';

                if (!op) {
                    op = 'eq';
                } else {
                    op = ODataCollectionView._filterOperators[filter.operator];
                }

                if (value instanceof Date) {
                    quote = false;
                    value = this._convertDate(value);
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
        }

        // Convert the javascript Date to the date that OData protocol can accept.
        static _convertDate(date: Date, toUTC?: boolean): string {
            var pad = (val: number): string => {
                return (val < 10) ? '0' + val : val + '';
            };

            if (date) {
                var dateStr = toUTC
                    ? date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(date.getUTCDate()) + 'T' + pad(date.getUTCHours()) + ':' + pad(date.getUTCMinutes()) + ':' + pad(date.getUTCSeconds()) + 'Z'
                    : date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + 'T' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());

                return 'datetime\'' + dateStr + '\'';
            }

            return '';
        }

        // The write request method type
        static _requestMethodType = {
            Add: 'Post',
            Update: 'Put',
            Delete: 'Delete'
        }
    }

    export interface IODataCollectionViewSettings {
        ajax?: JQueryAjaxSettings;
        serverSettings?: {
            skip?: string;
            take?: string;
            filters?: IFilter[];
            sorts?: ISort[];
            selects?: string[];
        }
    }

    export interface IFilter {
        property: string;
        operator?: any;
        value: any;
    }

    export interface ISort {
        property: string;
        asc?: boolean;
    }

    export interface IRemoteUrl {
        serviceUrl: string;
        entityName: string;
    }
}