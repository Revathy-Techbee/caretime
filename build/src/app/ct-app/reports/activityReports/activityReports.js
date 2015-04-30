angular.module('ctApp.activityReports', [
  'ui.router',
  'wj'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.activityReports', {
      url: '/activityReports',
      views: {
        'appNested': {
          controller: 'ActivityReportsCtrl',
          templateUrl: 'ct-app/reports/activityReports/activityReports.tpl.html'
        }
      },
      data: {
        pageTitle: 'Activity Reporting',
        access: access.activityReporting
      }
    });
  }
]).controller('ActivityReportsCtrl', [
  '$scope',
  'Services',
  'HelperService',
  '$timeout',
  '$localStorage',
  function ($scope, Services, HelperService, $timeout, $localStorage) {
    $scope.logFilters = {};
    $scope.logFilters.zoneName = null;
    if ($localStorage.user_info.iszone_code) {
      Services.getEmpZoneDetail().then(function (res) {
        $scope.logFilters.zoneName = [{
            'text': res.data.record[0]['zone_name'],
            'id': res.data.record[0]['id'],
            'code': res.data.record[0]['zone_code']
          }];
      });
    }
    $scope.logFilters.filterName = '';
    $scope.logFilters.callStatus = '';
    $scope.logFilters.filterValue = '';
    $scope.filterName = [
      {
        name: 'Employee',
        id: 'employee_code'
      },
      {
        name: 'Job',
        id: 'job_code'
      }
    ];
    $scope.showerrorMsg = false;
    $scope.show_activities_loader = false;
    $scope.calllogList = [];
    $scope.calllogListDetail = {};
    $scope.call_limit = 500;
    $scope.showRecord = 0;
    $scope.noRecord = 1;
    $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Activity Report');
    $scope.loadData = function (filterZone, filterName, filterCode, callStatus, offset) {
      var filterObj = {
          'limit': $scope.call_limit,
          'offset': offset,
          'include_count': true,
          'order': 'id desc',
          'filter': 'employee_code <>"" and job_code<>"" and  agency_id = ' + Services.getAgencyID(),
          'fields': 'employee_code,job_code,log_type,call_duriation,phone_number,call_status,created_by,timestamp'
        };
      if (filterCode && !angular.isUndefined(filterCode.code) && filterCode.code) {
        filterObj.filter = filterObj.filter + ' and ' + filterName.id + ' ="' + filterCode.code + '"';
      } else if ($scope.zone_id) {
        if (filterName.id == 'job_code') {
          filterObj.filter = filterObj.filter + ' and jobzone_code in (' + $scope.zone_id + ')';
        } else {
          filterObj.filter = filterObj.filter + ' and empzone_code in (' + $scope.zone_id + ')';
        }
      }
      if (callStatus) {
        filterObj.filter = filterObj.filter + ' and call_status like "%' + callStatus.id + '%"';
      }
      Services.timeLog.get(filterObj, function (data) {
        if (data.record.length !== 0) {
          $scope.empNameList = {};
          $scope.jobNameList = {};
          $scope.empCode = HelperService.getAsArray(data.record, 'employee_code');
          $scope.jobCode = HelperService.getAsArray(data.record, 'job_code');
          $scope.empFilterObj = {
            'include_count': true,
            'fields': 'first_name,last_name,access_code',
            'filter': 'access_code  IN (' + $scope.empCode + ') and  agency_id = ' + Services.getAgencyID()
          };
          Services.employeeService.get($scope.empFilterObj, function (employeenameresult) {
            angular.forEach(employeenameresult.record, function (value, key) {
              if (value.access_code) {
                $scope.empNameList[value.access_code] = value.last_name + ', ' + value.first_name + ' (' + value.access_code + ')';
              }
            });
            $scope.jobFilterObj = {
              'include_count': true,
              'fields': 'job_name ,job_code',
              'filter': 'job_code   IN (' + $scope.jobCode + ') and  agency_id = ' + Services.getAgencyID()
            };
            Services.jobService.get($scope.jobFilterObj, function (jobnameresult) {
              angular.forEach(jobnameresult.record, function (value, key) {
                if (value.job_code) {
                  $scope.jobNameList[value.job_code] = value.job_name + ' (' + value.job_code + ')';
                }
              });
              angular.forEach(data.record, function (item, key) {
                $scope.calllogList.push({
                  'employee_code': $scope.empNameList[item.employee_code],
                  'job_code': $scope.jobNameList[item.job_code],
                  'log_type': HelperService.logType(item.log_type),
                  'call_duriation': item.call_duriation,
                  'phone_number': HelperService.phoneFormat(item.phone_number, $localStorage.user_info.country),
                  'call_status': item.call_status,
                  'created_by': HelperService.AddEditUser(item.created_by),
                  'timestamp': HelperService.formatingDate(item.timestamp, $localStorage.user_info.country)
                });
              });
              if (data.meta.count > offset + $scope.call_limit) {
                var nextOffset = offset + $scope.call_limit + 1;
                $scope.loadData(filterZone, filterName, filterCode, callStatus, nextOffset);
              } else {
                $scope.show_activities_loader = false;
                $scope.noRecord = 0;
                $scope.ctx = {
                  flexGrid: null,
                  data: $scope.calllogList,
                  includeColumnHeader: true
                };
                $scope.calllogListDetail = new wijmo.collections.CollectionView($scope.calllogList);
                $scope.calllogListDetail.pageSize = 10;
                $scope.showRecord = 1;
              }
            });
          });
        } else {
          $scope.show_activities_loader = false;
          $scope.noRecord = 1;
          $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
        }
      });
    };
    $scope.exportExcel = function () {
      if ($scope.noRecord === 0) {
        var pageSize = $scope.ctx.flexGrid.collectionView.pageSize;
        $scope.ctx.flexGrid.collectionView.pageSize = 0;
        var result = wijmo.grid.ExcelConverter.export($scope.ctx.flexGrid, { includeColumnHeader: $scope.ctx.includeColumnHeader });
        $scope.ctx.flexGrid.collectionView.pageSize = pageSize;
        if (navigator.msSaveBlob) {
          var blob = new Blob([result.base64Array]);
          navigator.msSaveBlob(blob, $('#export').attr('download'));
        } else {
          $('#export')[0].href = result.href();
        }
      }
    };
    $scope.updateTableData = function (isFilter) {
      // on limit change
      if ($scope.logFilters.filterName.id !== 'all' && ($scope.logFilters.zoneName == null || angular.isUndefined($scope.logFilters.zoneName[0])) || ($scope.logFilters.filterName === '' || $scope.logFilters.filterValue === '') && ($scope.logFilters.filterValue.id !== 'all' && $scope.logFilters.zoneName != null && !angular.isUndefined($scope.logFilters.zoneName[0]) && $scope.logFilters.zoneName[0].id !== 'all') && $scope.logFilters.filterName.id !== 'all') {
        $scope.showerrorMsg = true;
        $scope.error_msg = 'Please fill the required filters';
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
      } else {
        $scope.showRecord = 0;
        $scope.calllogList = [];
        $scope.noRecord = 0;
        $scope.show_activities_loader = true;
        //$scope.zone_id = HelperService.getAsArray($scope.logFilters.zoneName, 'code');
        mixpanelObj = {
          'Field': $scope.logFilters.filterName.text,
          'Agency': Services.serviceName
        };
        if ($scope.logFilters.filterName.id != 'all') {
          mixpanelObj.Zone = $scope.zone_name ? $scope.zone_name : 'All';
        }
        if ($scope.logFilters.filterValue && !angular.isUndefined($scope.logFilters.filterValue.code)) {
          var temp_fieldvalue = 'All';
          if ($scope.logFilters.filterValue.code) {
            temp_fieldvalue = $scope.logFilters.filterValue.text + ' (' + $scope.logFilters.filterValue.code + ')';
          }
          if ($scope.logFilters.filterName.id == 'job_code') {
            mixpanelObj.Job = temp_fieldvalue;
          } else {
            mixpanelObj.Employee = temp_fieldvalue;
          }
        }
        if ($scope.logFilters.callStatus) {
          mixpanelObj.CallStatus = $scope.logFilters.callStatus.text;
        }
        mixpanel.track('Activity Reporting', mixpanelObj);
        $scope.loadData($scope.logFilters.zoneName, $scope.logFilters.filterName, $scope.logFilters.filterValue, $scope.logFilters.callStatus, 0);
      }
    };
    $scope.clearSearch = function () {
      $scope.logFilters.filterValue = '';
      $scope.logFilters.filterName = '';
      $scope.logFilters.zoneName = null;
      if ($localStorage.user_info.iszone_code) {
        Services.getEmpZoneDetail().then(function (res) {
          $scope.logFilters.zoneName = [{
              'text': res.data.record[0]['zone_name'],
              'id': res.data.record[0]['id'],
              'code': res.data.record[0]['zone_code']
            }];
        });
      }
      $scope.logFilters.callStatus = '';
      // $scope.updateTableData();
      $scope.noRecord = 1;
      $scope.showRecord = 0;
      $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Activity Report');
    };
    $scope.downloadpdf = function () {
      $scope.show_download_loader = true;
      var det = 'Activity Reporting ';
      var filterObj;
      var resultarray = [];
      //console.log($scope.calllogList);
      //PDF download recoded by muniraj 
      resultarray.push([
        {
          text: 'Employee Name',
          style: 'tableHeader',
          alignment: 'center'
        },
        {
          text: 'Job Name',
          style: 'tableHeader',
          alignment: 'center'
        },
        {
          text: 'Log Type',
          style: 'tableHeader',
          alignment: 'center'
        },
        {
          text: 'Work duration',
          style: 'tableHeader',
          alignment: 'center'
        },
        {
          text: 'Date',
          style: 'tableHeader',
          alignment: 'center'
        },
        {
          text: 'Phone Number',
          style: 'tableHeader',
          alignment: 'center'
        },
        {
          text: 'Call Status',
          style: 'tableHeader',
          alignment: 'center'
        },
        {
          text: 'Entered By',
          style: 'tableHeader',
          alignment: 'center'
        }
      ]);
      var docDefinition = {
          pageSize: 'A5',
          pageOrientation: 'landscape',
          content: [],
          header: [],
          styles: {
            header: {
              fontSize: 10,
              bold: true,
              margin: [
                42,
                5,
                42,
                40
              ],
              bordercolor: '#a0c33a',
              fillColor: '#E5E5E5'
            },
            subheader: {
              fontSize: 8,
              fillColor: '#F9E0A0',
              margin: [
                0,
                5,
                0,
                5
              ]
            },
            tableExample: {
              fontSize: 8,
              fillColor: '#E5E5E5',
              margin: [
                0,
                5,
                0,
                15
              ]
            },
            tableHeader: {
              bold: true,
              fontSize: 8,
              color: 'black',
              fillColor: '#F9E0A0'
            }
          },
          defaultStyle: {}
        };
      angular.forEach($scope.calllogList, function (value, key) {
        //console.log(value);
        var logtype = '-';
        var duration = '-';
        var date = '-';
        var phone = '-';
        var empname = '-';
        var jobname = '-';
        var call_status = '-';
        var created_by = '-';
        if (value.timestamp !== null && value.timestamp) {
          date = value.timestamp;
        }
        if (value.phone_number !== null && value.phone_number) {
          phone = value.phone_number;
        }
        if (value.call_duriation !== null && value.call_duriation) {
          duration = value.call_duriation;
        }
        if (value.log_type !== null && value.log_type) {
          logtype = value.log_type;
        }
        if (value.employee_code !== null && value.employee_code) {
          empname = value.employee_code;
        }
        if (value.job_code !== null && value.job_code) {
          jobname = value.job_code;
        }
        if (value.call_status !== null && value.call_status) {
          call_status = value.call_status;
        }
        if (value.created_by !== null && value.created_by) {
          created_by = value.created_by;
        }
        resultarray.push([
          {
            'text': empname,
            'fillColor': '#E5E5E5'
          },
          {
            'text': jobname,
            'fillColor': '#E5E5E5'
          },
          {
            'text': logtype,
            'fillColor': '#E5E5E5'
          },
          {
            'text': duration,
            'fillColor': '#E5E5E5'
          },
          {
            'text': date,
            'fillColor': '#E5E5E5'
          },
          {
            'text': phone,
            'fillColor': '#E5E5E5'
          },
          {
            'text': call_status,
            'fillColor': '#E5E5E5'
          },
          {
            'text': created_by,
            'fillColor': '#E5E5E5'
          }
        ]);
      });
      Services.agencyDetail.get({ id: Services.getAgencyID() }, function (data) {
        $scope.agency_name = data.agency_name;
        docDefinition['header'].push({
          style: 'header',
          columns: [
            {
              text: $scope.agency_name,
              width: 150
            },
            {
              text: det,
              alignment: 'right',
              width: 360
            }
          ]
        });
        docDefinition['content'].push({
          style: 'tableExample',
          table: {
            widths: [
              70,
              80,
              30,
              50,
              60,
              60,
              70,
              80
            ],
            body: resultarray
          },
          layout: {
            fillColor: '#E5E5E5',
            hLineWidth: function (i, node) {
              return i === 0 || i === node.table.body.length ? 1 : 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              return '#fff';
            },
            vLineColor: function (i, node) {
              return '#fff';
            }
          }
        });
        $scope.showimg = false;
        $scope.show_download_loader = false;
        pdfMake.createPdf(docDefinition).download();  // pdf downlaod recoded ends here
      });
    };
    $scope.$watch('logFilters.zoneName', function (newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.zone_nameid = '';
        $scope.zone_id = '';
        $scope.zone_name = '';
        $scope.logFilters.filterValue = '';
      }
    });
    $scope.selectZoneOptions = {
      multiple: true,
      query: function (query) {
        var data = { results: [] };
        var getZone = true;
        $scope.logFilters.filterValue = '';
        if ($scope.logFilters.zoneName !== null && !angular.isUndefined($scope.logFilters.zoneName[0]) && $scope.logFilters.zoneName[0].code === '') {
          getZone = false;
          data = { results: [] };
        } else if ($scope.logFilters.zoneName === null || angular.isUndefined($scope.logFilters.zoneName[0])) {
          data.results.push({
            text: 'All',
            id: 'all',
            code: ''
          });
        }
        if (getZone === true) {
          // $scope.logFilters.filterName = '';
          $scope.zoneObj = {
            fields: 'zone_name,zone_code,id',
            filter: 'status > 0 and agency_id = ' + Services.getAgencyID(),
            order: 'zone_name asc',
            limit: 5
          };
          if (query.term) {
            $scope.zoneObj.filter += ' and zone_name like \'%' + query.term + '%\'';
          }
          Services.employeeZones.get($scope.zoneObj, function (remoteData) {
            items = remoteData.record;
            if (items.length < 1) {
              query.callback(data);
            }
            angular.forEach(items, function (item, key) {
              data.results.push({
                'text': item.zone_name,
                'id': item.id,
                'code': item.zone_code
              });
              query.callback(data);
            });
          });
        } else {
          query.callback(data);
        }
      },
      initSelection: function (element, callback) {
      }
    };
    $scope.Selectfield = {
      query: function (query) {
        var data = { results: [] };
        $scope.logFilters.filterValue = '';
        $scope.logFilters.filterName = '';
        $scope.zone_id = '';
        $scope.zone_name = '';
        $scope.logFilters.filterValue = '';
        var items = [
            {
              id: 'job_code',
              name: 'Job'
            },
            {
              id: 'employee_code',
              name: 'Employee'
            }
          ];
        data.results.push({
          text: 'All',
          id: 'all'
        });
        angular.forEach(items, function (item, key) {
          data.results.push({
            'text': item.name,
            'id': item.id
          });
          query.callback(data);
        });
      },
      initSelection: function (element, callback) {
      }
    };
    $scope.$watch('logFilters.filterName', function (newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.logFilters.zoneName = null;
        if ($scope.logFilters.filterName.id != 'all') {
          if ($localStorage.user_info.iszone_code) {
            Services.getEmpZoneDetail().then(function (res) {
              $scope.logFilters.zoneName = [{
                  'text': res.data.record[0]['zone_name'],
                  'id': res.data.record[0]['id'],
                  'code': res.data.record[0]['zone_code']
                }];
            });
          }
        }
      }
    });
    $scope.getFilterValue = {
      query: function (query) {
        var data = { results: [] };
        data.results.push({
          name: '',
          text: 'All',
          id: 'all',
          code: ''
        });
        $scope.zone_nameid = HelperService.getCode_Name($scope.logFilters.zoneName, 'code', 'text');
        $scope.zone_id = $scope.zone_nameid.Code;
        $scope.zone_name = $scope.zone_nameid.Code_Name;
        if ($scope.logFilters.filterName.id == 'job_code') {
          $scope.filterVal = [];
          $scope.jobObj = {
            fields: 'job_name,job_code',
            filter: 'job_zone in(' + $scope.zone_id + ') and status > 0 and agency_id =' + Services.getAgencyID(),
            order: 'job_name asc',
            limit: 5
          };
          if (query.term) {
            $scope.jobObj.filter += ' and (job_name like "%' + query.term + '%")';
          }
          Services.jobService.get($scope.jobObj, function (remoteData) {
            items = remoteData.record;
            if (items.length < 1) {
              query.callback(data);
            }
            angular.forEach(items, function (item, key) {
              data.results.push({
                name: item.job_name,
                code: item.job_code,
                text: item.job_name,
                id: item.job_code
              });
              query.callback(data);
            });
          });
        } else if ($scope.logFilters.filterName.id == 'employee_code') {
          $scope.filterVal = [];
          $scope.empObj = {
            fields: 'last_name,first_name,access_code',
            filter: 'status > 0 and zone_id in(' + $scope.zone_id + ')  and agency_id =' + Services.getAgencyID(),
            order: 'last_name asc',
            limit: 5
          };
          if (query.term) {
            $scope.empObj.filter += '  and (last_name like "%' + query.term + '%" or first_name like "%' + query.term + '%")';
          }
          Services.employeeService.get($scope.empObj, function (remoteData) {
            items = remoteData.record;
            if (items.length < 1) {
              query.callback(data);
            }
            angular.forEach(items, function (item, key) {
              data.results.push({
                name: item.last_name + ', ' + item.first_name,
                code: item.access_code,
                text: item.last_name + ', ' + item.first_name,
                id: item.access_code
              });
              query.callback(data);
            });
          });
        }
      },
      initSelection: function (element, callback) {
      }
    };
    $scope.selectCallStatus = {
      query: function (query) {
        var data = { results: [] };
        $scope.callStatusObj = {
          filter: 'call_status<>"" and  agency_id = ' + Services.getAgencyID() + ' group by call_status',
          'order': 'call_status asc',
          limit: 5,
          field: 'call_status'
        };
        if (query.term) {
          $scope.callStatusObj.filter = 'call_status like "%' + query.term + '%" group by call_status  ';
        }
        Services.timeLog.get($scope.callStatusObj, function (remoteData) {
          items = remoteData.record;
          if (items.length < 1) {
            query.callback(data);
          }
          angular.forEach(items, function (item, key) {
            data.results.push({
              text: item.call_status,
              id: item.call_status
            });
            query.callback(data);
          });
        });
      },
      initSelection: function (element, callback) {
      }
    };
  }
]);