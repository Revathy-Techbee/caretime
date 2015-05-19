angular.module('ctApp.jobTimecard', [
  'ui.router',
  'wj'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.jobTimecard', {
      url: '/jobTimecard',
      views: {
        'appNested': {
          controller: 'JobTimecardCtrl',
          templateUrl: 'ct-app/reports/jobTimecard/jobTimecard.tpl.html'
        }
      },
      data: {
        pageTitle: 'Timecard Report by Job',
        access: access.timecardsJobs
      }
    });
  }
]).controller('JobTimecardCtrl', [
  '$scope',
  'Services',
  'HelperService',
  '$timeout',
  '$localStorage',
  function ($scope, Services, HelperService, $timeout, $localStorage) {
    $scope.reportFilters = {};
    // $scope.reportFilters.zoneName = '';
    $scope.reportFilters.job = '';
    $scope.reportFilters.zone = null;
    if ($localStorage.user_info.iszone_code) {
      Services.getEmpZoneDetail().then(function (res) {
        $scope.reportFilters.zone = [{
            'text': res.data.record[0]['zone_name'],
            'id': res.data.record[0]['id'],
            'code': res.data.record[0]['zone_code']
          }];
      });
    }
    $scope.showerrorMsg = false;
    $scope.call_limit = 500;
    $scope.showRecord = 0;
    $scope.show_activities_loader = false;
    $scope.show_download_loader = false;
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    $scope.reportFilters.startDate = moment(firstDay).format('YYYY-MM-DD');
    $scope.reportFilters.endDate = moment(lastDay).format('YYYY-MM-DD');
    $scope.loadData = function (fdate, ldate, zone, job, offset) {
      var filterObj = {
          'fields': 'employee_code,employee_name,Job_code,job_name,clockin,clockout,work_duration,work_duration_non_rounded_number,work_duration_rounded,work_duration_rounded_number',
          'limit': $scope.call_limit,
          'offset': offset,
          'include_count': true,
          'order': 'Job_code,id desc',
          'filter': 'employee_code <>\'\' and Job_code<>\'\' and clockin >=\'' + fdate + '\' and clockout <=\'' + ldate + '\'  and agency_id = ' + Services.getAgencyID()
        };
      if (job && !angular.isUndefined(job.code) && job.code) {
        filterObj.filter = filterObj.filter + ' and Job_code = "' + job.code + '"';
      } else if ($scope.zone_id) {
        filterObj.filter = filterObj.filter + ' and jobzone_code in (' + $scope.zone_id + ')';
      }
      Services.employeeActivitiesService.get(filterObj, function (data) {
        angular.forEach(data.record, function (item, key) {
          $scope.resultData.push({
            'employee_code': item.employee_code,
            'employee_name': item.employee_name + ' (' + item.employee_code + ')',
            'Job_code': item.Job_code,
            'job_name': item.job_name + ' (' + item.Job_code + ')',
            'clockin': HelperService.formatingDate(item.clockin, $localStorage.user_info.country),
            'clockout': HelperService.formatingDate(item.clockout, $localStorage.user_info.country),
            'work_duration': item.work_duration,
            'work_duration_non_rounded_number': item.work_duration_non_rounded_number ? Number(parseFloat(item.work_duration_non_rounded_number.replace(',', ''))) : '0',
            'work_duration_formated': item.work_duration_non_rounded_number ? HelperService.formating_hours(item.work_duration) : '(0h 0m)',
            'work_duration_rounded': item.work_duration_rounded,
            'work_duration_rounded_number': item.work_duration_rounded_number ? Number(parseFloat(item.work_duration_rounded_number.replace(',', ''))) : '0',
            'work_duration_rounded_formated': item.work_duration_rounded ? HelperService.formating_hours(item.work_duration_rounded) : '(0h 0m)'
          });
        });
        if (data.meta.count > offset + $scope.call_limit) {
          var nextOffset = offset + $scope.call_limit + 1;
          $scope.loadData(fdate, ldate, zone, job, nextOffset);
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
            $scope.JobDetails = new wijmo.collections.CollectionView($scope.resultData);
            $scope.JobDetails.pageSize = 10;
            $scope.groupBy = 'Job_code';
            var cv = $scope.JobDetails;
            cv.groupDescriptions.clear();
            // clear current groups
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
      if ($scope.reportFilters.startDate && $scope.reportFilters.endDate) {
        if (Date.parse($scope.reportFilters.startDate) > Date.parse($scope.reportFilters.endDate)) {
          $scope.showerrorMsg = true;
          $scope.error_msg = 'Invalid Date';
          $timeout(function () {
            $scope.showerrorMsg = false;
          }, 3000);
          return false;
        }
      } else {
        $scope.showerrorMsg = true;
        $scope.error_msg = 'Please Select Date';
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
      if ($scope.reportFilters.zone == null || angular.isUndefined($scope.reportFilters.zone[0]) || $scope.reportFilters.job === '' && ($scope.reportFilters.zone[0].id !== 'all' && $scope.reportFilters.job.id !== 'all')) {
        $scope.showerrorMsg = true;
        $scope.error_msg = 'Please use the required filters';
        $timeout(function () {
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
      $scope.zone_nameid = HelperService.getCode_Name($scope.reportFilters.zone, 'code', 'text');
      $scope.zone_id = $scope.zone_nameid.Code;
      $scope.zone_name = $scope.zone_nameid.Code_Name;
      mixpanelObj = {
        'Zone': $scope.zone_name ? $scope.zone_name : 'All',
        'Start Date': '"' + moment($scope.reportFilters.startDate).format('MM/DD/YYYY') + '"',
        'End Date': '"' + moment($scope.reportFilters.endDate).format('MM/DD/YYYY') + '"',
        'Agency': Services.serviceName
      };
      if ($scope.reportFilters.job && !angular.isUndefined($scope.reportFilters.job.code)) {
        var temp_empcode = 'All';
        if ($scope.reportFilters.job.code) {
          temp_empcode = $scope.reportFilters.job.text + ' (' + $scope.reportFilters.job.code + ')';
        }
        mixpanelObj.Job = temp_empcode;
      }
      mixpanel.track('Timecard Report by Job', mixpanelObj);
      $scope.loadData(fdate, ldate, $scope.reportFilters.zone, $scope.reportFilters.job, 0);
    };
    $scope.noRecord = 1;
    $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Timecard Report by Job');
    $scope.clearSearch = function () {
      $scope.reportFilters.job = '';
      $scope.reportFilters.zone = null;
      if ($localStorage.user_info.iszone_code) {
        Services.getEmpZoneDetail().then(function (res) {
          $scope.reportFilters.zone = [{
              'text': res.data.record[0]['zone_name'],
              'id': res.data.record[0]['id'],
              'code': res.data.record[0]['zone_code']
            }];
        });
      }
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      $scope.reportFilters.startDate = moment(firstDay).format('YYYY-MM-DD');
      $scope.reportFilters.endDate = moment(lastDay).format('YYYY-MM-DD');
      //$scope.updateTableData();
      $scope.noRecord = 1;
      $scope.showRecord = 0;
      $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Timecard Report by Job');
    };
    $scope.downloadpdf = function () {
      $scope.show_download_loader = true;
      var fdate = moment(moment($scope.reportFilters.startDate).format('YYYY-MM-DD')).utc().format('YYYY-MM-DD HH:mm');
      var a = moment(moment($scope.reportFilters.endDate).format('YYYY-MM-DD'));
      var addObj = a.add('24', 'hours');
      var ldatehrs = addObj.toDate();
      var ldate = moment(ldatehrs).utc().format('YYYY-MM-DD HH:mm');
      var det = 'Timecard Report by Job from ' + moment($scope.reportFilters.startDate).format('MM-DD-YYYY') + ' to ' + moment($scope.reportFilters.endDate).format('MM-DD-YYYY');
      //muniraj pdf export recoding 
      //muniraj pdf export recoding ends
      $scope.docDefinition = {
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
      resultarray = [];
      $jobcodelist = [];
      $scope.gettotal = HelperService.getAsSum($scope.resultData, 'Job_code');
      angular.forEach($scope.resultData, function (value, key) {
        if (angular.isUndefined(resultarray[value.Job_code])) {
          // to create header for each job
          $jobcodelist.push(value.Job_code);
          resultarray[value.Job_code] = [];
          var sum_total = 'Job Rounded Total 0 {0h 0m}';
          var non_rounded_total = 'Job Total 0 {0h 0m}';
          if ($scope.gettotal[value.Job_code + '_nonrounded']) {
            non_rounded_total = 'Job Total ' + parseFloat(Math.round($scope.gettotal[value.Job_code + '_nonrounded'] * 100) / 100).toFixed(2) + HelperService.formating_hours(HelperService.floatToTime($scope.gettotal[value.Job_code + '_nonrounded']));
            sum_total = 'Job Rounded Total ' + parseFloat(Math.round($scope.gettotal[value.Job_code + '_rounded'] * 100) / 100).toFixed(2) + HelperService.formating_hours(HelperService.floatToTime($scope.gettotal[value.Job_code + '_rounded']));
          }
          var name_id = value.job_name;
          resultarray[value.Job_code].push([
            {
              colSpan: 2,
              style: 'subheader',
              text: name_id
            },
            '',
            {
              colSpan: 2,
              style: 'subheader',
              text: non_rounded_total
            },
            '',
            {
              colSpan: 3,
              style: 'subheader',
              text: sum_total
            },
            '',
            ''
          ]);
          resultarray[value.Job_code].push([
            {
              text: 'Name',
              style: 'tableHeader',
              alignment: 'center'
            },
            {
              text: 'Clock In',
              style: 'tableHeader',
              alignment: 'center'
            },
            {
              text: 'Clock Out',
              style: 'tableHeader',
              alignment: 'center'
            },
            {
              text: 'Total Hours',
              style: 'tableHeader',
              alignment: 'center'
            },
            {
              text: '(h m) ',
              style: 'tableHeader',
              alignment: 'center'
            },
            {
              text: 'Total Hrs(Rounded)',
              style: 'tableHeader',
              alignment: 'center'
            },
            {
              text: '(h m)',
              style: 'tableHeader',
              alignment: 'center'
            }
          ]);
        }
        var roundtime;
        var roundtime_float;
        var roundtime_num;
        var time_float = value.work_duration_non_rounded_number.toString();
        //HelperService.timeToFloat(item.work_duration);
        if (value.work_duration_rounded) {
          roundtime_float = value.work_duration_rounded.toString();
          //HelperService.timeToFloat(item.work_duration_rounded);
          roundtime = HelperService.formating_hours(value.work_duration_rounded);
        } else {
          roundtime_float = '0.0';
          roundtime = '0h 0m';
        }
        if (value.work_duration_rounded_number) {
          roundtime_num = value.work_duration_rounded_number.toString();
        } else {
          roundtime_num = '0.0';
        }
        var work_duration = HelperService.formating_hours(value.work_duration);
        resultarray[value.Job_code].push([
          {
            'text': value.employee_name,
            'fillColor': '#E5E5E5'
          },
          {
            'text': value.clockin,
            'fillColor': '#E5E5E5'
          },
          {
            'text': value.clockout,
            'fillColor': '#E5E5E5'
          },
          {
            'text': time_float,
            'fillColor': '#E5E5E5'
          },
          {
            'text': work_duration,
            'fillColor': '#E5E5E5'
          },
          {
            'text': roundtime_num,
            'fillColor': '#E5E5E5'
          },
          {
            'text': roundtime,
            'fillColor': '#E5E5E5'
          }
        ]);
      });
      //out side of far each
      Services.agencyDetail.get({ id: Services.getAgencyID() }, function (data) {
        $scope.agency_name = data.agency_name;
        $scope.docDefinition['header'].push({
          style: 'header',
          columns: [
            {
              text: $scope.agency_name,
              width: 150,
              fillColor: '#E5E5E5'
            },
            {
              text: det,
              alignment: 'right',
              width: 360,
              fillColor: '#E5E5E5'
            }
          ]
        });
        //console.log(resultarray);
        angular.forEach($jobcodelist, function (item, key) {
          $scope.docDefinition['content'].push({
            style: 'tableExample',
            table: {
              widths: [
                80,
                60,
                70,
                50,
                50,
                100,
                40
              ],
              body: resultarray[item]
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
        });
        $scope.showimg = false;
        $scope.show_download_loader = false;
        pdfMake.createPdf($scope.docDefinition).download();
      });
    };
    $scope.$watch('reportFilters.zone', function (newValue, oldValue) {
      if (newValue != oldValue) {
        $scope.reportFilters.job = '';
      }
    });
    $scope.selectZone = {
      multiple: true,
      query: function (query) {
        var data = { results: [] };
        $scope.reportFilters.job = '';
        var getZone = true;
        if ($scope.reportFilters.zone !== null && !angular.isUndefined($scope.reportFilters.zone[0]) && $scope.reportFilters.zone[0].code === '') {
          getZone = false;
          data = { results: [] };
        } else if ($scope.reportFilters.zone === null || angular.isUndefined($scope.reportFilters.zone[0])) {
          data.results.push({
            text: 'All',
            id: 'all',
            code: ''
          });
        }
        if (getZone === true) {
          $scope.zoneObj = {
            fields: 'zone_name,zone_code,id',
            filter: 'status > 0 and agency_id = ' + Services.getAgencyID(),
            order: 'zone_name asc',
            limit: 20
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
    $scope.selectJob = {
      query: function (query) {
        var data = { results: [] };
        data.results.push({
          text: 'All',
          id: 'all',
          code: ''
        });
        $scope.zone_id = HelperService.getAsArray($scope.reportFilters.zone, 'code');
        $scope.jobObj = {
          fields: 'id,job_name,job_code',
          filter: 'job_zone in(' + $scope.zone_id + ') and status > 0 and  agency_id = ' + Services.getAgencyID(),
          order: 'job_name asc',
          limit: 20
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
              'text': item.job_name,
              'id': item.id,
              'code': item.job_code
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