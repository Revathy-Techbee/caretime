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
        _ajaxSettings: JQueryAjaxSettings;
        _sortOnServer: boolean;
		_pageOnServer: boolean;
        _encodeCreds: string;
        _isRequesting: boolean;

        /**
         * Initializes a new instance of an @see:ODataCollectionView.
         *
         * @param url Base url for the OData service.
         * @param keys Array of field names used as keys for this table.
         * @param options Object with query options (such as take, skip, sort, etc).
         * @param dataTypes Array with field names and data type overrides.
         * @param notify Function called when the data is loaded.
         * @param loadAllData Whether to load all data from the table.
         * @param sortOnServer Whether to sort on server.
         * @param pageOnServer Whether to page on server.
         */
        constructor(url: IRemoteUrl, keys?: string[], options?: IODataCollectionViewSettings,
            dataTypes?: any[], notify?: Function, loadAllData?: boolean,
			sortOnServer?: boolean, pageOnServer?: boolean) {
			var user = options && options.serverSettings ? options.serverSettings.user : null,
				password = options && options.serverSettings ? options.serverSettings.password : null;

			if (user && password) {
				this._encodeCreds = window.btoa(user + ':' + password);
			}
				
            this._ajaxSettings = <JQueryAjaxSettings> {
                jsonp: '$callback',
                dataType: 'json',
                data: {
                    $format: 'verbosejson'
                },
                timeout: 60 * 1000
			};

			if (this._encodeCreds) {
				this._ajaxSettings['headers'] = {
					Authorization: 'Basic ' + this._encodeCreds
				}
			}

            this._items = new wijmo.collections.ObservableArray();
            this._serviceUrl = url.serviceUrl + ((url.serviceUrl.lastIndexOf('/') === url.serviceUrl.length - 1) ? '' : '/');
            this._entityName = url.entityName;
            this._keys = keys;
            this._dataTypes = dataTypes;
            this._callback = notify;
            this._loadAllData = !!loadAllData;
            this._sortOnServer = !!sortOnServer;
            this._pageOnServer = !!pageOnServer;
            this._isRequesting = false;

            super(this._items);

            if (options) {
                this._ajaxSettings = $.extend({}, this._ajaxSettings, options.ajax);
                this._ajaxSettings.data = $.extend({}, this._ajaxSettings.data);

                if (options.serverSettings) {

                    if (options.serverSettings.filters) {
                        this._ajaxSettings.data.$filter = ODataCollectionView._parseFilter(options.serverSettings.filters);
                    }

                    if (options.serverSettings.selects) {
                        this._ajaxSettings.data.$select = options.serverSettings.selects.join(', ');
                    }
                }
            }

            this.sortDescriptions.collectionChanged.removeAllHandlers();
            this.sortDescriptions.collectionChanged.addHandler(this._sortDescHandler.bind(this));
            this._queryData();
        }

        /**
         * Override _getPageView to get the list that corresponds to the current page
         */
        _getPageView() {
            if (!this._pageOnServer) {
                return super._getPageView();
            }
            return this._view;
        }

        /**
         * Override pageCount to get the total number pages.
         */
        get pageCount(): number {
            var totalCount = this.pageOnServer ? this.TotalItemCount : this._view.length;
            return this.pageSize ? Math.ceil(totalCount / this.pageSize) : 1;
        }

        /**
         * Override pageSize to get or set the number of items to display on a page.
         */
        get pageSize(): number {
            return this._pgSz;
        }
        set pageSize(value: number) {
            if (value != this._pgSz) {
                this._pgSz = wijmo.asInt(value);
                if (this.pageOnServer) {
                    this._queryData();
                } else {
                    this.refresh();
                }
            }
        }

        /**
         * Override to move to the page at the specified index.
         *
         * @param index Index of the page to move to.
         * @return True if the page index was changed successfully.
         */
        moveToPage(index: number): boolean {

            if (!this.pageOnServer) {
                return super.moveToPage(index);
            }
            var newIndex = wijmo.clamp(index, 0, this.pageCount - 1);
            if (newIndex != this.pageIndex) {

                // honor canChangePage
                if (!this.canChangePage) {
                    wijmo.assert(false, 'Changing pages not supported.');
                }

                // raise pageChanging
                var e = new wijmo.collections.PageChangingEventArgs(newIndex);
                if (this.onPageChanging(e)) {

                    // change the page
                    this._pgIdx = newIndex;
                    this._idx = 0;
                    this._queryData();
                }
            }
            return this._pgIdx == index;
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

        /**
         * Gets or sets a value indicating whether to page on server or client.
         */
        get sortOnServer(): boolean {
            return this._sortOnServer;
        }
        set sortOnServer(value: boolean) {
            var bValue: boolean = wijmo.asBoolean(value);
            if (this.sortOnServer == bValue) {
                return;
            }
            this._sortOnServer = bValue;
            if (this.sortDescriptions.length > 0 && this.canSort) {
                this._queryData();
            }
        }

         /**
         * Gets or sets a value indicating whether to sort on server or client.
         */
        get pageOnServer(): boolean {
            return this._pageOnServer;
        }
        set pageOnServer(value: boolean) {
            var bValue: boolean = wijmo.asBoolean(value);
            if (this.pageOnServer == bValue) {
                return;
            }
            this._pageOnServer = bValue;
            if (this.pageSize) {
                this._queryData();
            }
        }

        // send request for data
        private _queryData(): any {
            if (this._isRequesting) {
                window.setTimeout(this._queryData.bind(this), 100);
                return;
            }
            this._updateAjaxSettings();            
            this._requestData(this._serviceUrl + this._entityName, this._ajaxSettings);
        }

        // callback for query success
        private _continueSuccess(res) {
            this._querySuccess(res, true);
        }
        private _querySuccess(res, isContinued) {
            var resData = [],
                self = this,
                nextLink = res['odata.nextLink'];
            if (res.value) {
                resData = res.value;
            } else if (res.d) {
                resData = res.d;
                if (res.d.results) {
                    resData = res.d.results;
                }
            } else if ($.isArray(res)) {
                resData = res;
            }

            if (!isContinued) {
				this._items.length = 0;
            }

            $.each(resData, (_, item) => {
                self._convertItem(item, self._dataTypes);
                if (item.__metadata && item.__metadata.etag) {
                    item.etag = item.__metadata.etag;
                }                
                delete item.__metadata;
                self._items.push(item);
            });

            if (this._loadAllData && nextLink) {
                this._requestData(this._serviceUrl + nextLink, {
                    data: {
                        $format: 'verbosejson',
                    }
                }, true);
            } else {
                if (res['odata.count']) {
                    this._totalItemCount = parseInt(res['odata.count']);
                } else if (res.d && res.d.__count) {
                    this._totalItemCount = parseInt(res.d.__count);
                }
                this.moveCurrentToFirst();

                this.onCallback();
            }
        }
        private _success(res) {
            this._querySuccess(res, false);
        }

        // callback for query fail
        private _fail(xhr, textStatus, errorThrown) {
            this._isRequesting = false;
            throw textStatus + errorThrown;
        }

        private onCallback() {
            this._isRequesting = false;
            if (this._callback) {
                this._callback();
            }
        }

        // update the query ajax settings
        private _updateAjaxSettings() {
            this._updateSortAjaxSettings();
            this._upatePageAjaxSettings();
        }
        // update ajax setting for page
        private _upatePageAjaxSettings() {
            if (!this._ajaxSettings.data) {
                this._ajaxSettings.data = {};
            }

            if (this.pageOnServer && this.pageSize) {
                this._ajaxSettings.data.$top = this.pageSize;
                this._ajaxSettings.data.$skip = this.pageIndex * this.pageSize;
                this._ajaxSettings.data.$inlinecount = "allpages";
            } else {
                this._ajaxSettings.data.$top = undefined;
                this._ajaxSettings.data.$skip = undefined;            
                this._ajaxSettings.data.$inlinecount = "none";            
            }        
        }

        // update ajax setting for sort
        private _updateSortAjaxSettings() {
            if (!this._ajaxSettings.data) {
                this._ajaxSettings.data = {};
            }
            if (this.canSort && this.sortOnServer
                && this.sortDescriptions && this.sortDescriptions.length) {
                this._ajaxSettings.data.$orderby = this._getOrderByExpression();

            } else {
                this._ajaxSettings.data.$orderby = undefined;
            }
        }
        private _getOrderByExpression(): string {
            var strSort = "",
                sdCount = this.sortDescriptions.length;
            for (var i = 0; i < sdCount; i++) {
                var sd = <wijmo.collections.SortDescription>this.sortDescriptions[i];
                strSort += sd.property;
                if (sd.ascending) {
                    strSort += " asc";
                } else {
                    strSort += " desc";
                }
                if (i != sdCount - 1) {
                    strSort += ","
                }
            }
            return strSort;
        }

        // Get Data from OData service
        private _requestData(url: string, ajaxSettings: JQueryAjaxSettings, isContinued: boolean = false) {
            if (url) {
                this._isRequesting = true;
                $.ajax(url, $.extend({}, ajaxSettings, {
                    success: isContinued ? this._continueSuccess.bind(this) : this._success.bind(this),
                    error: this._fail.bind(this)
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
                            var value = item[k];
                            // convert json date to javascript date
                            if (type === wijmo.DataType.Date && value) {
                                value = value.replace("/Date(", "").replace(")/", "");
                                value = new Date(parseInt(value, 10));
                            }
                            item[k] = wijmo.changeType(value, type, null);
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
                jsonEntity = operationType === 'Delete' ? null : JSON.stringify(self._preProcessData(item)),
                dataDTO, etag;

            if (jsonEntity === '{}') {
                return;
            }

            if (item) {
                if (operationType !== 'Add') {
                    if (self._keys) {
                        $.each(self._keys, (_, key) => {
							var val = operationType === 'Update' ? self._edtClone[key] : item[key];
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
                    dataDTO = JSON.stringify(item);

                    if (operationType != "Add") {
                        dataDTO = JSON.parse(jsonEntity);

                        etag = !dataDTO ? item.etag : dataDTO.etag;

                        if (dataDTO) {
                            delete dataDTO.etag;
                            dataDTO.Created = new Date(dataDTO.Created);
                            dataDTO.Modified = new Date();

                            dataDTO = !jsonEntity ? null : JSON.stringify(dataDTO);
                        };

                    }
                    if (self._isRequesting) {
                        return;
                    }
                    self._isRequesting = true;
                    $.ajax(writeUrl, {
                        type: requestMethodType,
                        contentType: 'application/json;',
                        beforeSend: function (jqXHR, settings) {
                            if (settings.type == "PUT" || settings.type == "DELETE") {
                                if (etag) {
                                jqXHR.setRequestHeader("If-Match", etag);
                            }
                            }

                            if (settings.type != "DELETE") {
                                jqXHR.setRequestHeader("Accept", "application/atomsvc+xml;q=0.8, application/json;odata=fullmetadata;q=0.7, application/json;q=0.5, */*;q=0.1");
							}

							if (self._encodeCreds) {
								jqXHR.setRequestHeader('Authorization', 'Basic ' + self._encodeCreds);
							}
                        },
                        datatype: 'json',
                        data: jsonEntity,
                        success: function (data) {                            
                            if (operationType === 'Add') {
                                if (self._keys) {
                                    $.each(self._keys, (_, key) => {
                                        if (item[key] === null || item[key] === undefined) {
                                            item[key] = data[key];
                                            item.RowVersion = data["RowVersion"];
                                            if (data["odata.etag"]) {
                                                item.etag = data["odata.etag"];
                                            }
                                        }
                                    });
                                }
                                self.commitEdit();
							}
							self._isRequesting = false;
                        },
                        error: self._fail.bind(self)
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

        // Add a new handler when sortDescriptions is changed for sorting on server.
        private _sortDescHandler() {
            var arr = this.sortDescriptions;
            for (var i = 0; i < arr.length; i++) {
                var sd = wijmo.tryCast(arr[i], wijmo.collections.SortDescription);
                if (!sd) {
                    throw 'sortDescriptions array must contain SortDescription objects.';
                }
            }
            if (this.canSort) {
                if (this.sortOnServer) {
                    this._queryData();
                } else {
                    this.refresh();
                }
            }
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
			user?: string;
			password?: string;
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