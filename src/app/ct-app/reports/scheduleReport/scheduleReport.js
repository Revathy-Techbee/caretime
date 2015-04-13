angular.module('ctApp.scheduleReport', [
    'ui.router',
    'wj'

])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.scheduleReport', {
        url: '/scheduleReport',
        views: {
            "appNested": {
                controller: 'ScheduleReportCtrl',
                templateUrl: 'ct-app/reports/scheduleReport/scheduleReport.tpl.html'
            }
        },
        data: {
            pageTitle: 'Schedule Reporting',
            access: access.scheduleReport
        }
    });

}])


.controller("ScheduleReportCtrl", ["$scope", "Services", "HelperService", "$timeout", "$localStorage", function($scope, Services, HelperService, $timeout, $localStorage) {
    $scope.reportFilters = {};
    $scope.reportFilters.field = '';
    $scope.reportFilters.zone = null;
     if($localStorage.user_info.iszone_code){

            Services.getEmpZoneDetail().then(function(res) {
            
            $scope.reportFilters.zone=[{"text": res.data.record[0]["zone_name"],
                                "id": res.data.record[0]["id"],
                                "code": res.data.record[0]["zone_code"]}];
            
        });
}
    $scope.reportFilters.field_value = '';
    $scope.showerrorMsg = false;
    $scope.show_download_loader = false;
    $scope.call_limit = 500;
    $scope.showRecord = 0;
    $scope.show_activities_loader = false;
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    $scope.reportFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
    $scope.reportFilters.endDate = moment(lastDay).format("YYYY-MM-DD");


    $scope.loadData = function(fdate, ldate, zone, fieldname, fieldval, offset) {
        var filterObj = {
            'fields': "employee,job,employee_code,job_id,ref_in_at,ref_out_at,duriation",
            'limit': $scope.call_limit,
            'offset': offset,
            'include_count': true,
            'order': fieldname.id+' desc',
            'filter': "employee_code<>'' and job_id<>'' and ref_in_at >='" + fdate + "' and ref_out_at <='" + ldate + "'  and agency_id = " + Services.getAgencyID()
        };
        if (fieldval && !angular.isUndefined(fieldval.code) && fieldval.code) {
            filterObj.filter = filterObj.filter + ' and ' + fieldname.id + ' = "' + fieldval.code + '"';
            

        } else if ($scope.zone_id) {
            filterObj.filter = filterObj.filter + ' and zone_id in(' + $scope.zone_id + ')';

        } 

        Services.shiftService.get(filterObj, function(data) {
            angular.forEach(data.record, function(item, key) {
                var employeeTemp =(item.employee)?JSON.parse(item.employee):"";
                var jobTemp = (item.job)?JSON.parse(item.job):"";
                $scope.resultData.push({
                        "employee_code": item.employee_code,
                        "employee_name": employeeTemp.text + ' (' + item.employee_code + ')',
                        "job_id": item.job_id,
                        "job_name": jobTemp.text + ' (' + item.job_id + ')',
                        "ref_in_at": HelperService.formatUTCOnlyDate(item.ref_in_at,$localStorage.user_info.country),
                        "startTime": HelperService.formatOnlyTime(item.ref_in_at),
                        "endDate": HelperService.formatUTCOnlyDate(item.ref_out_at,$localStorage.user_info.country),
                        "endTime": HelperService.formatOnlyTime(item.ref_out_at),
                        "duriation": (item.duriation)?Number(item.duriation):Number(0)



                    }


                );


            });
            if (data.meta.count > (offset + $scope.call_limit)) {

                var nextOffset = offset + $scope.call_limit + 1;
                $scope.loadData(fdate, ldate, zone, fieldname, fieldval, nextOffset);
            } else {
                $scope.show_activities_loader = false;
                if ($scope.resultData.length !== 0) {
                    $scope.noRecord = 0;
                    $scope.showRecord = 1;
                    $scope.ctx = {
                        flexGrid: null,
                        data: $scope.resultData,
                        includeColumnHeader: true
                    };
                    $scope.EmployeeDetails = new wijmo.collections.CollectionView($scope.resultData);
                    $scope.EmployeeDetails.pageSize = 10;
                    if (fieldname && !angular.isUndefined(fieldname.id) && fieldname.id) {
                        $scope.groupBy = fieldname.id;

                    } else {
                        $scope.groupBy = 'employee_code';
                    }

                    var cv = $scope.EmployeeDetails;
                    cv.groupDescriptions.clear(); // clear current groups
                    if ($scope.groupBy) {
                        var groupNames = $scope.groupBy.split(',');
                        for (var i = 0; i < groupNames.length; i++) {
                            var groupName = groupNames[i];
                            var groupDesc = new wijmo.collections.PropertyGroupDescription(groupName);
                            cv.groupDescriptions.push(groupDesc);

                        }
                    }



                } else {
                    $scope.noRecord = 1;
                    $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
                }

            }
        });

    };
    $scope.exportExcel = function() {
        if ($scope.noRecord === 0) {
            var pageSize = $scope.ctx.flexGrid.collectionView.pageSize;
            $scope.ctx.flexGrid.collectionView.pageSize = 0;
            var result = wijmo.grid.ExcelConverter.export($scope.ctx.flexGrid, {
                includeColumnHeader: $scope.ctx.includeColumnHeader
            });
            $scope.ctx.flexGrid.collectionView.pageSize = pageSize;
            if (navigator.msSaveBlob) {
                var blob = new Blob([result.base64Array]);

                navigator.msSaveBlob(blob, $('#export').attr("download"));
            } else {
                $('#export')[0].href = result.href();
            }
        }
    };

    $scope.updateTableData = function(isFilter) { // on limit change

        if ($scope.reportFilters.startDate && $scope.reportFilters.endDate) {

            if (Date.parse($scope.reportFilters.startDate) > Date.parse($scope.reportFilters.endDate)) {
                $scope.showerrorMsg = true;
                $scope.error_msg = "Invalid Date";
                $timeout(function() {
                    $scope.showerrorMsg = false;
                }, 3000);
                return false;
            }
        } else {
            $scope.showerrorMsg = true;
            $scope.error_msg = "Please Select Date";
            $timeout(function() {
                $scope.showerrorMsg = false;
            }, 3000);
            return false;
        }


        if ($scope.reportFilters.zone == null || angular.isUndefined($scope.reportFilters.zone[0]) || (($scope.reportFilters.field === "" || $scope.reportFilters.field_value === "") && ($scope.reportFilters.zone[0].id !== "all" && $scope.reportFilters.field_value.id !== "all" && $scope.reportFilters.field.id !== 'ref_in_at'))) {

            $scope.showerrorMsg = true;
            $scope.error_msg = "Please use the required filters";
            $timeout(function() {
                $scope.showerrorMsg = false;
            }, 3000);

            return false;

        }


        $scope.showRecord = 0;
        $scope.resultData = [];
        $scope.noRecord = 0;
        $scope.show_activities_loader = true;
        var fdate = moment(moment($scope.reportFilters.startDate).format('YYYY-MM-DD')).utc().format('YYYY-MM-DD HH:mm');
        var a = moment(moment($scope.reportFilters.endDate).format('YYYY-MM-DD'));
        var addObj = a.add('24', 'hours');
        var ldatehrs = addObj.toDate();
        var ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
        // $scope.zone_id = HelperService.getAsArray($scope.reportFilters.zone, 'code');
        /*$scope.zone_nameid = HelperService.getCode_Name($scope.reportFilters.zone, 'code', 'text');
        $scope.zone_id =$scope.zone_nameid.Code;
        $scope.zone_name =$scope.zone_nameid.Code_Name;*/
        mixpanelObj = {
            "Field": $scope.reportFilters.field.text,
            "Zone": ($scope.zone_name ? $scope.zone_name : "All"),
            "Start Date": '"' + moment($scope.reportFilters.startDate).format('MM/DD/YYYY') + '"',
            "End Date": '"' + moment($scope.reportFilters.endDate).format('MM/DD/YYYY') + '"',
            "Agency": Services.serviceName
        };

        if ($scope.reportFilters.field_value && !angular.isUndefined($scope.reportFilters.field_value.code)) {
            var temp_fieldvalue = "All";
            if ($scope.reportFilters.field_value.code) {
                temp_fieldvalue = $scope.reportFilters.field_value.text + ' (' + $scope.reportFilters.field_value.code + ')';
            }
            if ($scope.reportFilters.field.id == 'job_id') {
                mixpanelObj.Job = temp_fieldvalue;
            } else {
                mixpanelObj.Employee = temp_fieldvalue;
            }


        }
        mixpanel.track("Schedule Reporting", mixpanelObj);
        $scope.loadData(fdate, ldate, $scope.reportFilters.zone, $scope.reportFilters.field, $scope.reportFilters.field_value, 0);


    };
    $scope.noRecord = 1;
    $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Schedule Report');
    $scope.clearSearch = function() {
        $scope.reportFilters.zone = null;
         if($localStorage.user_info.iszone_code){

            Services.getEmpZoneDetail().then(function(res) {
            
            $scope.reportFilters.zone=[{"text": res.data.record[0]["zone_name"],
                                "id": res.data.record[0]["id"],
                                "code": res.data.record[0]["zone_code"]}];
            
        });
}
        $scope.reportFilters.field = '';
        $scope.reportFilters.field_value = '';
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        $scope.reportFilters.startDate = moment(firstDay).format("YYYY-MM-DD");
        $scope.reportFilters.endDate = moment(lastDay).format("YYYY-MM-DD");
        //$scope.updateTableData();
        $scope.noRecord = 1;
        $scope.showRecord = 0;
        $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Schedule Report');

    };

    $scope.downloadpdf = function() {
        $scope.show_download_loader = true;
        $scope.zone_id = HelperService.getAsArray($scope.reportFilters.zone, 'code');
        $scope.resultarray = {};
        var fdate = moment(moment($scope.reportFilters.startDate).format('YYYY-MM-DD')).utc().format('YYYY-MM-DD HH:mm');
        var a = moment(moment($scope.reportFilters.endDate).format('YYYY-MM-DD'));
        var addObj = a.add('24', 'hours');
        var ldatehrs = addObj.toDate();
        var ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');

        if (Date.parse($scope.reportFilters.startDate) > Date.parse($scope.reportFilters.endDate)) {
            $scope.showerrorMsg = true;
            $scope.show_download_loader = false;
            $scope.error_msg = "Invalid Date";
            $timeout(function() {
                $scope.showerrorMsg = false;
            }, 3000);
            return false;
        } else {
            $scope.showimg = true;
            $scope.numcount = 0;

            $scope.downlodFilterObj = {
                'include_count': true,
                'filter': 'employee_code<>"" and job_id<>"" and ref_in_at >="' + fdate + '" and ref_out_at <="' + ldate + '" and agency_id = ' + Services.getAgencyID(),
                "order": "id desc"
            };



            if ($scope.reportFilters.field_value && !angular.isUndefined($scope.reportFilters.field_value.code) && $scope.reportFilters.field_value.code) {


                if ($scope.reportFilters.field.id == 'job_id') {

                    $scope.downlodFilterObj.filter = $scope.downlodFilterObj.filter + ' and job_id="' + $scope.reportFilters.field_value.code+'"';
                } else {
                    $scope.downlodFilterObj.filter = $scope.downlodFilterObj.filter + ' and employee_code="' + $scope.reportFilters.field_value.code+'"';

                }
                



            } else if ($scope.zone_id) {
                //  console.log($scope.reportFilters.field);
                $scope.downlodFilterObj.filter = $scope.downlodFilterObj.filter + ' and zone_id in(' + $scope.zone_id + ')';
            } 

            if ($scope.reportFilters.field.id == 'ref_in_at') {
                $scope.downlodFilterObj.fields ='ref_in_at,in_date ,job_id ,sum(duriation)';
                $scope.downlodFilterObj.filter =$scope.downlodFilterObj.filter+ '  GROUP BY in_date';

            } else if ($scope.reportFilters.field.id == 'job_id') {
                $scope.downlodFilterObj.fields ='job ,job_id ,sum(duriation)';
                $scope.downlodFilterObj.filter = $scope.downlodFilterObj.filter+ '  GROUP BY job_id';

            } else {
                $scope.downlodFilterObj.fields ='employee,employee_code,sum(duriation)';
                $scope.downlodFilterObj.filter = $scope.downlodFilterObj.filter+'  GROUP BY employee_code';

            }

            $scope.docDefinition = {
                pageSize: 'A5',
                pageOrientation: 'landscape',
                content: [],
                header: [],
                styles: {
                    header: {
                        fontSize: 10,
                        bold: true,
                        margin: [42, 5, 42, 40],
                        bordercolor: '#a0c33a',
                        fillColor: '#E5E5E5',
                    },
                    subheader: {
                        fontSize: 8,
                        fillColor: '#F9E0A0',
                        margin: [0, 5, 0, 5],

                    },
                    tableExample: {
                        fontSize: 8,
                        margin: [0, 5, 0, 15],

                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 8,
                        color: 'black',
                        fillColor: '#F9E0A0',

                    }
                },
                defaultStyle: {}
            };

            Services.shiftService.get($scope.downlodFilterObj, function(remoteData) {

                if (remoteData.meta.count !== 0) {
                    $scope.resultarray = {};
                    $scope.recursivefun(remoteData.record);
                } else {
                    $scope.showimg = false;
                    $scope.showerrorMsg = true;
                    $scope.show_download_loader = false;
                    $scope.error_msg = "No data Available";
                    $timeout(function() {
                        $scope.showerrorMsg = false;
                    }, 3000);
                    return false;
                }


            });
        }

    };
    $scope.recursivefun = function(alldata) {
        if (alldata) {
            data = alldata;
            totaldata = alldata.length;
        }
        var sum_total, name_id, temp;
        var fdate = moment(moment($scope.reportFilters.startDate).format('YYYY-MM-DD')).utc().format('YYYY-MM-DD HH:mm');
        var a = moment(moment($scope.reportFilters.endDate).format('YYYY-MM-DD'));
        var addObj = a.add('24', 'hours');
        var ldatehrs = addObj.toDate();
        var ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
        var det = "Schedule Reporting from " + moment($scope.reportFilters.startDate).format('MM-DD-YYYY') + " to " + moment($scope.reportFilters.endDate).format('MM-DD-YYYY');


        if ($scope.reportFilters.field.id == 'ref_in_at') {
            $scope.resultarray[data[$scope.numcount].in_date] = [];
            sum_total = "Date Total 0 ";

            if (data[$scope.numcount].in_date, data[$scope.numcount]["sum(duriation)"]) {
                sum_total = "Date Total " + parseFloat(Math.round((data[$scope.numcount]["sum(duriation)"]) * 120) / 120).toFixed(2);
            }

            name_id = HelperService.fullDateFormat(data[$scope.numcount].in_date);

            $scope.resultarray[data[$scope.numcount].in_date].push([{
                colSpan: 4,
                style: 'subheader',
                text: name_id
            }, "", "", "", {

                style: 'subheader',
                text: sum_total
            }]);
            $scope.resultarray[data[$scope.numcount].in_date].push([{
                text: 'Job Name',
                style: 'tableHeader',
                alignment: 'center'
            }, {
                text: 'Employee Name',
                style: 'tableHeader',
                alignment: 'center'
            }, {
                text: 'Start Date',
                style: 'tableHeader',
                alignment: 'center'
            }, {
                text: 'End Date',
                style: 'tableHeader',
                alignment: 'center'
            }, {
                text: 'Total Hours',
                style: 'tableHeader',
                alignment: 'center'
            }]);
            $scope.filterObjinner = {
                fields: "job,employee ,ref_in_at,ref_out_at,duriation",
                'include_count': true,
                filter: "employee_code<>'' and job_id<>'' and in_date='" + data[$scope.numcount].in_date + "' and ref_in_at >='" + fdate + "' and ref_out_at <='" + ldate + "' and agency_id = " + Services.getAgencyID(),
                "order": "id desc"
            };
            if ($scope.zone_id) {
                $scope.filterObjinner.filter = $scope.filterObjinner.filter + ' and  zone_id in(' + $scope.zone_id + ')';

            } 
            if ($scope.filterObjinner) {
                Services.shiftService.get($scope.filterObjinner, function(remoteData) {
                    var indexval = 1;
                    angular.forEach(remoteData.record, function(item, key) {
                        var temp =(item.employee)?JSON.parse(item.employee):"";
                        var temp2 =(item.job)?JSON.parse(item.job):"";
                        $scope.resultarray[data[$scope.numcount].in_date].push([{
                            'text': temp2.text + '(' + temp2.id + ')',
                            'fillColor': '#E5E5E5'
                        }, {
                            'text': temp.text + '(' + temp.code + ')',
                            'fillColor': '#E5E5E5'
                        }, {
                            'text': HelperService.formatingDate(item.ref_in_at,$localStorage.user_info.country), //moment(item.ref_in_at).utc().format('MM-DD-YYYY HH:mm'),
                            'fillColor': '#E5E5E5'
                        }, {
                            'text': HelperService.formatingDate(item.ref_out_at,$localStorage.user_info.country), //moment(item.ref_out_at).utc().format('MM-DD-YYYY HH:mm'),
                            'fillColor': '#E5E5E5'
                        }, {
                            'text': item.duriation,
                            'fillColor': '#E5E5E5'
                        }]);
                        indexval = indexval + 1;

                    });
                    $scope.numcount = $scope.numcount + 1;
                    if ($scope.numcount < totaldata) {
                        $scope.recursivefun();
                    } else {
                        Services.agencyDetail.get({
                            id: Services.getAgencyID()
                        }, function(data) {
                            $scope.agency_name = data.agency_name;

                            angular.forEach($scope.resultarray, function(item, key) {
                                $scope.docDefinition["header"].push({
                                    style: 'header',
                                    columns: [{
                                        text: $scope.agency_name,
                                        width: 150
                                    }, {
                                        text: det,
                                        alignment: 'right',
                                        width: 350
                                    }]

                                });
                                $scope.docDefinition["content"].push({
                                    style: 'tableExample',
                                    table: {
                                        widths: [100, 100, 100, 100, 100],
                                        body: $scope.resultarray[key]
                                    },
                                    layout: {
                                        fillColor: '#E5E5E5',
                                        hLineWidth: function(i, node) {
                                            return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                        },
                                        vLineWidth: function(i, node) {
                                            return 1;
                                        },
                                        hLineColor: function(i, node) {
                                            return "#fff";
                                        },
                                        vLineColor: function(i, node) {
                                            return "#fff";
                                        }
                                    }
                                });
                            });
                            $scope.showimg = false;
                            $scope.show_download_loader = false;
                            pdfMake.createPdf($scope.docDefinition).download();
                        });

                    }

                });
            }


        } else if ($scope.reportFilters.field.id == 'job_id') {
            $scope.resultarray[data[$scope.numcount].job_id] = [];
            sum_total = "Job Total 0 ";

            if (data[$scope.numcount].job_id, data[$scope.numcount]["sum(duriation)"]) {
                sum_total = "Job Total " + parseFloat(Math.round((data[$scope.numcount]["sum(duriation)"]) * 100) / 100).toFixed(2);
            }
            temp =(data[$scope.numcount].job)? JSON.parse(data[$scope.numcount].job):"";
            name_id = temp.text + '(' + temp.id + ')';



            $scope.resultarray[data[$scope.numcount].job_id].push([{
                colSpan: 3,
                style: 'subheader',
                text: name_id
            }, "", "", {
                style: 'subheader',
                text: sum_total
            }]);
            $scope.resultarray[data[$scope.numcount].job_id].push([{
                text: 'Employee Name',
                style: 'tableHeader',
                alignment: 'center'
            }, {
                text: 'Start Date',
                style: 'tableHeader',
                alignment: 'center'
            }, {
                text: 'End Date',
                style: 'tableHeader',
                alignment: 'center'
            }, {
                text: 'Total Hours',
                style: 'tableHeader',
                alignment: 'center'
            }]);

            $scope.filterObjinner = {
                fields: "employee,ref_in_at,ref_out_at,duriation",
                'include_count': true,
                filter: "employee_code<>'' and job_id<>'' and job_id='" + data[$scope.numcount].job_id + "' and ref_in_at >='" + fdate + "' and ref_out_at <='" + ldate + "' and agency_id = " + Services.getAgencyID(),
                "order": "id desc"
            };


            if ($scope.zone_id) {
                $scope.filterObjinner.filter = $scope.filterObjinner.filter + ' and  zone_id in(' + $scope.zone_id + ')';

            } 

            if ($scope.filterObjinner) {
                Services.shiftService.get($scope.filterObjinner, function(remoteData) {
                    var indexval = 1;
                    angular.forEach(remoteData.record, function(item, key) {
                        var temp =(item.employee)?JSON.parse(item.employee):"";
                        $scope.resultarray[data[$scope.numcount].job_id].push([{
                            'text': temp.text + '(' + temp.code + ')',
                            'fillColor': '#E5E5E5'
                        }, {
                            'text': HelperService.formatingDate(item.ref_in_at,$localStorage.user_info.country),
                            'fillColor': '#E5E5E5'
                        }, {
                            'text': HelperService.formatingDate(item.ref_out_at,$localStorage.user_info.country),
                            'fillColor': '#E5E5E5'
                        }, {
                            'text': item.duriation,
                            'fillColor': '#E5E5E5'
                        }]);
                        indexval = indexval + 1;

                    });
                    $scope.numcount = $scope.numcount + 1;
                    if ($scope.numcount < totaldata) {
                        $scope.recursivefun();
                    } else {
                        Services.agencyDetail.get({
                            id: Services.getAgencyID()
                        }, function(data) {
                            $scope.agency_name = data.agency_name;

                            angular.forEach($scope.resultarray, function(item, key) {
                                $scope.docDefinition["header"].push({
                                    style: 'header',
                                    columns: [{
                                        text: $scope.agency_name,
                                        width: 150
                                    }, {
                                        text: det,
                                        alignment: 'right',
                                        width: 360
                                    }]

                                });
                                $scope.docDefinition["content"].push({
                                    style: 'tableExample',
                                    table: {
                                        widths: [120, 120, 120, 120],
                                        body: $scope.resultarray[key]
                                    },
                                    layout: {
                                        hLineWidth: function(i, node) {
                                            return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                        },
                                        vLineWidth: function(i, node) {
                                            return 1;
                                        },
                                        hLineColor: function(i, node) {
                                            return "#fff";
                                        },
                                        vLineColor: function(i, node) {
                                            return "#fff";
                                        }
                                    }
                                });
                            });
                            $scope.showimg = false;
                            $scope.show_download_loader = false;
                            pdfMake.createPdf($scope.docDefinition).download();
                        });


                    }

                });
            }

        } else {
            $scope.resultarray[data[$scope.numcount].employee_code] = [];
            sum_total = "Employee Total 0 ";

            if (data[$scope.numcount].employee_code, data[$scope.numcount]["sum(duriation)"]) {
                sum_total = "Employee Total " + parseFloat(Math.round((data[$scope.numcount]["sum(duriation)"]) * 100) / 100).toFixed(2);
            }
            temp =(data[$scope.numcount].employee)?JSON.parse(data[$scope.numcount].employee):"";
            name_id = temp.text + '(' + temp.code + ')';



            $scope.resultarray[data[$scope.numcount].employee_code].push([{
                colSpan: 3,
                style: 'subheader',
                text: name_id
            }, "", "", {
                style: 'subheader',
                text: sum_total
            }]);
            $scope.resultarray[data[$scope.numcount].employee_code].push([{
                text: 'Job Name',
                style: 'tableHeader',
                alignment: 'center'
            }, {
                text: 'Start Date',
                style: 'tableHeader',
                alignment: 'center'
            }, {
                text: 'End Date',
                style: 'tableHeader',
                alignment: 'center'
            }, {
                text: 'Total Hours',
                style: 'tableHeader',
                alignment: 'center'
            }]);
            $scope.filterObjinner = {
                fields: "job,ref_in_at,ref_out_at,duriation",
                'include_count': true,
                filter: "employee_code<>'' and job_id<>'' and employee_code='" + data[$scope.numcount].employee_code + "' and ref_in_at >='" + fdate + "' and ref_out_at <='" + ldate + "' and agency_id = " + Services.getAgencyID(),
                "order": "id desc"
            };

            if ($scope.zone_id) {
                $scope.filterObjinner.filter = $scope.filterObjinner.filter + ' and  zone_id in(' + $scope.zone_id + ')';

            } 
            if ($scope.filterObjinner) {
                Services.shiftService.get($scope.filterObjinner, function(remoteData) {
                    var indexval = 1;
                    angular.forEach(remoteData.record, function(item, key) {
                        var temp =(item.job)?JSON.parse(item.job):"";
                        $scope.resultarray[data[$scope.numcount].employee_code].push([{
                            'text': temp.text + ' (' + temp.id + ')',
                            'fillColor': '#E5E5E5'
                        }, {
                            'text': HelperService.formatingDate(item.ref_in_at,$localStorage.user_info.country),
                            'fillColor': '#E5E5E5'
                        }, {
                            'text': HelperService.formatingDate(item.ref_out_at,$localStorage.user_info.country),
                            'fillColor': '#E5E5E5'
                        }, {
                            'text': item.duriation,
                            'fillColor': '#E5E5E5'
                        }]);
                        indexval = indexval + 1;

                    });
                    $scope.numcount = $scope.numcount + 1;
                    if ($scope.numcount < totaldata) {
                        $scope.recursivefun();
                    } else {
                        Services.agencyDetail.get({
                            id: Services.getAgencyID()
                        }, function(data) {
                            $scope.agency_name = data.agency_name;

                            angular.forEach($scope.resultarray, function(item, key) {
                                $scope.docDefinition["header"].push({
                                    style: 'header',
                                    columns: [{
                                        text: $scope.agency_name,
                                        width: 150
                                    }, {
                                        text: det,
                                        alignment: 'right',
                                        width: 360
                                    }]

                                });
                                $scope.docDefinition["content"].push({
                                    style: 'tableExample',
                                    table: {
                                        widths: [120, 120, 120, 120],
                                        body: $scope.resultarray[key]
                                    },
                                    layout: {
                                        hLineWidth: function(i, node) {
                                            return (i === 0 || i === node.table.body.length) ? 1 : 1;
                                        },
                                        vLineWidth: function(i, node) {
                                            return 1;
                                        },
                                        hLineColor: function(i, node) {
                                            return "#fff";
                                        },
                                        vLineColor: function(i, node) {
                                            return "#fff";
                                        }
                                    }
                                });
                            });
                            $scope.showimg = false;
                            $scope.show_download_loader = false;
                            pdfMake.createPdf($scope.docDefinition).download();
                        });
                    }

                });
            }

        }




    };

    $scope.$watch('reportFilters.zone', function(newValue, oldValue) {
        if (newValue != oldValue) {
            $scope.reportFilters.field_value = '';
            $scope.zone_nameid = '';
            $scope.zone_id = '';
            $scope.zone_name = '';
        }


    });

    $scope.selectZone = {
        multiple: true,
        query: function(query) {
            var data = {
                results: []
            };
            var getZone = true;

            if ($scope.reportFilters.zone !== null && !angular.isUndefined($scope.reportFilters.zone[0]) && $scope.reportFilters.zone[0].code === "") {
                getZone = false;
                data = {
                    results: []
                };

            } else if ($scope.reportFilters.zone === null || angular.isUndefined($scope.reportFilters.zone[0])) {
                data.results.push({
                    text: 'All',
                    id: 'all',
                    code: ''
                });
            }

            if (getZone === true) {
                $scope.reportFilters.field_value = '';
                 $scope.zoneObj = {
                        fields: "zone_name,zone_code,id",
                        filter: "status > 0 and agency_id = " + Services.getAgencyID(),
                        order: 'zone_name asc',
                        limit: 5
                };
                if (query.term) {
                    $scope.zoneObj.filter += " and zone_name like '%" + query.term + "%'";
                }
                Services.employeeZones.get($scope.zoneObj, function(remoteData) {
                    items = remoteData.record;
                    if (items.length < 1) {
                        query.callback(data);
                    }
                    angular.forEach(items, function(item, key) {
                        data.results.push({
                            "text": item.zone_name,
                            "id": item.id,
                            "code": item.zone_code
                        });
                        query.callback(data);
                    });

                });
            } else {
                query.callback(data);
            }
        },
        initSelection: function(element, callback) {}
    };
    $scope.Selectfield = {
        query: function(query) {
            var data = {
                results: []
            };
            $scope.reportFilters.field_value = '';
            $scope.reportFilters.filter_value = {
                "text": "All",
                "id": "all",
                "code": "all"
            };

            var items = [{
                id: "job_id",
                name: "Job"
            }, {
                id: "employee_code",
                name: "Employee"
            }, , {
                id: "ref_in_at",
                name: "Date"
            }];
            angular.forEach(items, function(item, key) {
                data.results.push({
                    "text": item.name,
                    "id": item.id

                });
                query.callback(data);
            });



        },
        initSelection: function(element, callback) {}

    };
    $scope.selectValue = {
        query: function(query) {
            var data = {
                results: []
            };
            data.results.push({
                text: 'All',
                id: 'all',
                code: ''
            });
            // $scope.zone_id = HelperService.getAsArray($scope.reportFilters.zone, 'code');
            $scope.zone_nameid = HelperService.getCode_Name($scope.reportFilters.zone, 'code', 'text');
            $scope.zone_id = $scope.zone_nameid.Code;
            $scope.zone_name = $scope.zone_nameid.Code_Name;
            if ($scope.reportFilters.field.id == 'employee_code') {
                $scope.empObj = {
                    fields: "last_name,first_name,access_code,id",
                    filter: "status > 0 and zone_id in(" + $scope.zone_id + ") and agency_id = " + Services.getAgencyID(),
                    order: 'last_name asc',
                    limit: 5
                };
                if (query.term) {
                    $scope.empObj.filter += " and ( last_name like '%" + query.term + "%' or first_name like '%" + query.term + "%' )";
                }
                Services.employeeService.get($scope.empObj, function(remoteData) {
                    items = remoteData.record;
                    if (items.length < 1) {
                        query.callback(data);
                    }
                    angular.forEach(items, function(item, key) {
                        data.results.push({
                            "text": item.last_name + ', ' + item.first_name,
                            "id": item.id,
                            "code": item.access_code
                        });
                        query.callback(data);
                    });

                });

            } else if ($scope.reportFilters.field.id == 'job_id') {
                $scope.jobObj = {
                    fields: "id,job_name,job_code",
                    filter: "job_zone in(" + $scope.zone_id + ") and status > 0 and agency_id = " + Services.getAgencyID(),
                    order: "job_name asc",
                    limit: 5
                };
                if (query.term) {
                    $scope.jobObj.filter += " and (job_name like '%" + query.term + "%')";
                }

                Services.jobService.get($scope.jobObj, function(remoteData) {
                    items = remoteData.record;
                    if (items.length < 1) {
                        query.callback(data);
                    }
                    angular.forEach(items, function(item, key) {
                        data.results.push({
                            "text": item.job_name,
                            "id": item.id,
                            "code": item.job_code
                        });
                        query.callback(data);
                    });

                });

            } else {
                query.callback(data);

            }

        },
        initSelection: function(element, callback) {}


    };




}]);