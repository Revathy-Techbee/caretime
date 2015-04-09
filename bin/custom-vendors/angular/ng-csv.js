(function(window, document) {

    // Create all modules and define dependencies to make sure they exist
    // and are loaded in the correct order to satisfy dependency injection
    // before all nested files are concatenated by Grunt

    // Config
    angular.module('ngCsv.config', []).
    value('ngCsv.config', {
        debug: true
    }).
    config(['$compileProvider', function($compileProvider) {
        if (angular.isDefined($compileProvider.urlSanitizationWhitelist)) {
            $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
        } else {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
        }
    }]);

    // Modules
    angular.module('ngCsv.directives', ['ngCsv.services']);
    angular.module('ngCsv.services', []);
    angular.module('ngCsv', [
        'ngCsv.config',
        'ngCsv.services',
        'ngCsv.directives',
        'ngSanitize'
    ]);
    /**
     * Created by asafdav on 15/05/14.
     */
    angular.module('ngCsv.services').
    service('CSV', ['$q', function($q) {

        var EOL = encodeURIComponent('\r\n');
        var BOM = "%ef%bb%bf";
        var DATA_URI_PREFIX = "data:text/csv;charset=utf-8,";

        /**
         * Stringify one field
         * @param data
         * @param delimier
         * @returns {*}
         */
        this.stringifyField = function(data, delimier, quoteText) {
            if (typeof data === 'string') {
                data = data.replace(/"/g, '""'); // Escape double qoutes
                if (quoteText || data.indexOf(',') > -1 || data.indexOf('\n') > -1 || data.indexOf('\r') > -1) data = delimier + data + delimier;
                return encodeURIComponent(data);
            }

            if (typeof data === 'boolean') {
                return data ? 'TRUE' : 'FALSE';
            }

            return data;
        };

        /**
         * Creates a csv from a data array
         * @param data
         * @param options
         *  * header - Provide the first row (optional)
         *  * fieldSep - Field separator, default: ',',
         *  * addByteOrderMarker - Add Byte order mark, default(false)
         * @param callback
         */
        this.stringify = function(data, options) {
            var def = $q.defer();

            var that = this;
            var csv;
            var csvContent = "";

            var dataPromise = $q.when(data).then(function(responseData) {
                responseData = angular.copy(responseData);
                // Check if there's a provided header array
                if (angular.isDefined(options.header) && options.header) {
                    var encodingArray, headerString;

                    encodingArray = [];
                    angular.forEach(options.header, function(title, key) {
                        this.push(that.stringifyField(title, options.txtDelim, options.quoteStrings));
                    }, encodingArray);

                    headerString = encodingArray.join(options.fieldSep ? options.fieldSep : ",");
                    csvContent += headerString + EOL;
                }

                var arrData;

                if (angular.isArray(responseData)) {
                    arrData = responseData;
                } else {
                    arrData = responseData();
                }

                angular.forEach(arrData, function(row, index) {
                    var dataString, infoArray;

                    infoArray = [];

                    angular.forEach(row, function(field, key) {
                        this.push(that.stringifyField(field, options.txtDelim, options.quoteStrings));
                    }, infoArray);

                    dataString = infoArray.join(options.fieldSep ? options.fieldSep : ",");
                    csvContent += index < arrData.length ? dataString + EOL : dataString;
                });

                if (window.navigator.msSaveOrOpenBlob) {
                    csv = csvContent;
                } else {
                    csv = DATA_URI_PREFIX;
                    if (options.addByteOrderMarker) {
                        csv += BOM;
                    }
                    csv += csvContent;
                }
                def.resolve(csv);
            });

            if (typeof dataPromise['catch'] === 'function') {
                dataPromise['catch'](function(err) {
                    def.reject(err);
                });
            }

            return def.promise;
        };
    }]);
    (function(window, document) {

        // Create all modules and define dependencies to make sure they exist
        // and are loaded in the correct order to satisfy dependency injection
        // before all nested files are concatenated by Grunt

        // Config
        angular.module('ngCsv.config', []).
        value('ngCsv.config', {
            debug: true
        }).
        config(['$compileProvider', function($compileProvider) {
            if (angular.isDefined($compileProvider.urlSanitizationWhitelist)) {
                $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
            } else {
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);
            }
        }]);

        // Modules
        angular.module('ngCsv.directives', ['ngCsv.services']);
        angular.module('ngCsv.services', []);
        angular.module('ngCsv', [

            'ngCsv.config',
            'ngCsv.services',
            'ngCsv.directives',
            'ngSanitize'
        ]);
        /**
         * Created by asafdav on 15/05/14.
         */
        angular.module('ngCsv.services').
        service('CSV', ['$q', "Services", function($q, Services) {



            var EOL = encodeURIComponent('\r\n');
            var BOM = "%ef%bb%bf";
            var DATA_URI_PREFIX = "data:text/csv;charset=utf-8,";

            /**
             * Stringify one field
             * @param data
             * @param delimier
             * @returns {*}
             */
            this.stringifyField = function(data, delimier, quoteText) {
                if (typeof data === 'string') {
                    data = data.replace(/"/g, '""'); // Escape double qoutes
                    if (quoteText || data.indexOf(',') > -1 || data.indexOf('\n') > -1 || data.indexOf('\r') > -1) data = delimier + data + delimier;
                    return encodeURIComponent(data);
                }

                if (typeof data === 'boolean') {
                    return data ? 'TRUE' : 'FALSE';
                }

                return data;
            };

            /**
             * Creates a csv from a data array
             * @param data
             * @param options
             *  * header - Provide the first row (optional)
             *  * fieldSep - Field separator, default: ',',
             *  * addByteOrderMarker - Add Byte order mark, default(false)
             * @param callback
             */
            this.stringify = function(data, options) {
                var def = $q.defer();

                var that = this;
                var csv;
                var csvContent = "";
                //console.log(data);
                var dataPromise = $q.when(data).then(function(responseData) {
                    responseData = angular.copy(responseData);
                    // Check if there's a provided header array
                    if (angular.isDefined(options.header) && options.header) {
                        var encodingArray, headerString;

                        encodingArray = [];
                        angular.forEach(options.header, function(title, key) {
                            this.push(that.stringifyField(title, options.txtDelim, options.quoteStrings));
                        }, encodingArray);

                        headerString = encodingArray.join(options.fieldSep ? options.fieldSep : ",");
                        csvContent += headerString + EOL;
                    }

                    var arrData;
                    var resultarray = [];

                    function recursive_schedulefun(alldata, numcount, fdate, ldate) {


                        var sum_total = "0 {0h 0m}";

                        if (alldata[numcount]["sum(duriation)"]) {
                            sum_total = alldata[numcount]["sum(duriation)"] + formating_hours(floatToTime(alldata[numcount]["sum(duriation)"]));
                        }
                        var temp = JSON.parse(alldata[numcount].employee);
                        var name_id =  temp.text + '(' + temp.code + ')';
                        resultarray.push({
                            clockin: name_id,
                            clockout: "Employee Total",
                            time_float: sum_total
                        });

                        filterObjinner = {
                            fields: "job,ref_in_at,ref_in_at,duriation",
                            'include_count': true,
                            filter: "employee_code='" + alldata[numcount].employee_code + "' and ref_in_at >='" + fdate + "' and ref_out_at <='" + ldate + "'",
                            "order": "ref_in_at desc"
                        };

                        if (filterObjinner) {
                            return Services.shiftService.get(filterObjinner, function(remoteData) {
                                var indexval = 1;
                                var roundtime, roundtime_float, roundtime_num;
                                angular.forEach(remoteData.record, function(item, key) {
                                    var time_float = timeToFloat(item.duriation);
                                    var tempdata = JSON.parse(item.job);
                                    resultarray.push({
                                    	name:tempdata.text,
                                        clockin: item.ref_in_at,
                                        clockout: item.ref_in_at,
                                        time_float: time_float
                                       
                                        
                                    });

                                    indexval = indexval + 1;

                                });

                                numcount = +numcount + 1;

                                if (numcount < alldata.length)
                                	recursive_schedulefun(alldata, numcount, fdate, ldate);
                                else {
                                    console.log(resultarray);
                                    arrData = resultarray;
                                    angular.forEach(arrData, function(row, index) {
                                        var dataString, infoArray;

                                        infoArray = [];

                                        angular.forEach(row, function(field, key) {
                                            this.push(that.stringifyField(field, options.txtDelim, options.quoteStrings));
                                        }, infoArray);

                                        dataString = infoArray.join(options.fieldSep ? options.fieldSep : ",");
                                        csvContent += index < arrData.length ? dataString + EOL : dataString;
                                    });

                                    if (window.navigator.msSaveOrOpenBlob) {
                                        csv = csvContent;
                                    } else {
                                        csv = DATA_URI_PREFIX;
                                        if (options.addByteOrderMarker) {
                                            csv += BOM;
                                        }
                                        csv += csvContent;
                                    }
                                    def.resolve(csv);




                                }

                            });
                        }
                        // return false;

                    }

                    function recursive_fun(alldata, numcount, fdate, ldate) {


                        var sum_total = "0 {0h 0m}";

                        if (alldata[numcount]["sum(work_duration_rounded_number)"]) {
                            sum_total = alldata[numcount]["sum(work_duration_rounded_number)"] + formating_hours(floatToTime(alldata[numcount]["sum(work_duration_rounded_number)"]));
                        }

                        var name_id = alldata[numcount].employee_name + '(' + alldata[numcount].employee_code + ')';
                        resultarray.push({
                            clockin: name_id,
                            clockout: "Employee Rounded Total",
                            time_float: sum_total
                        });

                        filterObjinner = {
                            fields: "job_name ,clockin,clockout,work_duration,work_duration_rounded,work_duration_rounded_number",
                            'include_count': true,
                            filter: "employee_code='" + alldata[numcount].employee_code + "' and clockin >='" + fdate + "' and clockout <='" + ldate + "'",
                            "order": "clockin desc"
                        };

                        if (filterObjinner) {
                            return Services.employeeActivitiesService.get(filterObjinner, function(remoteData) {
                                var indexval = 1;
                                var roundtime, roundtime_float, roundtime_num;
                                angular.forEach(remoteData.record, function(item, key) {
                                    var time_float = timeToFloat(item.work_duration);
                                    if (item.work_duration_rounded) {
                                        roundtime_float = timeToFloat(item.work_duration_rounded);
                                        roundtime = formating_hours(item.work_duration_rounded);

                                    } else {
                                        roundtime_float = "0:0";
                                        roundtime = "0h 0m";
                                    }
                                    if (item.work_duration_rounded_number) {
                                        roundtime_num = item.work_duration_rounded_number;

                                    } else {
                                        roundtime_num = "0";
                                    }
                                    var work_duration = formating_hours(item.work_duration);
                                    resultarray.push({
                                    	name:item.job_name ,
                                        clockin: item.clockin,
                                        clockout: item.clockout,
                                        time_float: time_float,
                                        work_duration: work_duration,
                                        roundtime_num: roundtime_num,
                                        roundtime: roundtime
                                    });

                                    indexval = indexval + 1;

                                });

                                numcount = +numcount + 1;

                                if (numcount < alldata.length)
                                    recursive_fun(alldata, numcount, fdate, ldate);
                                else {
                                    console.log(resultarray);
                                    arrData = resultarray;
                                    angular.forEach(arrData, function(row, index) {
                                        var dataString, infoArray;

                                        infoArray = [];

                                        angular.forEach(row, function(field, key) {
                                            this.push(that.stringifyField(field, options.txtDelim, options.quoteStrings));
                                        }, infoArray);

                                        dataString = infoArray.join(options.fieldSep ? options.fieldSep : ",");
                                        csvContent += index < arrData.length ? dataString + EOL : dataString;
                                    });

                                    if (window.navigator.msSaveOrOpenBlob) {
                                        csv = csvContent;
                                    } else {
                                        csv = DATA_URI_PREFIX;
                                        if (options.addByteOrderMarker) {
                                            csv += BOM;
                                        }
                                        csv += csvContent;
                                    }
                                    def.resolve(csv);




                                }

                            });
                        }
                        // return false;

                    }
                    function recursivejoblevel_fun(alldata, numcount, fdate, ldate) {


                        var sum_total = "0 {0h 0m}";

                        if (alldata[numcount]["sum(work_duration_rounded_number)"]) {
                            sum_total = alldata[numcount]["sum(work_duration_rounded_number)"] + formating_hours(floatToTime(alldata[numcount]["sum(work_duration_rounded_number)"]));
                        }

                        var name_id = alldata[numcount].job_name  + '(' + alldata[numcount].Job_code + ')';
                        resultarray.push({
                        	name: name_id,
                            clockin: "Employee Rounded Total",
                            clockout: sum_total
                        });

                        filterObjinner = {
                            fields: "employee_name ,clockin,clockout,work_duration,work_duration_rounded,work_duration_rounded_number",
                            'include_count': true,
                            filter: "Job_code='" + alldata[numcount].Job_code + "' and clockin >='" + fdate + "' and clockout <='" + ldate + "'",
                            "order": "clockin desc"
                        };

                        if (filterObjinner) {
                            return Services.employeeActivitiesService.get(filterObjinner, function(remoteData) {
                                var indexval = 1;
                                var roundtime, roundtime_float, roundtime_num;
                                angular.forEach(remoteData.record, function(item, key) {
                                    var time_float = timeToFloat(item.work_duration);
                                    if (item.work_duration_rounded) {
                                        roundtime_float = timeToFloat(item.work_duration_rounded);
                                        roundtime = formating_hours(item.work_duration_rounded);

                                    } else {
                                        roundtime_float = "0:0";
                                        roundtime = "0h 0m";
                                    }
                                    if (item.work_duration_rounded_number) {
                                        roundtime_num = item.work_duration_rounded_number;

                                    } else {
                                        roundtime_num = "0";
                                    }
                                    var work_duration = formating_hours(item.work_duration);
                                    resultarray.push({
                                    	name:item.employee_name ,
                                        clockin: item.clockin,
                                        clockout: item.clockout,
                                        time_float: time_float,
                                        work_duration: work_duration,
                                        roundtime_num: roundtime_num,
                                        roundtime: roundtime
                                    });

                                    indexval = indexval + 1;

                                });

                                numcount = +numcount + 1;

                                if (numcount < alldata.length)
                                	recursivejoblevel_fun(alldata, numcount, fdate, ldate);
                                else {
                                    arrData = resultarray;
                                    angular.forEach(arrData, function(row, index) {
                                        var dataString, infoArray;

                                        infoArray = [];

                                        angular.forEach(row, function(field, key) {
                                            this.push(that.stringifyField(field, options.txtDelim, options.quoteStrings));
                                        }, infoArray);

                                        dataString = infoArray.join(options.fieldSep ? options.fieldSep : ",");
                                        csvContent += index < arrData.length ? dataString + EOL : dataString;
                                    });

                                    if (window.navigator.msSaveOrOpenBlob) {
                                        csv = csvContent;
                                    } else {
                                        csv = DATA_URI_PREFIX;
                                        if (options.addByteOrderMarker) {
                                            csv += BOM;
                                        }
                                        csv += csvContent;
                                    }
                                    def.resolve(csv);




                                }

                            });
                        }
                        // return false;

                    }
                    if (angular.isArray(responseData)) {
                        arrData = responseData;
                    } else {
                        if (responseData.report == 'timecard') {
                            if (responseData.employeecode != 'all')
                                filterObj = {
                                    fields: "employee_code,employee_name,sum(work_duration_rounded_number)",
                                    'include_count': true,
                                    filter: "employee_code='" + responseData.employeecode + "' and clockin >='" + responseData.fdate + "' and clockout <='" + responseData.ldate + "' GROUP BY employee_code",
                                    "order": "employee_code,clockin desc"
                                };
                            else if (responseData.zonecode != 'all')
                                filterObj = {
                                    fields: "employee_code,employee_name,sum(work_duration_rounded_number)",
                                    'include_count': true,
                                    filter: "Zone_code='" + responseData.zonecode + "' and clockin >='" + responseData.fdate + "' and clockout <='" + responseData.ldate + "' GROUP BY employee_code",
                                    "order": "employee_code,clockin desc"
                                };
                            else
                                filterObj = {
                                    fields: "employee_code,employee_name,sum(work_duration_rounded_number)",
                                    'include_count': true,
                                    filter: "clockin >='" + responseData.fdate + "' and clockout <='" + responseData.ldate + "' GROUP BY employee_code ",
                                    "order": "employee_code,clockin desc"
                                };

                            Services.employeeActivitiesService.get(filterObj, function(remoteData) {
                                if (remoteData.meta.count!=0) {
                                    recursive_fun(remoteData.record, '0', responseData.fdate, responseData.ldate);

                                }
                                else
                                	{
                                	//$scope.$emit('error_msg', 'Test');
                                	alert("No data Available");
                                	}



                            });


                        } else if (responseData.report == 'schedule') {
                            if (responseData.employeecode != 'all')
                                filterObj = {
                                    fields: "employee_code,employee,sum(duriation)",
                                    'include_count': true,
                                    filter: "employee_code='" + responseData.employeecode + "' and ref_in_at >='" + responseData.fdate + "' and ref_out_at <='" + responseData.ldate + "' GROUP BY employee_code",
                                    "order": "employee_code,ref_in_at desc"
                                };
                            else if (responseData.zonecode != 'all')
                                filterObj = {
                                    fields: "employee_code,employee,sum(duriation)",
                                    'include_count': true,
                                    filter: "zone_id ='" + responseData.zonecode + "' and ref_in_at >='" + responseData.fdate + "' and ref_out_at <='" + responseData.ldate + "' GROUP BY employee_code",
                                    "order": "employee_code,ref_in_at desc"
                                };
                            	
                            else
                                filterObj = {
                                    fields: "employee_code,employee,sum(duriation)",
                                    'include_count': true,
                                    filter: "ref_in_at >='" + responseData.fdate + "' and ref_out_at <='" + responseData.ldate + "' GROUP BY employee_code ",
                                    "order": "employee_code,ref_in_at desc"
                                };

                            Services.shiftService.get(filterObj, function(remoteData) {
                                if (remoteData.meta.count!=0) {
                                	recursive_schedulefun(remoteData.record, '0', responseData.fdate, responseData.ldate);

                                }
                                else
                                	alert("No data Available");
                                



                            });

                        }
                        else if (responseData.report == 'joblevel') {
                            if (responseData.jobcode != 'all')
                                filterObj = {
                                    fields: "Job_code,job_name,sum(work_duration_rounded_number)",
                                    'include_count': true,
                                    filter: "Job_code='" + responseData.jobcode + "' and clockin >='" + responseData.fdate + "' and clockout <='" + responseData.ldate + "' GROUP BY Job_code",
                                    "order": "Job_code,clockin desc"
                                };
                            else if (responseData.zonecode != 'all')
                                filterObj = {
                                    fields: "Job_code,job_name,sum(work_duration_rounded_number)",
                                    'include_count': true,
                                    filter: "Zone_code ='" + responseData.zonecode + "' and clockin >='" + responseData.fdate + "' and clockout <='" + responseData.ldate + "' GROUP BY Job_code",
                                    "order": "Job_code,clockin desc"
                                };
                            else
                                filterObj = {
                                    fields: "Job_code,job_name,sum(work_duration_rounded_number)",
                                    'include_count': true,
                                    filter: "clockin >='" + responseData.fdate + "' and clockout <='" + responseData.ldate + "' GROUP BY Job_code ",
                                    "order": "Job_code,clockin desc"
                                };

                            Services.employeeActivitiesService.get(filterObj, function(remoteData) {
                                if (remoteData.meta.count!=0) {
                                	recursivejoblevel_fun(remoteData.record, '0', responseData.fdate, responseData.ldate);

                                }
                                else
                                	alert("No data Available");



                            });


                        }
                        else if (responseData.report == 'scheduleActivity') {
                        var filterObj = {
                                    'include_count': true,
                                    'order': 'id desc',
                                    'filter': responseData.filterName + ' like "%' + responseData.filterValue + '%" and call_status like "%' + responseData.call_status + '%"'
                                };
                       	  Services.timeLog.get(filterObj, function(data) {
                                   if(data.meta.count != 0)  
                                   	{
                                   	var empcode = [];
                                       var jobcode = [];
                                       var calllogLists = {};
                                        var jobnameLists = {};
                                       angular.forEach(data.record, function(value, key) {
                                           if (value.employee_code)
                                               empcode.push(value.employee_code);
                                           if (value.job_code)
                                               jobcode.push(value.job_code);
                                       });
                                       filterObj = {
                                           'include_count': true,
                                           'fields': 'first_name,last_name,access_code',
                                           'filter': 'access_code  IN (' + empcode + ')'
                                       };
                                       Services.employeeService.get(filterObj, function(employeenameresult) {
                                           angular.forEach(employeenameresult.record, function(value, key) {
                                               if (value.access_code)
                                                   calllogLists[value.access_code] = value.last_name + ' ' + value.first_name;
                                           });
                                           filterObj2 = {
                                                   'include_count': true,
                                                   'fields': 'job_name ,job_code',
                                                   'filter': 'job_code   IN (' + jobcode + ')'
                                               };
                                               Services.jobService.get(filterObj2, function(jobnameresult) {

                                                   angular.forEach(jobnameresult.record, function(value, key) {
                                                       if (value.job_code)
                                                           jobnameLists[value.job_code] = value.job_name;
                                                   });
                                                 
                                                   angular.forEach(data.record, function(value, key) {
                                                   	//console.log("key "+key+ "value "+value+"<br>");
                                                   	var logtype;
                                                   	var duration=' ';
                                                   	var phone=' ';
                                                   	var empname=' ';
                                                   	var jobname=' ';
                                                   	
                                                   	if(value.phone_number)
                                                   		phone=value.phone_number
                                                   	if(value.call_duriation)
                                                   		duration=value.call_duriation;
                                                   	if(value.log_type==2)
                                               		{
                                               		logtype="Clock-Out";
                                               		}
                                                   	else
                                               		{
                                               		logtype="Clock-In";
                                               		}
                                                   	if(calllogLists[value.employee_code])	
                                                   	 empname=calllogLists[value.employee_code];
                                                   	if(jobnameLists[value.job_code])	
                                                   	 jobname=jobnameLists[value.job_code];
                                                   	resultarray.push({
                                                   		empname:empname,
                                                   		jobname: jobname,
                                                   		logtype: logtype,
                                                   		duration: duration,
                                                   		phone:phone,
                                                   		call_status:value.call_status,
                                                   		created_on:value.created_on
                                                   		
                                                       
                                                        
                                                    })
                                                     // resultarray.push([empname ,jobname,logtype, duration,phone,value.call_status,value.created_on]);
                                                   });
                                                   arrData = resultarray;
                                                   angular.forEach(arrData, function(row, index) {
                                                       var dataString, infoArray;

                                                       infoArray = [];

                                                       angular.forEach(row, function(field, key) {
                                                           this.push(that.stringifyField(field, options.txtDelim, options.quoteStrings));
                                                       }, infoArray);

                                                       dataString = infoArray.join(options.fieldSep ? options.fieldSep : ",");
                                                       csvContent += index < arrData.length ? dataString + EOL : dataString;
                                                   });

                                                   if (window.navigator.msSaveOrOpenBlob) {
                                                       csv = csvContent;
                                                   } else {
                                                       csv = DATA_URI_PREFIX;
                                                       if (options.addByteOrderMarker) {
                                                           csv += BOM;
                                                       }
                                                       csv += csvContent;
                                                   }
                                                   def.resolve(csv);
                                                 
                                                   
                                                   

                                               })

                                       })
                                   	}
                                   else
                                   	{
                                	   alert("No data Available");
                                   	}
                                  
                                 
                             })


                        }
                        return false;


                    }

                    angular.forEach(arrData, function(row, index) {
                        var dataString, infoArray;

                        infoArray = [];

                        angular.forEach(row, function(field, key) {
                            this.push(that.stringifyField(field, options.txtDelim, options.quoteStrings));
                        }, infoArray);

                        dataString = infoArray.join(options.fieldSep ? options.fieldSep : ",");
                        csvContent += index < arrData.length ? dataString + EOL : dataString;
                    });

                    if (window.navigator.msSaveOrOpenBlob) {
                        csv = csvContent;
                    } else {
                        csv = DATA_URI_PREFIX;
                        if (options.addByteOrderMarker) {
                            csv += BOM;
                        }
                        csv += csvContent;
                    }
                    def.resolve(csv);
                });

                if (typeof dataPromise['catch'] === 'function') {
                    dataPromise['catch'](function(err) {
                        def.reject(err);
                    });
                }

                return def.promise;
            };
        }]);
        /**
         * ng-csv module
         * Export Javascript's arrays to csv files from the browser
         *
         * Author: asafdav - https://github.com/asafdav
         */
        angular.module('ngCsv.directives').
        directive('ngCsv', ['$parse', '$q', 'CSV', '$document', '$timeout', function($parse, $q, CSV, $document, $timeout) {
            return {
                restrict: 'AC',
                scope: {
                    data: '&ngCsv',
                    filename: '@filename',
                    header: '&csvHeader',
                    txtDelim: '@textDelimiter',
                    quoteStrings: '@quoteStrings',
                    fieldSep: '@fieldSeparator',
                    lazyLoad: '@lazyLoad',
                    addByteOrderMarker: "@addBom",
                    ngClick: '&'
                },
                controller: [
                    '$scope',
                    '$element',
                    '$attrs',
                    '$transclude',
                    function($scope, $element, $attrs, $transclude) {
                        $scope.csv = '';

                        if (!angular.isDefined($scope.lazyLoad) || $scope.lazyLoad != "true") {
                            if (angular.isArray($scope.data)) {
                                $scope.$watch("data", function(newValue) {
                                    $scope.buildCSV();
                                }, true);
                            }
                        }

                        $scope.getFilename = function() {
                            return $scope.filename || 'download.csv';
                        };

                        function getBuildCsvOptions() {
                            var options = {
                                txtDelim: $scope.txtDelim ? $scope.txtDelim : '"',
                                quoteStrings: $scope.quoteStrings,
                                addByteOrderMarker: $scope.addByteOrderMarker
                            };
                            if (angular.isDefined($attrs.csvHeader)) options.header = $scope.$eval($scope.header);
                            options.fieldSep = $scope.fieldSep ? $scope.fieldSep : ",";

                            return options;
                        }

                        /**
                         * Creates the CSV and updates the scope
                         * @returns {*}
                         */
                        $scope.buildCSV = function() {
                            var deferred = $q.defer();

                            $element.addClass($attrs.ngCsvLoadingClass || 'ng-csv-loading');

                            CSV.stringify($scope.data(), getBuildCsvOptions()).then(function(csv) {
                                $scope.csv = csv;
                                $element.removeClass($attrs.ngCsvLoadingClass || 'ng-csv-loading');
                                deferred.resolve(csv);
                            });
                            $scope.$apply(); // Old angular support

                            return deferred.promise;
                        };
                    }
                ],
                link: function(scope, element, attrs) {
                    function doClick() {
                        if (window.navigator.msSaveOrOpenBlob) {
                            var blob = new Blob([scope.csv], {
                                type: "text/csv;charset=utf-8;"
                            });
                            navigator.msSaveBlob(blob, scope.getFilename());
                        } else {

                            var downloadLink = angular.element('<a></a>');
                            downloadLink.attr('href', scope.csv);
                            downloadLink.attr('download', scope.getFilename());

                            $document.find('body').append(downloadLink);
                            $timeout(function() {
                                downloadLink[0].click();
                                downloadLink.remove();
                            }, null);
                        }

                    }

                    element.bind('click', function(e) {
                        scope.buildCSV().then(function(csv) {
                            doClick();
                        });
                        scope.$apply();
                    });
                }
            };
        }]);
    })(window, document);
})(window, document);