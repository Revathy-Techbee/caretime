angular.module('ctApp.budgetVsActual', [
  'ui.router',
  'wj'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.budgetVsActual', {
      url: '/budgetVsActual',
      views: {
        'appNested': {
          controller: 'BudgetVsActualCtrl',
          templateUrl: 'ct-app/reports/budgetVsActual/budgetVsActual.tpl.html'
        }
      },
      data: {
        pageTitle: 'Budget vs Actual Report',
        access: access.budgetVsActual
      }
    });
  }
]).controller('BudgetVsActualCtrl', [
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
      $scope.jobNameList = {};
      var filterObj = {
          'fields': 'Job_code,job_name,Zone_code,Zone_name,sum(work_duration_non_rounded_number)',
          'limit': $scope.call_limit,
          'offset': offset,
          'include_count': true,
          'order': 'job_name asc',
          'filter': 'employee_code <>\'\' and Job_code<>\'\' and clockin >=\'' + fdate + '\' and clockout <=\'' + ldate + '\'  and agency_id = ' + Services.getAgencyID()
        };
      if (job && !angular.isUndefined(job.code) && job.code) {
        filterObj.filter = filterObj.filter + ' and Job_code = "' + job.code + '"';
      } else if ($scope.zone_id) {
        filterObj.filter = filterObj.filter + ' and jobzone_code in (' + $scope.zone_id + ')';
      }
      filterObj.filter = filterObj.filter + ' GROUP BY  Job_code ';
      Services.employeeActivitiesService.get(filterObj, function (data) {
        $scope.activitiesResult = data.record;
        $scope.jobCode = HelperService.getAsArray($scope.activitiesResult, 'Job_code');
        $scope.jobFilterObj = {
          'include_count': true,
          'fields': 'budgeted_hours,job_code',
          'filter': 'job_code   IN (' + $scope.jobCode + ') and agency_id = ' + Services.getAgencyID()
        };
        Services.jobService.get($scope.jobFilterObj, function (jobnameresult) {
          angular.forEach(jobnameresult.record, function (value, key) {
            if (value.job_code) {
              $scope.jobNameList[value.job_code] = value.budgeted_hours;
            }
          });
          // console.log($scope.jobNameList);
          angular.forEach($scope.activitiesResult, function (item, key) {
            //console.log(item.Job_code);
            // console.log($scope.jobNameList[item.Job_code]);
            $scope.budgetedHours = $scope.jobNameList[item.Job_code] ? $scope.jobNameList[item.Job_code] : 0;
            $scope.difference = $scope.budgetedHours - item['sum(work_duration_non_rounded_number)'];
            $scope.resultData.push({
              'actualHours': item['sum(work_duration_non_rounded_number)'] ? Number(parseFloat(item['sum(work_duration_non_rounded_number)'].replace(',', '')).toFixed(2)) : '0',
              'jobCode': item.Job_code,
              'jobDetail': item.job_name + ' (' + item.Job_code + ')',
              'budgetedHours': parseFloat($scope.budgetedHours).toFixed(2),
              'zoneDetail': item.job_name + ' (' + item.Job_code + ')',
              'difference': parseFloat($scope.difference).toFixed(2)
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
              $scope.BudgetedDetails = new wijmo.collections.CollectionView($scope.resultData);
              $scope.BudgetedDetails.pageSize = 10;  /*$scope.groupBy = 'Job_code';
                            var cv = $scope.BudgetedDetails;
                            cv.groupDescriptions.clear(); // clear current groups
                            if ($scope.groupBy) {
                                var groupNames = $scope.groupBy.split(',');
                                for (var i = 0; i < groupNames.length; i++) {
                                    var groupName = groupNames[i];
                                    var groupDesc = new wijmo.collections.PropertyGroupDescription(groupName);
                                    cv.groupDescriptions.push(groupDesc);

                                }
                            }*/
            } else {
              $scope.noRecord = 1;
              $scope.norecord = HelperService.errorMsg('alert-danger', 'No Record Found');
            }
          }
        });
      });
    };
    $scope.getAmountColor = function (remaininghours) {
      if (remaininghours !== 0) {
        if (remaininghours < 0) {
          return 'red';
        }
        return 'green';
      }
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
      mixpanel.track('Budget vs Actual Report', mixpanelObj);
      $scope.loadData(fdate, ldate, $scope.reportFilters.zone, $scope.reportFilters.job, 0);
    };
    $scope.noRecord = 1;
    $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Budget vs Actual Report');
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
      $scope.norecord = HelperService.errorMsg('alert-danger', 'Please Search to get Budget vs Actual Report');
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