angular.module('ctApp.schedules', [
  'ui.router',
  'ui.calendar',
  'ui.select2'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.schedules', {
      url: '/schedules',
      views: {
        'appNested': {
          controller: 'SchedulesCtrl',
          templateUrl: 'ct-app/schedules/schedules.tpl.html'
        }
      },
      data: {
        pageTitle: 'Schedules',
        access: access.schedules
      }
    }).state('ctApp.addUpdateSchedule', {
      url: '/schedule/:scheduleId',
      views: {
        'appNested': {
          controller: 'AddUpdateScheduleCtrl',
          templateUrl: 'ct-app/schedules/add-update-schedule.tpl.html'
        }
      },
      data: {
        pageTitle: 'Add/Edit Schedule',
        access: access.schedules
      }
    });
  }
]).controller('SchedulesCtrl', [
  '$scope',
  'Services',
  '$state',
  '$modal',
  '$timeout',
  'HelperService',
  '$localStorage',
  function ($scope, Services, $state, $modal, $timeout, HelperService, $localStorage) {
    $scope.config = {
      general: { searchtxt: '' },
      page_size: 15,
      loaded_all_records: false,
      show_schedules_loader: true
    };
    $scope.showerrorMsg = false;
    $scope.mapbox = {};
    $scope.yourTime = moment().format('YYYY-MM-DD HH:mm');
    $scope.UTCTime = moment().utc().format('YYYY-MM-DD HH:mm');
    $scope.shiftFilters = {};
    $scope.filterName = [];
    $scope.shiftFilters.filterValue = '';
    $scope.shiftFilters.filterName = '';
    $scope.shiftFilters.zoneName = '';
    if ($localStorage.user_info.iszone_code) {
      Services.getEmpZoneDetail().then(function (res) {
        $scope.shiftFilters.zoneName = {
          'text': res.data.record[0]['zone_name'],
          'id': res.data.record[0]['zone_code']
        };
      });
    }
    $scope.filterZoneName = [];
    $scope.filterName = [
      {
        id: 'employee_code',
        name: 'Employee'
      },
      {
        id: 'job_id',
        name: 'Job'
      }
    ];
    $scope.events = [];
    $scope.eventSource = [];
    $scope.eventSource = [$scope.events];
    $scope.buildShiftList = function (data, calendar) {
      if (calendar) {
        $scope.events.splice(0, $scope.events.length);
      }
      for (var i = 0; i < data.length; i++) {
        $scope.value = {};
        $scope.value.id = data[i]['id'];
        $scope.value.in_date = data[i]['in_date'];
        // mm-dd-yyyy
        $scope.value.in_time = data[i]['in_time'];
        $scope.value.in_at = data[i]['in_at'];
        $scope.value.out_date = data[i]['out_date'];
        $scope.value.out_time = data[i]['out_time'];
        $scope.value.out_at = data[i]['out_at'];
        $scope.value.job = data[i]['job'];
        $scope.value.notes = data[i]['notes'];
        $scope.value.shift_code = data[i]['shift_code'];
        $scope.value.recurrence = data[i]['is_recurrence'];
        $scope.value.duriation = data[i]['duriation'];
        $scope.value.employee = data[i]['employee'];
        $scope.tempStart = moment($scope.value.in_at).toDate();
        $scope.tempEnd = moment($scope.value.out_at).toDate();
        $scope.Notes = 'Duriation : ' + HelperService.floatToTime($scope.value.duriation) + ' hrs, ' + ($scope.value.notes ? ' Notes : ' + $scope.value.notes : '');
        $scope.class_name = 'b-l b-2x b-info';
        $scope.currentdate = moment().utc().format('YYYY-MM-DD HH:mm');
        $scope.shift_date = moment(data[i]['ref_in_at']).format('YYYY-MM-DD HH:mm');
        $scope.new_date = moment(moment(data[i]['ref_in_at']).add(10, 'minutes')).format('YYYY-MM-DD HH:mm');
        $scope.clock_in_time = moment(data[i]['clock_in_time']).format('YYYY-MM-DD HH:mm');
        if (moment($scope.shift_date).unix() < moment($scope.currentdate).unix()) {
          if (data[i]['clock_in_status'] == '0' || data[i]['clock_in_status'] === 0) {
            $scope.class_name = 'b-l b-2x b-danger';
          } else if (data[i]['clock_in_status'] == 1 && moment($scope.shift_date).unix() >= moment($scope.clock_in_time).unix() || moment($scope.new_date).unix() >= moment($scope.clock_in_time).unix()) {
            $scope.class_name = 'b-l b-2x b-success';
          } else {
            $scope.class_name = 'b-l b-2x b-warning';
          }
        }
        shotname = '';
        if ($scope.value.employee) {
          temp = JSON.parse($scope.value.employee).text;
          if (temp == 'Any Employee') {
            shotname = temp;
          } else {
            str = temp.split(',');
            shotname = str[1] + ' ' + str[0].charAt(0);
          }
        }
        $scope.events[i] = {
          id: $scope.value.id,
          code: $scope.value.shift_code,
          recurrence: $scope.value.recurrence,
          title: JSON.parse($scope.value.job).text + '  <br> EE : ' + shotname,
          start: $scope.tempStart,
          end: $scope.tempEnd,
          className: [$scope.class_name],
          location: 'demo',
          info: $scope.Notes,
          allDay: false
        };
      }
      if (calendar) {
      }
      $scope.eventSources = [$scope.events];
    };
    $scope.alertOnEventClick = function (event, jsEvent, view) {
      Services.setModelTempVar(event);
      if ($scope.event.recurrence == '"1"') {
        $scope.modalInstance = $modal.open({
          template: '<div class="modal-header"> <h3 class="modal-title">Edit Options</h3></div><div class="modal-body"><b> Would you like to edit the current Shift or all the recurrence Shifts?</b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">Cancel</button><button class="btn btn-primary" ng-click="all()">All Shifts</button> <button class="btn btn-primary" ng-click="single()">Current Shift</button></div>',
          controller: 'recurrenceShiftCtrl'
        });
        $scope.modalInstance.result.then(function (event) {
          $scope.allshiftId = [];
          var single = event[0].single;
          if (single == 'yes') {
            $scope.allshiftId = '';
          } else {
            $scope.allshiftId = [];
            Services.shiftService.get({
              fields: 'id',
              filter: 'shift_code=\'' + $scope.event.code + '\' and status > 0 and agency_id = ' + Services.getAgencyID()
            }, function (remoteData) {
              angular.forEach(remoteData.record, function (item, key) {
                $scope.allshiftId.push({ 'id': item.id });
              });
            });
          }
          $scope.addEvent(event[0].id, event[0].code, $scope.allshiftId);
        }, function () {
        });
      } else {
        var shiftId = $scope.event.id;
        var shiftCode = $scope.event.code;
        var allShiftID = '';
        $scope.addEvent(shiftId, shiftCode, allShiftID);
      }
    };
    /* alert on Drop */
    $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
      $scope.alertMessage = 'Event Droped to make dayDelta ' + delta;
    };
    /* alert on Resize */
    $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
      $scope.alertMessage = 'Event Resized to make dayDelta ' + delta;
    };
    $scope.overlay = $('.fc-overlay');
    $scope.alertOnMouseOver = function (event, jsEvent, view) {
      $scope.event = event;
      $scope.overlay.removeClass('left right').find('.arrow').removeClass('left right top pull-up');
      var wrap = $(jsEvent.target).closest('.fc-event');
      var cal = wrap.closest('.calendar');
      var left = wrap.offset().left - cal.offset().left;
      var right = cal.width() - (wrap.offset().left - cal.offset().left + wrap.width());
      if (right > $scope.overlay.width()) {
        $scope.overlay.addClass('left').find('.arrow').addClass('left pull-up');
      } else if (left > $scope.overlay.width()) {
        $scope.overlay.addClass('right').find('.arrow').addClass('right pull-up');
      } else {
        $scope.overlay.find('.arrow').addClass('top');
      }  //(wrap.find('.fc-overlay').length === 0) && wrap.append($scope.overlay);
    };
    /* config object */
    var knowItFirstCall = 'yes';
    $scope.uiConfigF = function () {
      $scope.uiConfig = {
        calendar: {
          height: 450,
          editable: false,
          defaultView: 'agendaDay',
          header: {
            left: 'prev',
            center: 'title',
            right: 'today,agendaDay,agendaWeek,month,next'
          },
          buttonText: {
            prev: '<span class=\'fc-text-arrow\'>&lsaquo;</span>',
            next: '<span class=\'fc-text-arrow\'>&rsaquo;</span>',
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day'
          },
          loading: function (isLoading, view) {
            //Codeed By Revathy
            //BEGIN
            $viewname = view.name;
            if (view.name == 'agendaDay' || !angular.isUndefined($scope.shiftFilters.filterValue.id) && $scope.shiftFilters.filterValue.id) {
              if (isLoading) {
                $('#calendar').append('<div id="progress"  class="calprogress"><div  aria-valuetext="90%" ng-style="{width: 100 %}" aria-valuemax="100" aria-valuemin="0" aria-valuenow="90" role="progressbar"  class="progress-bar active progress-striped progress-bar-success hide" style="width: 100%;"><i class="ng-scope">loading </i></div></div>');
              } else {
                $('#progress').remove();
              }
            }  //End
               /*
                    if (isLoading) {
                        $('#calendar').append('<div id="progress"  class="calprogress"><div  aria-valuetext="90%" ng-style="{width: 100 %}" aria-valuemax="100" aria-valuemin="0" aria-valuenow="90" role="progressbar"  class="progress-bar active progress-striped progress-bar-success hide" style="width: 100%;"><i class="ng-scope">loading </i></div></div>');
                    } else {
                        $('#progress').remove();
                    }
                    */
          },
          events: function (start, end, callback) {
            if (moment(start).isSame(moment($scope.startDate)) && moment(end).isSame(moment($scope.endDate))) {
              // to prevent second call
              if (knowItFirstCall == 'yes') {
                $scope.getNewShifts(start, end, callback);
                knowItFirstCall = 'no';
              } else {
                var events = [];
                callback(events);
              }
            } else {
              $scope.getNewShifts(start, end, callback);
            }
          },
          eventClick: $scope.alertOnEventClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize,
          eventMouseover: $scope.alertOnMouseOver,
          timeFormat: '[h(:mm)t] - {h(:mm)t}'
        }
      };
    };
    $scope.uiConfigF();
    /* add custom event*/
    $scope.buildShiftList([]);
    // call the listStyl
    $scope.addEvent = function (shiftId, shiftCode, allshiftId) {
      if ($scope.mapbox) {
        $scope.mapbox = $scope.mapbox;
      }
      Services.setModelTempVar({
        'shiftId': shiftId,
        'shiftCode': shiftCode,
        'allshiftId': allshiftId
      });
      $scope.modalInstance = $modal.open({
        templateUrl: 'ct-app/schedules/add-update-schedule.tpl.html',
        size: 'lg',
        controller: 'AddUpdateScheduleCtrl'
      });
      $scope.modalInstance.result.then(function (selectedItem) {
        $scope.getNewShifts($scope.startDate, $scope.endDate, '', calendar);
      }, function () {
      });
    };
    /* remove event */
    $scope.remove = function (index) {
      $scope.events.splice(index, 1);
    };
    /* Change View */
    $scope.changeView = function (view) {
      //console.log(calendar);
      calendar.fullCalendar('changeView', view);
    };
    $scope.today = function () {
      calendar.fullCalendar('today');
    };
    $scope.renderCalender = function (calendar) {
      if (calendar) {
        calendar.fullCalendar('render');
      }
    };
    $scope.shiftZoneOptions = {
      query: function (query) {
        var data = { results: [] };
        $scope.shiftFilters.filterName = '';
        $scope.shiftFilters.filterValue = '';
        data.results.push({
          text: 'All',
          id: 'all'
        });
        if ($viewname == 'agendaWeek' || $viewname == 'month') {
          data = { results: [] };
        }
        $scope.zoneObj = {
          fields: 'zone_name,zone_code',
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
              'id': item.zone_code
            });
            query.callback(data);
          });
        });
      },
      initSelection: function (element, callback) {
        if (!angular.isUndefined($scope.shiftFilters.zoneName) && !angular.isUndefined($scope.shiftFilters.zoneName.id) && $scope.shiftFilters.zoneName.id) {
          callback({
            'text': $scope.shiftFilters.zoneName.text,
            'id': $scope.shiftFilters.zoneName.id
          });
        }
      }
    };
    $scope.Selectfield = {
      query: function (query) {
        var data = { results: [] };
        $scope.shiftFilters.filterName = '';
        $scope.shiftFilters.filterValue = '';
        data.results.push({
          text: 'All',
          id: 'all'
        });
        if ($viewname == 'agendaWeek' || $viewname == 'month') {
          data = { results: [] };
        }
        var items = [
            {
              id: 'job_id',
              name: 'Job'
            },
            {
              id: 'employee_code',
              name: 'Employee'
            }
          ];
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
    $scope.shiftFilterOptions = {
      query: function (query) {
        var data = { results: [] };
        if ($scope.shiftFilters.filterName.id == 'job_id') {
          $scope.jobObj = {
            fields: 'job_name,job_code,id',
            filter: 'status > 0 and agency_id =' + Services.getAgencyID() + '  and job_zone =' + $scope.shiftFilters.zoneName.id,
            order: 'job_name asc',
            limit: 20
          };
          if (query.term) {
            $scope.jobObj.filter += ' and job_name like "%' + query.term + '%"';
          }
          Services.jobService.get($scope.jobObj, function (remoteData) {
            items = remoteData.record;
            if (items.length < 1) {
              $scope.shiftFilters.filterValue = {
                'name': 'Select a Name',
                'code': '',
                'text': 'Select a Name',
                'id': ''
              };
              query.callback(data);
            }
            angular.forEach(items, function (item, key) {
              data.results.push({
                id: item.id,
                text: item.job_name,
                name: item.job_name,
                code: item.job_code
              });
              query.callback(data);
            });
          });
        } else if ($scope.shiftFilters.filterName.id == 'employee_code') {
          $scope.empObj = {
            fields: 'first_name,last_name,access_code,id',
            filter: 'status > 0 and agency_id =' + Services.getAgencyID() + ' and zone_id =' + $scope.shiftFilters.zoneName.id,
            'order': 'last_name asc',
            limit: 20
          };
          if (query.term) {
            $scope.empObj.filter += '  and (last_name like "%' + query.term + '%" or first_name like "%' + query.term + '%")';
          }
          Services.employeeService.get($scope.empObj, function (remoteData) {
            items = remoteData.record;
            if (items.length < 1) {
              $scope.shiftFilters.filterValue = {
                'name': 'Select a Name',
                'code': '',
                'text': 'Select a Name',
                'id': ''
              };
              query.callback(data);
            }
            angular.forEach(items, function (item, key) {
              data.results.push({
                id: item.id,
                text: item.last_name + ', ' + item.first_name,
                name: item.last_name + ', ' + item.first_name,
                code: item.access_code
              });
              query.callback(data);
            });
          });
        }
      },
      initSelection: function (element, callback) {
      }
    };
    $scope.getNewShifts = function (start, end, callback, calendar) {
      $scope.startDate = start;
      $scope.endDate = end;
      // Coded By revathy Begin
      if ($viewname == 'agendaDay' || !angular.isUndefined($scope.shiftFilters.filterValue.id) && $scope.shiftFilters.filterValue.id) {
        start = moment(start).utc().format('YYYY-MM-DD HH:mm');
        end = moment(end).utc().format('YYYY-MM-DD HH:mm');
        var filterObj = {
            'fields': 'id,in_at,out_at,job,notes,shift_code,is_recurrence,duriation,ref_in_at,clock_in_time,clock_in_status,employee',
            'filter': 'ref_in_at between "' + start + '" and "' + end + '" and agency_id = ' + Services.getAgencyID()
          };
        if ($scope.shiftFilters.filterName.id != 'all' && $scope.shiftFilters.filterValue.id) {
          filterObj.filter = filterObj.filter + ' and ' + $scope.shiftFilters.filterName.id + '="' + $scope.shiftFilters.filterValue.code + '"';
        } else if ($scope.shiftFilters.zoneName && $scope.shiftFilters.zoneName.id != 'all') {
          filterObj.filter = filterObj.filter + ' and zone_id="' + $scope.shiftFilters.zoneName.id + '"';
        }
        Services.shiftService.get(filterObj, function (data) {
          $scope.eventSource = [];
          $scope.buildShiftList(data.record, calendar);
          if (callback) {
            var events = [];
            callback(events);
          }
        });
      } else {
        $scope.eventSource = [];
        record = [];
        $scope.buildShiftList(record, 'calendar1');
      }
    };
    $scope.filterCalender = function (calendar) {
      if (($scope.shiftFilters.zoneName === '' || $scope.shiftFilters.filterName === '' || $scope.shiftFilters.filterValue === '') && ($scope.shiftFilters.zoneName.id !== 'all' && $scope.shiftFilters.filterName.id !== 'all') || $scope.shiftFilters.filterName.id !== 'all' && $scope.shiftFilters.filterValue.id === '') {
        $scope.showerrorMsg = true;
        $scope.error_msg = 'Please use the required filters';
        $timeout(function () {
          $scope.showerrorMsg = false;
        }, 3000);
        return false;
      }
      $scope.getNewShifts($scope.startDate, $scope.endDate, '', calendar);
      return false;
    };
    $scope.clearSearch = function (calender) {
      $scope.shiftFilters.filterValue = '';
      $scope.shiftFilters.filterName = '';
      if ($localStorage.user_info.iszone_code) {
        Services.getEmpZoneDetail().then(function (res) {
          $scope.shiftFilters.zoneName = {
            'text': res.data.record[0]['zone_name'],
            'id': res.data.record[0]['zone_code']
          };
          $scope.getNewShifts($scope.startDate, $scope.endDate, '', calendar);
        });
      } else {
        $scope.shiftFilters.zoneName = '';
        $scope.getNewShifts($scope.startDate, $scope.endDate, '', calendar);
      }
    };
    $scope.enableEdit = function () {
    };
    if ($scope.mapbox.zoneid && $scope.mapbox.jobid && $scope.mapbox.empid) {
      $scope.addEvent();
    }
  }
]).controller('AddUpdateScheduleCtrl', [
  '$scope',
  'Services',
  '$state',
  '$stateParams',
  '$timeout',
  'HelperService',
  '$localStorage',
  '$modal',
  '$sce',
  '$window',
  '$modalInstance',
  function ($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage, $modal, $sce, $window, $modalInstance) {
    $scope.empCountry = $localStorage.user_info.country;
    $scope.ok = function () {
      $modalInstance.close('takethisvalue');
    };
    $scope.cancel = function () {
      Services.setModelMapView('');
      $modalInstance.dismiss('cancel');
    };
    $scope.empSteps = {};
    $scope.savedisable = 0;
    $scope.shift = {};
    $scope.shift.alerts = 0;
    $scope.Shiftcode_error = 1;
    $scope.job_authorization = '';
    $scope.shift.authorization = {
      'id': '',
      'text': ''
    };
    $scope.shift.employee = {
      'text': 'Any Employee',
      'id': 'all',
      'code': 'all'
    };
    $scope.cnt = 1;
    $scope.generateShiftcode_count = 0;
    $scope.shift.recurrence = {};
    // no recure
    $scope.shift.recurrence.is = 0;
    $scope.shift.recurrence.type = 0;
    // defailt daily 
    $scope.shift.recurrence.daily = {};
    $scope.shift.recurrence.daily.isdayLimit = 1;
    $scope.shift.recurrence.daily.dayLimit = 1;
    $scope.shift.recurrence.end = {};
    $scope.shift.recurrence.end.isendOccur = 1;
    $scope.shift.recurrence.end.occurcount = 1;
    $scope.shift.recurrence.week = {};
    $scope.shift.recurrence.week.weeklimt = 1;
    $scope.shiftTitle = 'Add';
    $scope.shift.edit_recurrence = 1;
    $scope.shift.hide_recurrence = 1;
    $scope.shift.recurrence.month = {};
    $scope.listAuth = 0;
    $scope.authorizationCnt = 0;
    //  $scope.authorizationErrorDate=[];
    $scope.showShiftError = false;
    $scope.WarningClass = false;
    var shift_detail = Services.getModelTempVar();
    Services.setModelTempVar('');
    var getmapview = Services.getModelMapView();
    if (getmapview) {
      Services.setModelMapView('');
      $scope.shift.zone = getmapview.zone;
      $scope.shift.empZone = getmapview.zone;
      $scope.shift.employee = getmapview.empid;
      $scope.shift.job = getmapview.job;
    } else if ($localStorage.user_info.iszone_code) {
      Services.getEmpZoneDetail().then(function (res) {
        $scope.shift.zone = {
          'text': res.data.record[0]['zone_name'],
          'id': res.data.record[0]['zone_code']
        };
      });
    }
    if (shift_detail) {
      $scope.allshiftId = shift_detail.allshiftId;
      if (shift_detail.shiftId) {
        $scope.shiftId = shift_detail.shiftId;
      } else {
        $scope.shiftId = '';
      }
      if (shift_detail.shiftCode) {
        $scope.eventcode = shift_detail.shiftCode;
      } else {
        $scope.eventcode = '';
      }
    } else {
      $scope.shiftId = '';
      $scope.eventcode = '';
    }
    if ($scope.shiftId || $scope.eventcode) {
      $scope.shiftTitle = 'Update';
      if ($scope.allshiftId) {
        filterObj = {
          'limit': 1,
          'order': 'id asc',
          filter: 'shift_code=\'' + $scope.eventcode + '\' and status > 0 and agency_id = ' + Services.getAgencyID()
        };
      } else {
        filterObj = { filter: 'id=\'' + $scope.shiftId + '\' and status > 0' };
      }
      Services.shiftService.get(filterObj, function (remoteData) {
        $scope.shiftDBField = {};
        $scope.shift = {};
        $scope.setempZone = false;
        $scope.shift.recurrence = {};
        $scope.shift.recurrence.daily = {};
        $scope.shift.recurrence.week = {};
        $scope.shift.recurrence.end = {};
        $scope.shift.recurrence.type = {};
        $scope.shift.recurrence.month = {};
        $scope.shift.dataLength = remoteData.record.length;
        $scope.shiftDBField = remoteData.record[0];
        $scope.shift.zone = $scope.shiftDBField.zone ? JSON.parse($scope.shiftDBField.zone) : '';
        $scope.shift.job = $scope.shiftDBField.job ? JSON.parse($scope.shiftDBField.job) : '';
        $scope.shift.employee = $scope.shiftDBField.employee ? JSON.parse($scope.shiftDBField.employee) : '';
        $scope.shift.shift_code = $scope.shiftDBField.shift_code;
        $scope.shift.inAt = $scope.shiftDBField.in_at ? moment($scope.shiftDBField.in_at).toDate() : '';
        $scope.shift.notes = $scope.shiftDBField.notes;
        $scope.shift.duration = $scope.shiftDBField.duriation;
        $scope.shift.recurrence.is = $scope.shiftDBField.is_recurrence ? JSON.parse($scope.shiftDBField.is_recurrence) : '';
        $scope.shift.alerts = $scope.shiftDBField.is_alert ? JSON.parse($scope.shiftDBField.is_alert) : '';
        $scope.shift.authorization = $scope.shiftDBField.auth_detail ? JSON.parse($scope.shiftDBField.auth_detail) : '';
        $scope.Shiftcode_error = 0;
        if ($scope.shiftDBField.auth_detail) {
          var note_val = JSON.parse($scope.shiftDBField.auth_detail);
          $scope.shift.authorization_notes = note_val.notes;
        }
        $scope.shift.editedOn = HelperService.convertUTCtoMytimeZone($scope.shiftDBField.edited_on);
        $scope.shift.edited_by = $scope.shiftDBField.edited_by;
        $scope.shift.created_on = HelperService.convertUTCtoMytimeZone($scope.shiftDBField.created_on);
        $scope.shift.created_by = $scope.shiftDBField.created_by;
        $scope.shift.recurrence = $scope.shiftDBField.recurrence ? JSON.parse($scope.shiftDBField.recurrence) : '';
        $scope.shift.empZone = $scope.shiftDBField.empzone_detail ? JSON.parse($scope.shiftDBField.empzone_detail) : '';
        if ($scope.shiftDBField.recurrence) {
          $scope.shiftDBField.recurrence = JSON.parse($scope.shiftDBField.recurrence);
          if (angular.isDefined($scope.shiftDBField.recurrence.end)) {
            if (angular.isDefined($scope.shiftDBField.recurrence.end.date)) {
              $scope.shift.recurrence.end.date = $scope.shiftDBField.recurrence.end.date ? moment($scope.shiftDBField.recurrence.end.date).toDate() : '';  /* $scope.shift.recurrence.end.date =($scope.shiftDBField.recurrence.end.date) ? moment($scope.shiftDBField.recurrence.end.date).format("YYYY-MM-DD") : "";*/
            }
          }
        }
        if (($scope.shift.recurrence.is == '1' || $scope.shift.recurrence.is === 1) && $scope.allshiftId !== '') {
          $scope.shift.edit_recurrence = 1;
          $scope.shift.hide_recurrence = 1;
          $scope.shiftTitle = 'Update All';
        } else {
          $scope.shift.hide_recurrence = 0;
          $scope.shift.edit_recurrence = 0;
        }
        if ($scope.allshiftId === '') {
          $scope.shift.edit_recurrence = 0;
          $scope.shift.hide_recurrence = 0;
          $scope.shiftTitle = 'Update ';
        }
      });
    }
    $scope.getRecursiveDate = function (recuriveType) {
      var momementObj = moment($scope.shift.inAt);
      var endDate;
      var weekDates;
      var weekDayStart, monthDates;
      var recurDates, weekDaysArray;
      if (recuriveType == '0') {
        // daily 
        if ($scope.shift.recurrence.daily.isdayLimit == '1') {
          // if it is 1 daytime if 2 the it every week day
          $scope.recObj = momementObj.recur().every($scope.shift.recurrence.daily.dayLimit).days();  // setrecurive
        } else if ($scope.shift.recurrence.daily.isdayLimit == '2') {
          $scope.recObj = momementObj.recur().every([
            1,
            2,
            3,
            4,
            5
          ]).daysOfWeek();  // setrecuriveevery week day
        }
        if ($scope.shift.recurrence.end.isendOccur == '1') {
          // if end by number occurence 
          if (moment(momementObj).isBefore(moment())) {
            // check in at date in after today
            return $scope.recObj.next($scope.shift.recurrence.end.occurcount, 'L');
          } else {
            var occurcount = $scope.shift.recurrence.end.occurcount - 1;
            var temp;
            temp = $scope.recObj.next(occurcount, 'L');
            temp.unshift(momementObj.format('MM/DD/YYYY'));
            return temp;
          }
        } else if ($scope.shift.recurrence.end.isendOccur == '2') {
          // if end date is seleceted 
          if (moment(momementObj).isBefore(moment())) {
            // check in at date in after today
            $scope.recObj.startDate(moment($scope.shift.inAt).add(1, 'days'));  // remove a day
          }
          $scope.recObj.endDate(moment($scope.shift.recurrence.end.date).format('MM/DD/YYYY'));
          return $scope.recObj.all('L');
        }
      } else if (recuriveType == '1') {
        //weekly
        if ($scope.shift.recurrence.end.isendOccur == '1') {
          // if end by number occurence
          $scope.recObj = momementObj.recur().every($scope.shift.recurrence.week.weeklimt).weeks();
          // setrecurive
          weekDates = $scope.recObj.next($scope.shift.recurrence.end.occurcount, 'L');
          if (moment(momementObj).isBefore(moment())) {
            // check in at date in after today
            // actually 1 day has to be advanced (added)    
            weekDates.unshift(momementObj.format('MM/DD/YYYY'));  // actually keep same date
          } else {
            weekDates.unshift(momementObj.format('MM/DD/YYYY'));  // actually keep same date
          }
          recurDates = [];
          for (i = 0; i < weekDates.length; i++) {
            if (recurDates.length < $scope.shift.recurrence.end.occurcount) {
              var tempMomt = moment(moment(weekDates[i]).format('MM/DD/YYYY'));
              //get week days
              weekDaysArray = [];
              if ($scope.shift.recurrence.week.isSun || $scope.shift.recurrence.week.isMon || $scope.shift.recurrence.week.isTue || $scope.shift.recurrence.week.isWed || $scope.shift.recurrence.week.isThur || $scope.shift.recurrence.week.isFri || $scope.shift.recurrence.week.isSat) {
                if ($scope.shift.recurrence.week.isSun) {
                  weekDaysArray.push('0');
                }
                if ($scope.shift.recurrence.week.isMon) {
                  weekDaysArray.push('1');
                }
                if ($scope.shift.recurrence.week.isTue) {
                  weekDaysArray.push('2');
                }
                if ($scope.shift.recurrence.week.isWed) {
                  weekDaysArray.push('3');
                }
                if ($scope.shift.recurrence.week.isThur) {
                  weekDaysArray.push('4');
                }
                if ($scope.shift.recurrence.week.isFri) {
                  weekDaysArray.push('5');
                }
                if ($scope.shift.recurrence.week.isSat) {
                  weekDaysArray.push('6');
                }
              } else {
                weekDaysArray = [
                  '0',
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6'
                ];
              }
              if (i === 0) {
                // at only first week 
                // to deside wether to include the firstdate or not 
                if (moment(momementObj).isBefore(moment())) {
                } else {
                  if (jQuery.inArray(momementObj.format('d'), weekDaysArray) > -1) {
                    recurDates = [momementObj.format('MM/DD/YYYY')];
                  }
                }
                //at first loop let firt coming  date be  a start date
                weekDayStart = moment(tempMomt).add(1, 'days').format('MM/DD/YYYY');
                // add 1 day bacase 1 days consider  to add or not on above
                endDate = moment(moment(weekDayStart).add(5 - Number(tempMomt.format('d')), 'days'));  // 5 because 1 day already added
              } else {
                weekDayStart = moment(tempMomt.subtract(Number(tempMomt.format('d')), 'days'));
                endDate = moment(moment(weekDayStart).add(6, 'days'));
              }
              temprec = moment(moment(moment(weekDayStart).format('MM/DD/YYYY'))).recur().every(weekDaysArray).daysOfWeek();
              if ($scope.shift.recurrence.end.occurcount - recurDates.length >= weekDaysArray.length) {
                temprec.endDate(moment(endDate).format('MM/DD/YYYY'));
                // set end sate as next week start
                if (moment(weekDayStart).isBefore(moment(endDate))) {
                  // check if end date is greater then start date
                  recurDates = recurDates.concat(temprec.all('L'));
                }
              } else if ($scope.shift.recurrence.end.occurcount - recurDates.length < weekDaysArray.length && $scope.shift.recurrence.end.occurcount - recurDates.length > 0) {
                var startDate = moment(moment(weekDayStart).subtract(1, 'days'));
                temprec.startDate(startDate.format('MM/DD/YYYY'));
                // set start date before 1 day ago, as next function skips day start
                recurDates = recurDates.concat(temprec.next($scope.shift.recurrence.end.occurcount - recurDates.length, 'L'));
              }
            }
          }
        } else if ($scope.shift.recurrence.end.isendOccur == '2') {
          // if end date is seleceted 
          //get first of week from shift start date // sunday
          var WeekStartDateObj = moment(moment($scope.shift.inAt).subtract(Number(moment($scope.shift.inAt).format('d')), 'days'));
          $scope.recObj = WeekStartDateObj.recur({ 'end': moment($scope.shift.recurrence.end.date).format('MM/DD/YYYY') }).every($scope.shift.recurrence.week.weeklimt).weeks();
          // setrecurive
          weekDates = $scope.recObj.all('L');
          // console.info(weekDates);
          recurDates = [];
          for (i = 0; i < weekDates.length; i++) {
            weekDaysArray = [];
            if ($scope.shift.recurrence.week.isSun || $scope.shift.recurrence.week.isMon || $scope.shift.recurrence.week.isTue || $scope.shift.recurrence.week.isWed || $scope.shift.recurrence.week.isThur || $scope.shift.recurrence.week.isFri || $scope.shift.recurrence.week.isSat) {
              if ($scope.shift.recurrence.week.isSun) {
                weekDaysArray.push('0');
              }
              if ($scope.shift.recurrence.week.isMon) {
                weekDaysArray.push('1');
              }
              if ($scope.shift.recurrence.week.isTue) {
                weekDaysArray.push('2');
              }
              if ($scope.shift.recurrence.week.isWed) {
                weekDaysArray.push('3');
              }
              if ($scope.shift.recurrence.week.isThur) {
                weekDaysArray.push('4');
              }
              if ($scope.shift.recurrence.week.isFri) {
                weekDaysArray.push('5');
              }
              if ($scope.shift.recurrence.week.isSat) {
                weekDaysArray.push('6');
              }
            } else {
              weekDaysArray = [
                0,
                1,
                2,
                3,
                4,
                5,
                6
              ];
            }
            if (moment(weekDates[i]).isBefore(moment($scope.shift.recurrence.end.date).format('MM/DD/YYYY'))) {
              // end date cant be greater then start date
              // start date  starts
              if (i === 0) {
                //weekDayStart = moment(weekDates[i]).format("MM/DD/YYYY");
                weekDayStart = moment($scope.shift.inAt).format('MM/DD/YYYY');
              } else {
                //get start date , start always a 1 day of week ie : sunday
                weekDayStart = moment(moment(weekDates[i]).subtract(Number(moment(weekDates[i]).format('d')), 'days')).format('MM/DD/YYYY');  //.format("MM/DD/YYYY");
              }
              // start date  ends
              $scope.recObj = moment(moment(weekDayStart).format('MM/DD/YYYY')).recur().every(weekDaysArray).daysOfWeek();
              if (i === 0) {
                endDate = moment(moment(weekDayStart).add(6 - Number(moment(weekDayStart).format('d')), 'days')).format('MM/DD/YYYY');
              } else {
                var indeEnd;
                /* if (i == (weekDates.length - 1)) { // if it is last loop, there is no next end date, so let the acutall end date
                                     indeEnd = i;
                                     endDate = moment($scope.shift.recurrence.end.date).format("MM/DD/YYYY");

                                 } else {
                                     indeEnd = i + 1;
                                     var AddForEndDate = 7 - moment(weekDayStart).format("d");
                                     // always add 6 days (week)
                                     AddForEndDate = 6;
                                     // var endDate =moment(weekDates[indeEnd]).subtract(1, 'days').format("MM/DD/YYYY");  it is woring, the end date should in same week
                                     endDate = moment(weekDayStart).add(AddForEndDate, 'days').format("MM/DD/YYYY");
                                 }*/
                // Note : above code commented because starte date will be always sunday, to find exact end date , addding 6 day to it is correct, we dont need to use actuall end date as end date
                indeEnd = i + 1;
                var AddForEndDate = 7 - moment(weekDayStart).format('d');
                // always add 6 days (week)
                AddForEndDate = 6;
                // var endDate =moment(weekDates[indeEnd]).subtract(1, 'days').format("MM/DD/YYYY");  it is woring, the end date should in same week
                endDate = moment(weekDayStart).add(AddForEndDate, 'days').format('MM/DD/YYYY');
                var endDateRecEnd = moment($scope.shift.recurrence.end.date).format('MM/DD/YYYY');
                if (moment(endDateRecEnd).isBefore(moment(endDate).format('MM/DD/YYYY'))) {
                  // end date cant be greater then actual end date
                  endDate = endDateRecEnd;
                }
              }
              //console.log("endate = ",endDate);
              $scope.recObj.endDate(endDate);
              // set end sate as next week start
              recurDates = recurDates.concat($scope.recObj.all('L'));  //$scope. added here 14 Jan
            }
          }
        }
        //console.log(recurDates);
        return recurDates;
      } else if (recuriveType == '2') {
        // monthy
        if ($scope.shift.recurrence.end.isendOccur == '1') {
          // if number occur 
          if ($scope.shift.recurrence.month.isDay == '1') {
            //opt 1
            recObj = momementObj.recur().every($scope.shift.recurrence.month.thMonth).months();
            // setrecurive
            monthDates = recObj.next($scope.shift.recurrence.end.occurcount, 'L');
            if (moment(momementObj.date($scope.shift.recurrence.month.thDay)).isBefore(moment())) {
            } else {
              monthDates.unshift(momementObj.format('MM/DD/YYYY'));
            }
            recurDates = [];
            for (i = 0; i < monthDates.length; i++) {
              if (recurDates.length < $scope.shift.recurrence.end.occurcount) {
                recurDates = recurDates.concat(moment(monthDates[i]).date($scope.shift.recurrence.month.thDay).format('MM/DD/YYYY'));
              }
            }
          } else if ($scope.shift.recurrence.month.isDay == '2') {
            //opt2 not working now
            recObj = momementObj.recur().every($scope.shift.recurrence.month.thEMonth).months();
            // setrecurive
            monthDates = recObj.next($scope.shift.recurrence.end.occurcount, 'L');
            recurDates = [];
            for (i = 0; i < monthDates.length; i++) {
              if (recurDates.length < $scope.shift.recurrence.end.occurcount) {
                var firstdateOfMonth = moment(monthDates[i]).date(1).format('MM/DD/YYYY');
                var lastdateOfMonth = moment(firstdateOfMonth).add(1, 'months').date(0);
              }
            }
            return false;
          }
        } else if ($scope.shift.recurrence.end.isendOccur == '2') {
          // if end date choosen
          recObj = momementObj.recur({ 'end': moment($scope.shift.recurrence.end.date).format('MM/DD/YYYY') }).every($scope.shift.recurrence.month.thMonth).months();
          // setrecurive
          monthDates = recObj.all('L');
          recurDates = [];
          for (i = 0; i < monthDates.length; i++) {
            if (moment(moment(monthDates[i]).date($scope.shift.recurrence.month.thDay).format('MM/DD/YYYY')).isBefore(moment($scope.shift.recurrence.end.date).format('MM/DD/YYYY'))) {
              //month date end date cant be greater then start date
              recurDates = recurDates.concat(moment(monthDates[i]).date($scope.shift.recurrence.month.thDay).format('MM/DD/YYYY'));
            }
          }
        }
        return recurDates;
      }
    };
    $scope.checkShiftcode = function () {
      $scope.generateShiftcode_count++;
      if ($scope.generateShiftcode_count < 5) {
        $scope.shift.shift_code = $window.Math.floor($window.Math.random() * 10000);
        Services.shiftService.get({
          fields: 'id',
          filter: 'shift_code = \'' + $scope.shift.shift_code + '\' and agency_id = ' + Services.getAgencyID(),
          'include_count': true
        }, function (remoteData) {
          if (remoteData.meta.count !== 0) {
            $scope.checkShiftcode();
          } else {
            angular.forEach($scope.shiftDBField, function (item, key) {
              $scope.shiftDBField[key].shift_code = JSON.stringify($scope.shift.shift_code);
            });
            if ($scope.shiftId !== '') {
              Services.shiftRecurService.delete($scope.deleteObj, function (remoteData) {
                Services.shiftService.save($scope.shiftDBField, function (data) {
                  $scope.savedisable = 0;
                  $scope.showerrorMsg = true;
                  $scope.ErrorClass = 'success';
                  $scope.ErrorMsg = 'Shift edited sucessfully !!!';
                  $timeout(function () {
                    $scope.showerrorMsg = false;
                    $state.go('ctApp.schedules');
                    $scope.ok();
                  }, 5000);
                });
              });
            } else {
              Services.shiftService.save($scope.shiftDBField, function (data) {
                $scope.savedisable = 0;
                $scope.showerrorMsg = true;
                $scope.ErrorClass = 'success';
                $scope.ErrorMsg = 'Shift sucessfully added !!!';
                $timeout(function () {
                  $scope.showerrorMsg = false;
                  $state.go('ctApp.schedules');
                  $scope.ok();
                }, 5000);
              });
            }
          }
        });
      } else {
        $scope.savedisable = 0;
        $scope.showerrorMsg = true;
        $scope.ErrorClass = 'success';
        $scope.ErrorMsg = 'Shift sucessfully added !!!';
        $timeout(function () {
          $scope.showerrorMsg = false;
          $state.go('ctApp.schedules');
          $scope.ok();
        }, 5000);
      }
    };
    $scope.scheduleManage = function (step) {
      $scope.savedisable = 1;
      $scope.showerrorMsg = false;
      var length;
      if (step == 'basic') {
        /* $scope.savedisable = 1;
                 $scope.checkShiftcode();
                 */
        $scope.savedisable = 0;
        $scope.empSteps.recurrence = true;
      }
      if (step == 'recurrence') {
        var in_time, out_time, firstDateR, lastDateR, inat, outat, intime, outtime;
        $scope.savedisable = 1;
        if (moment($scope.shift.inAt).isBefore(moment())) {
          // check in at date in before today day (if it is past date)
          $scope.savedisable = 0;
          $scope.showerrorMsg = true;
          $scope.ErrorClass = 'danger';
          $scope.ErrorMsg = 'Start Date can\'t be past date';
          $timeout(function () {
            $scope.showerrorMsg = false;
          }, 3000);
          return false;
        }
        if ($scope.authorizationCnt > 0 && angular.isUndefined($scope.shift.authorization.id)) {
          $scope.savedisable = 0;
          $scope.showerrorMsg = true;
          $scope.ErrorClass = 'danger';
          $scope.ErrorMsg = 'Please select Authorization !!!';
          $timeout(function () {
            $scope.showerrorMsg = false;
          }, 3000);
          return false;
        }
        if ($scope.shift.recurrence.end.date && $scope.shift.recurrence.is == '1' && $scope.shift.recurrence.end.isendOccur == '2') {
          if (Date.parse($scope.shift.outAt) > Date.parse($scope.shift.recurrence.end.date)) {
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'Invalid Recurrence End on date  !!!';
            jQuery('.basic .ng-invalid').addClass('ng-dirty');
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 3000);
            return false;
          }
        }
        if ($scope.shift.recurrence.end.isendOccur == 2 && $scope.shift.recurrence.is == '1') {
          if (moment($scope.shift.inAt).isAfter(moment($scope.shift.recurrence.end.date))) {
            // check in at date in after end day
            $scope.savedisable = 0;
            $scope.showerrorMsg = true;
            $scope.ErrorClass = 'danger';
            $scope.ErrorMsg = 'End date can\'t be lesser then start date';
            $timeout(function () {
              $scope.showerrorMsg = false;
            }, 3000);
            return false;
          }
          if ($scope.shift.recurrence.type == 1) {
            $scope.savedisable = 1;
            if (moment(moment($scope.shift.inAt).add(6, 'days')).isAfter(moment($scope.shift.recurrence.end.date))) {
              // check in at date in after end day
              $scope.savedisable = 0;
              $scope.showerrorMsg = true;
              $scope.ErrorClass = 'danger';
              $scope.ErrorMsg = 'End date can\'t be lesser then Week ( ' + moment(moment($scope.shift.inAt).add(7, 'days')).format('MM/DD/YYYY') + ' )';
              $timeout(function () {
                $scope.showerrorMsg = false;
              }, 3000);
              return false;
            }
          }
        }
        var recurrenceflag = true;
        if ($scope.shift.recurrence.is == '1') {
          recurrenceflag = false;
          $scope.todayNow = moment().format();
          $scope.tempoutputDates = $scope.getRecursiveDate($scope.shift.recurrence.type);
          length = $scope.tempoutputDates.length;
        }
        $scope.shiftDBField = [];
        $scope.shiftDBField[0] = {};
        $scope.shiftDBField[0].zone = JSON.stringify($scope.shift.zone);
        $scope.shiftDBField[0].empzone_detail = JSON.stringify($scope.shift.empZone);
        $scope.shiftDBField[0].zone_id = $scope.shift.zone.id;
        $scope.shiftDBField[0].job = JSON.stringify($scope.shift.job);
        $scope.shiftDBField[0].job_id = $scope.shift.job.id;
        $scope.shiftDBField[0].employee = JSON.stringify($scope.shift.employee);
        $scope.shiftDBField[0].employee_id = $scope.shift.employee.id;
        $scope.shiftDBField[0].employee_code = $scope.shift.employee.code;
        $scope.shiftDBField[0].notes = $scope.shift.notes;
        $scope.shiftDBField[0].duriation = $scope.shift.duration;
        $scope.shiftDBField[0].in_date = moment($scope.shift.inAt).utc().format('MM/DD/YYYY');
        $scope.shiftDBField[0].in_time = moment($scope.shift.inAt).utc().format('HH:mm:ss A');
        $scope.shiftDBField[0].in_at = moment($scope.shift.inAt).utc();
        $scope.shiftDBField[0].out_date = moment($scope.shift.outAt).utc().format('MM/DD/YYYY');
        $scope.shiftDBField[0].out_time = moment($scope.shift.outAt).utc().format('HH:mm:ss A');
        $scope.shiftDBField[0].out_at = moment($scope.shift.outAt).utc();
        $scope.shiftDBField[0].ref_in_at = moment($scope.shift.inAt).utc().format('YYYY-MM-DD HH:mm');
        // newly added
        $scope.shiftDBField[0].ref_out_at = moment($scope.shift.outAt).utc().format('YYYY-MM-DD HH:mm');
        // newly added
        $scope.shiftDBField[0].is_recurrence = JSON.stringify($scope.shift.recurrence.is);
        $scope.shiftDBField[0].is_alert = JSON.stringify($scope.shift.alerts);
        $scope.shiftDBField[0].alert_in_min = JSON.stringify($scope.shift.alerts);
        $scope.shiftDBField[0].alert_in_date = JSON.stringify($scope.shift.alerts);
        $scope.shiftDBField[0].alert_out_min = JSON.stringify($scope.shift.alerts);
        $scope.shiftDBField[0].alert_out_date = JSON.stringify($scope.shift.alerts);
        $scope.shiftDBField[0].agency_id = Services.getAgencyID();
        // $scope.shiftDBField[0].shift_code = $scope.shift.shift_code;
        $scope.shiftDBField[0].recurrence = JSON.stringify($scope.shift.recurrence);
        //Revathy
        $scope.shiftDBField[0].auth_detail = JSON.stringify($scope.shift.authorization);
        $scope.shiftDBField[0].auth_id = $scope.shift.authorization.id;
        $scope.shiftDBField[0].agency_id = Services.getAgencyID();
        if ($scope.shiftId !== '') {
          $scope.shiftDBField[0].created_on = $scope.shift.created_on;
          $scope.shiftDBField[0].created_by = $scope.shift.created_by;
          $scope.shiftDBField[0].edited_on = moment().utc();
          $scope.shiftDBField[0].edited_by = JSON.stringify({
            'username': $localStorage.user_info.username,
            'firstname': $localStorage.user_info.first_name,
            'lastname': $localStorage.user_info.last_name,
            'user_id': $localStorage.user_info.user_id
          });
        } else {
          $scope.shiftDBField[0].created_on = moment().utc();
          $scope.shiftDBField[0].created_by = JSON.stringify({
            'username': $localStorage.user_info.username,
            'firstname': $localStorage.user_info.first_name,
            'lastname': $localStorage.user_info.last_name,
            'user_id': $localStorage.user_info.user_id
          });
        }
        if ($scope.shift.recurrence.is == 1) {
          $scope.shiftDBField = [];
          $scope.WarningClass = false;
          // $scope.authorizationErrorDate=[];
          var keepGoing = true;
          angular.forEach($scope.tempoutputDates, function (item, key) {
            if (keepGoing) {
              /*$var inAtCurrent = moment(item + " " + moment($scope.shift.inAt).format("HH:mm"));
                            var outAtCurrent = moment($scope.getOutDate(item, $scope.shift.duration) + " " + moment($scope.shift.outAt).format("HH:mm"));*/
              var inAtCurrent = moment(item + ' ' + moment($scope.shift.inAt).format('HH:mm'));
              var outAtCurrent = moment($scope.getOutDate(item, $scope.shift.duration));
              //  console.log(outAtCurrent.format("MM/DD/YYYY HH:mm"));
              if ($scope.shift.authorization.id) {
                var in_date = inAtCurrent.format('MM/DD/YYYY');
                if (!(moment($scope.shift.authorization.enddate).unix() >= moment(in_date).unix() && moment($scope.shift.authorization.startdate).unix() <= moment(in_date).unix())) {
                  $scope.WarningClass = true;
                  keepGoing = false;  //similar as break;
                                      //$scope.authorizationErrorDate.push({
                                      //      "indate":$scope.shiftDBField[key].ref_in_at,
                                      //       "outdate": $scope.shiftDBField[key].ref_out_at
                                      //  });
                }
              }
              if (!$scope.WarningClass) {
                $scope.shiftDBField[key] = {};
                // return false;
                $scope.shiftDBField[key].zone = JSON.stringify($scope.shift.zone);
                $scope.shiftDBField[key].empzone_detail = JSON.stringify($scope.shift.empZone);
                $scope.shiftDBField[key].zone_id = $scope.shift.zone.id;
                $scope.shiftDBField[key].job = JSON.stringify($scope.shift.job);
                $scope.shiftDBField[key].job_id = $scope.shift.job.id;
                $scope.shiftDBField[key].employee = JSON.stringify($scope.shift.employee);
                $scope.shiftDBField[key].employee_id = $scope.shift.employee.id;
                $scope.shiftDBField[key].employee_code = $scope.shift.employee.code;
                $scope.shiftDBField[key].notes = $scope.shift.notes;
                $scope.shiftDBField[key].duriation = $scope.shift.duration;
                $scope.shiftDBField[key].in_date = inAtCurrent.utc().format('MM/DD/YYYY');
                $scope.shiftDBField[key].in_time = inAtCurrent.utc().format('HH:mm:ss A');
                // in time will be same in all days regardless of date
                $scope.shiftDBField[key].in_at = inAtCurrent.utc();
                $scope.shiftDBField[key].out_date = outAtCurrent.utc().format('MM/DD/YYYY');
                //$scope.getOutDate(item,$scope.shift.duration) ;
                $scope.shiftDBField[key].out_time = outAtCurrent.utc().format('HH:mm:ss A');
                // in time will be same in all days regardless of date
                $scope.shiftDBField[key].out_at = outAtCurrent.utc();
                $scope.shiftDBField[key].ref_in_at = inAtCurrent.utc().format('YYYY-MM-DD HH:mm');
                // newly added
                $scope.shiftDBField[key].ref_out_at = outAtCurrent.utc().format('YYYY-MM-DD HH:mm');
                // newly added
                $scope.shiftDBField[key].is_recurrence = JSON.stringify($scope.shift.recurrence.is);
                $scope.shiftDBField[key].is_alert = JSON.stringify($scope.shift.alerts);
                $scope.shiftDBField[key].alert_in_min = JSON.stringify($scope.shift.alerts);
                $scope.shiftDBField[key].alert_in_date = JSON.stringify($scope.shift.alerts);
                $scope.shiftDBField[key].alert_out_min = JSON.stringify($scope.shift.alerts);
                $scope.shiftDBField[key].alert_out_date = JSON.stringify($scope.shift.alerts);
                // $scope.shiftDBField[key].shift_code = JSON.stringify($scope.shift.shift_code);
                $scope.shiftDBField[key].recurrence = JSON.stringify($scope.shift.recurrence);
                $scope.shiftDBField[key].auth_detail = JSON.stringify($scope.shift.authorization);
                $scope.shiftDBField[key].auth_id = $scope.shift.authorization.id;
                $scope.shiftDBField[key].agency_id = Services.getAgencyID();
                if ($scope.shiftId !== '') {
                  $scope.shiftDBField[key].created_on = $scope.shift.created_on;
                  $scope.shiftDBField[key].created_by = $scope.shift.created_by;
                  $scope.shiftDBField[key].edited_on = moment().utc();
                  $scope.shiftDBField[key].edited_by = JSON.stringify({
                    'username': $localStorage.user_info.username,
                    'firstname': $localStorage.user_info.first_name,
                    'lastname': $localStorage.user_info.last_name,
                    'user_id': $localStorage.user_info.user_id
                  });
                } else {
                  $scope.shiftDBField[key].created_on = moment().utc();
                  $scope.shiftDBField[key].created_by = JSON.stringify({
                    'username': $localStorage.user_info.username,
                    'firstname': $localStorage.user_info.first_name,
                    'lastname': $localStorage.user_info.last_name,
                    'user_id': $localStorage.user_info.user_id
                  });
                }
              }
            }
          });  // console.log($scope.shift.authorization.startdate);
               // console.log($scope.shift.authorization.enddate);
               // console.log($scope.authorizationErrorDate);
               // return false;
        }
        firstDateR = moment($scope.shift.inAt).utc().format('YYYY-MM-DD HH:mm:ss');
        lastDateR = moment($scope.shift.outAt).utc().format('YYYY-MM-DD HH:mm:ss');
        if ($scope.tempoutputDates && $scope.shift.recurrence.is == 1) {
          lastDateR = moment($scope.tempoutputDates[length - 1] + ' ' + moment($scope.shift.outAt).format('HH:mm')).utc().format('YYYY-MM-DD HH:mm:ss');
        }
        $scope.checkshiftObj = {
          fields: 'ref_in_at,ref_out_at',
          filter: 'employee_id = \'' + $scope.shift.employee.id + '\' and (((ref_in_at <=\'' + firstDateR + '\') AND  (ref_out_at >\'' + firstDateR + '\')) OR ((ref_in_at <\'' + lastDateR + '\') AND  (ref_out_at >=\'' + lastDateR + '\')) OR ((ref_in_at >=\'' + firstDateR + '\') AND  (ref_out_at <=\'' + lastDateR + '\'))) and status > 0 and agency_id = ' + Services.getAgencyID(),
          include_count: true
        };
        /* Date already allocated [04/27/2015 03:00 pm - 04/27/2015 09:00 pm, 05/04/2015 03:00 pm - 05/04/2015 09:00 pm,
                05/11/2015 03:00 pm - 05/11/2015 09:00 pm, 05/18/2015 03:00 pm - 05/18/2015 09:00 pm,
                05/25/2015 03:00 pm - 05/25/2015 09:00 pm] */
        if ($scope.shiftId !== '') {
          // update 
          if ($scope.allshiftId === '') {
            // update single
            $scope.checkshiftObj.filter += ' and  id!=\'' + $scope.shiftId + '\'';
            $scope.deleteObj = { filter: 'id=\'' + $scope.shiftId + '\'' };
          } else {
            // update all
            $scope.checkshiftObj.filter += ' and  shift_code!=\'' + $scope.eventcode + '\'';
            $scope.deleteObj = { filter: 'shift_code=\'' + $scope.eventcode + '\'' };
          }
        }
        if ($scope.shift.employee.id != 'all') {
          var err_date = '';
          Services.shiftService.get($scope.checkshiftObj, function (remoteData) {
            var recurrenceflag = true;
            // console.log($scope.tempoutputDates);
            if ($scope.tempoutputDates && $scope.shift.recurrence.is == 1) {
              angular.forEach(remoteData.record, function (item, key) {
                var dbintime = Date.parse(moment(item.ref_in_at).format('MM/DD/YYYY HH:mm'));
                //allready in UTC form DB
                var dbouttime = Date.parse(moment(item.ref_out_at).format('MM/DD/YYYY HH:mm'));
                //console.log(moment(item.ref_out_at).format("MM/DD/YYYY HH:mm"));
                //console.log(dbouttime);
                angular.forEach($scope.tempoutputDates, function (dates) {
                  var datesT = moment(dates + ' ' + moment($scope.shift.inAt).format('HH:mm')).utc().format('MM/DD/YYYY');
                  var datesOT = moment($scope.getOutDate(dates, $scope.shift.duration)).utc().format('MM/DD/YYYY HH:mm:ss');
                  in_time = moment($scope.shift.inAt).utc().format('HH:mm:ss');
                  out_time = moment($scope.shift.outAt).utc().format('HH:mm:ss');
                  var intime = Date.parse(datesT + ' ' + in_time);
                  var outtime = Date.parse(datesOT);
                  //datesOT already in MM/DD/YYYY HH:mm:ss format
                  // console.log("----",datesT + ' ' + in_time);
                  // console.log(outtime);
                  // console.log(datesT + ' ' + out_time);
                  // console.log(outtime);
                  /* console.log("before UTC",dates);
                                    console.log("after UTC",datesT);
                                    console.log(datesT , ' ', in_time);
                                    console.log(intime);
                                    before UTC 04/28/2015
                                    schedules.js (line 1563)
                                    after UTC 04/28/2015
                                    schedules.js (line 1564)
                                    04/28/2015  23:00:00
                                    schedules.js (line 1565)
                                    1430276400000

                                    if (((intime >= dbintime) && (intime < dbouttime))){
                                        console.log("in 1576");
                                    }
                                    if (((outtime > dbintime) && (outtime <= dbouttime))){
                                       // console.log("in 1579");
                                       // console.log(outtime);
                                       // console.log(dbintime);
                                    }
                                    if (((intime <= dbintime) && (outtime >= dbouttime))){
                                        console.log("in 1582");
                                    }*/
                  if (intime >= dbintime && intime < dbouttime || outtime > dbintime && outtime <= dbouttime || intime <= dbintime && outtime >= dbouttime) {
                    err_date += HelperService.formatingDate(item.ref_in_at, $localStorage.user_info.country) + ' - ' + HelperService.formatingDate(item.ref_out_at, $localStorage.user_info.country) + ', ';
                    recurrenceflag = false;
                  }
                });
              });
            } else {
              angular.forEach(remoteData.record, function (item, key) {
                err_date += HelperService.formatingDate(item.ref_in_at, $localStorage.user_info.country) + ' - ' + HelperService.formatingDate(item.ref_out_at, $localStorage.user_info.country) + ', ';
                recurrenceflag = false;
              });
            }
            if (recurrenceflag) {
              $scope.savedisable = 1;
              $scope.checkShiftcode();
            } else {
              $scope.savedisable = 0;
              $scope.showShiftError = true;
              $scope.ShiftErrorMsg = err_date.substring(0, err_date.length - 2);
              /*$timeout(function() {
                                $scope.showShiftError = false;
                            }, 5000);
                            */
              return false;
            }
          });
        } else {
          $scope.savedisable = 1;
          $scope.checkShiftcode();
        }
      }
    };
    $scope.getOutDate = function (inDate, duriation) {
      if (inDate && duriation) {
        var a = moment(inDate + ' ' + moment($scope.shift.inAt).format('HH:mm'));
        var addObj = a.add(duriation, 'hours');
        return addObj;
      }
    };
    $scope.$watch('shift.outAt', function (newValue, oldValue) {
      if (newValue != oldValue) {
        if (!angular.isUndefined($scope.shift.inAt) && $scope.shift.inAt) {
          var a = moment(newValue);
          var b = moment($scope.shift.inAt);
          var duration = a.diff(b, 'hours', true);
          if (duration > 0) {
            dur = a.diff(b, 'hours', true);
            dur_length = dur.toString().split('.');
            if (dur_length[1] && dur_length[1].length > 2) {
              $scope.shift.duration = parseFloat(dur).toFixed(2);
            } else {
              $scope.shift.duration = dur;
            }
          } else {
            //$scope.shift.duration = ""; 
            $scope.shift.outAt = '';
          }
        }
      }
    });
    $scope.$watch('shift.inAt', function (newValue, oldValue) {
      var a;
      if (newValue != oldValue) {
        if (!angular.isUndefined($scope.shift.outAt) && $scope.shift.outAt) {
          a = moment(newValue);
          var b = moment($scope.shift.outAt);
          var duration = b.diff(a, 'hours', true);
          if (duration > 0) {
            dur = b.diff(a, 'hours', true);
            dur_length = dur.toString().split('.');
            if (dur_length[1] && dur_length[1].length > 2) {
              $scope.shift.duration = parseFloat(dur).toFixed(2);
            } else {
              $scope.shift.duration = dur;
            }
          } else {
            $scope.shift.duration = '';
            $scope.shift.outAt = '';
          }
        } else {
          if ($scope.shift.duration) {
            a = moment($scope.shift.inAt);
            //var addObj = a.add($scope.shift.duration, 'hours');
            duration_mintus = HelperService.getMintus($scope.shift.duration);
            var addObj = a.add(duration_mintus, 'minutes');
            $scope.shift.outAt = addObj.toDate();
          }
        }
      }
    });
    $scope.calcuateDiff = function () {
      if (!angular.isUndefined($scope.shift.inAt) && $scope.shift.inAt) {
        var a = moment($scope.shift.inAt);
        duration_mintus = HelperService.getMintus($scope.shift.duration);
        var addObj = a.add(duration_mintus, 'minutes');
        $scope.shift.outAt = addObj.toDate();
      }
    };
    $scope.scheduleManagePrev = function (step) {
      if (step == 'recurrence') {
        $scope.empSteps.basic = true;
        $scope.empSteps.recurrence = false;
        $scope.empSteps.alerts = false;
        $scope.empSteps.summary = false;
      }
      if (step == 'alerts') {
        $scope.empSteps.basic = false;
        $scope.empSteps.recurrence = true;
        $scope.empSteps.alerts = false;
        $scope.empSteps.summary = false;
      }
    };
    $scope.selectZone = {
      query: function (query) {
        var data = { results: [] };
        $scope.shift.job = '';
        $scope.shift.authorization = '';
        $scope.shift.employee = {
          'text': 'Any Employee',
          'id': 'all',
          'code': 'all'
        };
        $scope.setempZone = true;
        $scope.listAuth = 0;
        $scope.shift.authorization_notes = '';
        // $scope.shift.employee = '';
        $scope.zoneObj = {
          fields: 'zone_name,zone_code',
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
              'id': item.zone_code
            });
            query.callback(data);
          });
        });
      },
      initSelection: function (element, callback) {
        if (!angular.isUndefined($scope.shift.zone) && !angular.isUndefined($scope.shift.zone.id) && $scope.shift.zone.id) {
          return callback({
            'text': $scope.shift.zone.text,
            'id': $scope.shift.zone.id
          });
        }
      }
    };
    $scope.selectEmpZone = {
      query: function (query) {
        var data = { results: [] };
        if ($scope.listAuth > 0) {
          $scope.shift.employee = '';
        } else {
          $scope.shift.employee = {
            'text': 'Any Employee',
            'id': 'all',
            'code': 'all'
          };
        }
        $scope.zoneObj = {
          fields: 'zone_name,zone_code',
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
              'id': item.zone_code
            });
            query.callback(data);
          });
        });
      },
      initSelection: function (element, callback) {
        if (!angular.isUndefined($scope.shift.empZone) && !angular.isUndefined($scope.shift.empZone.id) && $scope.shift.empZone.id) {
          return callback({
            'text': $scope.shift.empZone.text,
            'id': $scope.shift.empZone.id
          });
        }
      }
    };
    $scope.selectJob = {
      query: function (query) {
        var data = { results: [] };
        $scope.listAuth = 0;
        $scope.shift.job = '';
        $scope.shift.authorization = '';
        $scope.jobObj = {
          fields: 'job_name,job_code',
          filter: 'status > 0 and agency_id = ' + Services.getAgencyID() + ' and job_zone =' + $scope.shift.zone.id,
          order: 'job_name asc',
          limit: 20
        };
        if (query.term) {
          $scope.jobObj.filter += '  and job_name like "%' + query.term + '%"';
        }
        Services.jobService.get($scope.jobObj, function (remoteData) {
          items = remoteData.record;
          if (items.length < 1) {
            query.callback(data);
          }
          angular.forEach(items, function (item, key) {
            data.results.push({
              'text': item.job_name,
              'id': item.job_code
            });
            query.callback(data);
          });
        });
      },
      initSelection: function (element, callback) {
        if (!angular.isUndefined($scope.shift.job) && !angular.isUndefined($scope.shift.job.id) && $scope.shift.job.id) {
          return callback({
            'text': $scope.shift.job.text,
            'id': $scope.shift.job.id
          });
        }
      }
    };
    $scope.selectAuthorization = {
      query: function (query) {
        var data = { results: [] };
        if ($scope.shift.inAt) {
          $scope.authObj = {
            fields: 'id,payor_detail,frequency,notes,authorization_start_date,total_hours,authorization_end_date',
            filter: 'job =\'' + $scope.shift.job.id + '\' and status > 0 and authorization_end_date>=\'' + moment($scope.shift.inAt).format('YYYY-MM-DD') + '\' and authorization_start_date<=\'' + moment($scope.shift.inAt).format('YYYY-MM-DD') + '\'  and agency_id = ' + Services.getAgencyID(),
            order: 'job asc',
            limit: 5
          };
          if (query.term) {
            $scope.authObj.filter += '  and payor like \'%' + query.term + '%\'';
          }
          Services.jobauthorizationService.get($scope.authObj, function (remoteData) {
            items = remoteData.record;
            if (items.length < 1) {
              query.callback(data);
            }
            angular.forEach(items, function (item, key) {
              if (item.payor_detail) {
                data.results.push({
                  'text': JSON.parse(item.payor_detail).text + ' ( ' + item.frequency + ' ' + item.total_hours + ' Hrs )',
                  'id': item.id,
                  'notes': item.notes,
                  'startdate': moment(item.authorization_start_date).format('MM/DD/YYYY'),
                  'enddate': moment(item.authorization_end_date).format('MM/DD/YYYY')
                });
                query.callback(data);
              }
            });
          });
        } else {
          query.callback(data);
        }
      },
      initSelection: function (element, callback) {
        if (!angular.isUndefined($scope.shift.authorization) && !angular.isUndefined($scope.shift.authorization.id) && $scope.shift.authorization.id) {
          $scope.shift.authorization_notes = $scope.shift.authorization.notes;
          return callback({
            'text': $scope.shift.authorization.text,
            'id': $scope.shift.authorization.id,
            'notes': $scope.shift.authorization.notes,
            'startdate': $scope.shift.authorization.startdate,
            'enddate': $scope.shift.authorization.enddate
          });
        }
      }
    };
    $scope.selectEmployee = {
      query: function (query) {
        var data = { results: [] };
        $scope.empObj = {
          fields: 'first_name,last_name,access_code,id',
          filter: 'status > 0 and zone_id =' + $scope.shift.empZone.id + ' and agency_id = ' + Services.getAgencyID(),
          'order': 'last_name asc',
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
              'text': item.last_name + ', ' + item.first_name,
              'id': item.id,
              'code': item.access_code
            });
            query.callback(data);
          });
        });
      },
      initSelection: function (element, callback) {
        if (!angular.isUndefined($scope.shift.employee) && !angular.isUndefined($scope.shift.employee.id) && $scope.shift.employee.id) {
          return callback({
            'text': $scope.shift.employee.text,
            'id': $scope.shift.employee.id,
            'code': $scope.shift.employee.code
          });
        }
      }
    };
    $scope.Authorization = function (type) {
      if (type == 'job') {
        if ($scope.cnt == 1) {
          $scope.cnt++;
        } else {
          $scope.cnt++;
          $scope.shift.authorization = {
            'text': '',
            'id': '',
            'code': ''
          };
          $scope.shift.authorization = '';
          $scope.shift.authorization_notes = '';
        }
        $scope.shift.authorization_notes = '';
      }
      if (!angular.isUndefined($scope.shift.job) && !angular.isUndefined($scope.shift.job.id) && $scope.shift.job.id) {
        Services.jobauthorizationService.get({
          filter: 'job =\'' + $scope.shift.job.id + '\'  and status > 0 and agency_id = ' + Services.getAgencyID(),
          fields: 'count(id)'
        }, function (remoteData) {
          if (remoteData.record[0]['count(id)'] > 0) {
            $scope.listAuth = remoteData.record[0]['count(id)'];
            if ($scope.shift.employee.id == 'all') {
              $scope.shift.employee = '';
            }
          }
        });
      }
      if (!angular.isUndefined($scope.shift.job) && !angular.isUndefined($scope.shift.job.id) && $scope.shift.job.id && $scope.shift.inAt) {
        Services.jobauthorizationService.get({
          filter: 'job =\'' + $scope.shift.job.id + '\'  and status > 0 and authorization_end_date>=\'' + moment($scope.shift.inAt).format('YYYY-MM-DD') + '\' and authorization_start_date<=\'' + moment($scope.shift.inAt).format('YYYY-MM-DD') + '\' and agency_id = ' + Services.getAgencyID(),
          fields: 'count(id)'
        }, function (remoteData) {
          $scope.authorizationCnt = remoteData.record[0]['count(id)'];
        });
      }
    };
    $scope.getAuthorizationNotes = function () {
      $scope.shift.authorization_notes = $scope.shift.authorization.notes;
    };
    //Revathy
    $scope.generateShiftcode = function () {
      /*if (!$scope.shiftId) {
                $scope.shift.shift_code = $window.Math.floor($window.Math.random() * 10000);

            }*/
      if ($scope.setempZone && !angular.isUndefined($scope.shift.zone) && !angular.isUndefined($scope.shift.zone.id) && $scope.shift.zone.id) {
        $scope.shift.empZone = {
          'text': $scope.shift.zone.text,
          'id': $scope.shift.zone.id
        };
      }
    };
    $scope.ShiftErrorClose = function () {
      $scope.showShiftError = false;
    };
    $scope.removeShifts = function () {
      $scope.deleteCode = '';
      if ($scope.shiftId && $scope.allshiftId === '') {
        $scope.deleteCode = { filter: 'id=' + $scope.shiftId + '' };
      } else if ($scope.shiftId && $scope.allshiftId) {
        $scope.deleteCode = { filter: 'shift_code=\'' + $scope.eventcode + '\' and agency_id = ' + Services.getAgencyID() };
      }
      if ($scope.deleteCode) {
        Services.setModelTempVar($scope.deleteCode);
        $scope.modalInstance = $modal.open({
          template: '<div class="modal-header"> <h3 class="modal-title">Delete</h3></div><div class="modal-body"><b> This will remove the selected schedule from the system. Please confirm by clicking Yes</b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">No</button><button class="btn btn-primary" ng-click="all()">Yes</button> </div>',
          controller: 'DeleteShiftCtrl'
        });
        $scope.modalInstance.result.then(function (id) {
          Services.shiftRecurService.delete($scope.deleteCode, function (remoteData) {
            $scope.ok();
          });
        }, function () {
        });
      }
    };
    $scope.hoursformat = function (time) {
      $scope.hours = Number(time.match(/^(\d+)/)[1]);
      $scope.minutes = Number(time.match(/:(\d+)/)[1]);
      $scope.AMPM = time.match(/\s(.*)$/)[1];
      if ($scope.AMPM == 'PM' && $scope.hours < 12) {
        $scope.hours = $scope.hours + 12;
      }
      if ($scope.AMPM == 'AM' && $scope.hours == 12) {
        $scope.hours = $scope.hours - 12;
      }
      $scope.sHours = $scope.hours.toString();
      $scope.sMinutes = $scope.minutes.toString();
      if ($scope.hours < 10) {
        $scope.sHours = '0' + $scope.sHours;
      }
      if ($scope.minutes < 10) {
        $scope.sMinutes = '0' + $scope.sMinutes;
      }
      $scope.fulltime = $scope.sHours + ':' + $scope.sMinutes;
      return $scope.fulltime;
    };
    $scope.Authorization();
  }
]).controller('recurrenceShiftCtrl', [
  '$scope',
  'Services',
  '$modalInstance',
  function ($scope, Services, $modalInstance) {
    var eventDetail = Services.getModelTempVar();
    Services.setModelTempVar('');
    var events;
    $scope.single = function () {
      events = [];
      events.push({
        single: 'yes',
        id: eventDetail.id,
        code: eventDetail.code
      });
      $modalInstance.close(events);
    };
    $scope.all = function () {
      events = [];
      events.push({
        single: 'no',
        id: eventDetail.id,
        code: eventDetail.code
      });
      $modalInstance.close(events);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]).controller('DeleteShiftCtrl', [
  '$scope',
  'Services',
  '$modalInstance',
  function ($scope, Services, $modalInstance) {
    var ShiftID = Services.getModelTempVar();
    Services.setModelTempVar('');
    $scope.all = function () {
      $modalInstance.close(ShiftID);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);