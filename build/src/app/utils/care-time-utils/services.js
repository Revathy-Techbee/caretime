/**
 * Created by Raza on 11/15/2014.
 */
angular.module('utils.ct.services', []).factory('HelperService', [function () {
    return {
      arr: {
        multisort: function (arr, columns, order_by) {
          if (typeof columns === 'undefined') {
            columns = [];
            for (x = 0; x < arr[0].length; x++) {
              columns.push(x);
            }
          }
          if (typeof order_by === 'undefined') {
            order_by = [];
            for (x = 0; x < arr[0].length; x++) {
              order_by.push('ASC');
            }
          }
          function multisort_recursive(a, b, columns, order_by, index) {
            var direction = order_by[index] === 'DESC' ? 1 : 0;
            var is_numeric = !isNaN(+a[columns[index]] - +b[columns[index]]);
            var x = is_numeric ? +a[columns[index]] : a[columns[index]].toLowerCase();
            var y = is_numeric ? +b[columns[index]] : b[columns[index]].toLowerCase();
            if (x < y) {
              return direction === 0 ? -1 : 1;
            }
            if (x == y) {
              return columns.length - 1 > index ? multisort_recursive(a, b, columns, order_by, index + 1) : 0;
            }
            return direction === 0 ? 1 : -1;
          }
          return arr.sort(function (a, b) {
            return multisort_recursive(a, b, columns, order_by, 0);
          });
        }
      },
      getAsArray: function getAsArray(inputArray, fieldToSend) {
        var temp = [];
        for (var i = 0; i < inputArray.length; i++) {
          if (typeof inputArray[i][fieldToSend] !== 'undefined' && inputArray[i][fieldToSend]) {
            temp.push(inputArray[i][fieldToSend]);
          }
        }
        return temp.join(',');
      },
      getAsSum: function getAsSum(inputArray, fieldToSend) {
        var resultarray = [];
        for (var i = 0; i < inputArray.length; i++) {
          if (!angular.isUndefined(resultarray[inputArray[i][fieldToSend] + '_nonrounded'])) {
            resultarray[inputArray[i][fieldToSend] + '_nonrounded'] = resultarray[inputArray[i][fieldToSend] + '_nonrounded'] + inputArray[i].work_duration_non_rounded_number;
            resultarray[inputArray[i][fieldToSend] + '_rounded'] = resultarray[inputArray[i][fieldToSend] + '_rounded'] + inputArray[i].work_duration_rounded_number;
          } else {
            resultarray[inputArray[i][fieldToSend] + '_nonrounded'] = inputArray[i].work_duration_non_rounded_number;
            resultarray[inputArray[i][fieldToSend] + '_rounded'] = inputArray[i].work_duration_rounded_number;
          }
        }
        return resultarray;
      },
      checkuserState: function checkuserState(nameList, thestate) {
        var temp;
        for (var i = 0; i < nameList.length; i++) {
          if (nameList[i] === thestate) {
            temp = 1;
            break;
          } else {
            temp = 0;
          }
        }
        return temp;
      },
      pad: function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
      },
      timeToFloat: function timeToFloat(time) {
        if (time) {
          // console.log(time); 
          var hoursMinutes = time.split(/[.:]/);
          var hours = parseInt(hoursMinutes[0], 10);
          var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
          return parseFloat(hours + minutes / 60).toFixed(2);
        } else {
          return '';
        }
      },
      floatToTime: function floatToTime(duration) {
        var total = parseFloat(Math.round(duration * 100) / 100).toFixed(2);
        var num = total * 60;
        var quotient = num / 60;
        var hours = Math.floor(quotient);
        var minutes = Math.floor(num % 60);
        return hours + ':' + minutes;
      },
      formating_hours: function formating_hours(data) {
        if (data) {
          var hoursMinutes = data.split(/[.:]/);
          if (hoursMinutes[0] != '0' && hoursMinutes[1] != '0') {
            return '(' + hoursMinutes[0] + 'h ' + hoursMinutes[1] + 'm)';
          } else if (hoursMinutes[0] != '0') {
            return '(' + hoursMinutes[0] + 'h)';
          } else if (hoursMinutes[1] != '0') {
            return '(' + hoursMinutes[1] + 'm)';
          } else {
            return '(0h 0m)';
          }
        } else {
          return '(0h 0m)';
        }
      },
      convertUTCtoMytimeZone: function convertUTCtoMytimeZone(dateAndTime) {
        if (dateAndTime) {
          return moment(dateAndTime).format('MMM DD, YYYY hh:mm A');
        } else {
          return '';
        }
      },
      logType: function logType(val) {
        if (val == 1) {
          return 'Clock In';
        } else if (val == 2) {
          return 'Clock Out';
        } else {
          return '-';
        }
      },
      formatingDate: function formatingDate(dateAndTime, country) {
        if (dateAndTime) {
          dateAndTime = moment.tz(dateAndTime, 'UTC').format();
          if (country && country != 'United States') {
            return moment(dateAndTime).format('DD/MM/YYYY hh:mm a');
          } else {
            return moment(dateAndTime).format('MM/DD/YYYY hh:mm a');
          }
        } else {
          return 'Not yet edited';
        }
      },
      removeJSONName: function removeJSONName(data) {
        if (data) {
          try {
            var temp = JSON.parse(data);
            var tempar = temp.name + ' (' + temp.id + ')';
            return tempar;  //temp.join(",");
          } catch (e) {
            return data;
          }
        } else {
          return '-';
        }
      },
      errorMsg: function errorMsg(msgclass, msgdata) {
        if (msgclass && msgdata) {
          return '<div class="alert ' + msgclass + '">' + msgdata + '</div>';
        } else {
          return '';
        }
      },
      phoneFormat: function phoneFormat(data, country) {
        if (data) {
          if (country && country != 'United States') {
            return data;
          } else {
            var num = data.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            return num;
          }
        } else {
          return '';
        }
      },
      getAnswer: function getAnswer(answer, ansData) {
        if (answer, ansData) {
          ansData = ansData.replace(/(^")|("$)/g, '');
          var ansDataArr = ansData.split(',');
          return ansDataArr[answer - 1];
        } else {
          return '-';
        }
      },
      formatOnlyDate: function formatOnlyDate(date, country) {
        if (date) {
          if (country && country != 'United States') {
            return moment(date).format('DD/MM/YYYY');
          } else {
            return moment(date).format('MM/DD/YYYY');
          }
        } else {
          return 'Invalid';
        }
      },
      formatOnlyTime: function formatOnlyTime(dateAndTime) {
        if (dateAndTime) {
          dateAndTime = moment.tz(dateAndTime, 'UTC').format();
          return moment(dateAndTime).format('hh:mm a');
        } else {
          return '00:00';
        }
      },
      formatUTCOnlyDate: function formatUTCOnlyDate(dateAndTime, country) {
        if (dateAndTime) {
          dateAndTime = moment.tz(dateAndTime, 'UTC').format();
          if (country && country != 'United States') {
            return moment(dateAndTime).format('DD/MM/YYYY');
          } else {
            return moment(dateAndTime).format('MM/DD/YYYY');
          }
        } else {
          return 'Invalid';
        }
      },
      regularHours: function regularHours(data_hours) {
        var regular_hrs = 0;
        if (data_hours) {
          regular_hrs = data_hours;
          if (data_hours > 40) {
            regular_hrs = 40;
          }
        }
        return parseFloat(regular_hrs).toFixed(2);
      },
      overHours: function overHours(data_hours) {
        var over_hrs = 0;
        if (data_hours && data_hours > 40) {
          over_hrs = data_hours - 40;
        }
        return parseFloat(over_hrs).toFixed(2);
      },
      checkstatus: function checkstatus(data) {
        if (data == '1') {
          return 'Active';
        } else if (data == '2') {
          return 'Terminated';
        } else {
          return 'Inactive';
        }
      },
      totalAuthorizedHours: function totalAuthorizedHours(frequency, startdate, enddate, hours) {
        var dur = 0;
        var sdate, edate, a, b, duration, no_week, no_days;
        if (frequency == 'Total') {
          dur = hours;
        } else if (frequency == 'Daily') {
          sdate = moment(startdate).format('MM/DD/YYYY');
          edate = moment(enddate).format('MM/DD/YYYY');
          a = moment(sdate);
          b = moment(edate);
          duration = b.diff(a, 'days', true) + 1;
          dur = parseFloat(parseInt(hours) * parseInt(duration)).toFixed(2);
        } else if (frequency == 'Weekly') {
          sdate = moment(startdate).format('MM/DD/YYYY');
          edate = moment(enddate).format('MM/DD/YYYY');
          a = moment(sdate);
          b = moment(edate);
          duration = b.diff(a, 'days', true) + 1;
          no_week = duration / 7;
          no_days = duration % 7;
          if (no_week !== 0 && no_days !== 0) {
            dur = parseFloat(hours * Math.floor(no_week, -1) + hours / 7 * no_days).toFixed(2);
          } else if (no_week !== 0) {
            dur = parseFloat(hours * Math.floor(no_week, -1)).toFixed(2);
          }
        } else if (frequency == 'Monthly') {
          sdate = moment(startdate).format('MM/DD/YYYY');
          edate = moment(enddate).format('MM/DD/YYYY');
          a = moment(sdate);
          b = moment(edate);
          duration = b.diff(a, 'days', true) + 1;
          no_week = duration / 30;
          no_days = duration % 30;
          if (no_week !== 0 && no_days !== 0) {
            dur = parseFloat(hours * Math.floor(no_week, -1) + hours / 30 * no_days).toFixed(2);
          } else if (no_week !== 0) {
            dur = parseFloat(hours * Math.floor(no_week, -1)).toFixed(2);
          }
        }
        return Math.round(dur);
      },
      fullDateFormat: function fullDateFormat(dateAndTime) {
        if (dateAndTime) {
          dateAndTime = moment.tz(dateAndTime, 'UTC').format();
          return moment(dateAndTime).format('DD, MMMM YYYY');
        } else {
          return 'Invalid';
        }
      },
      converttimeZone: function converttimeZone(dateAndTime) {
        if (dateAndTime) {
          dateAndTime = moment.tz(dateAndTime, 'UTC').format();
          return moment(dateAndTime).format('MMM DD, YYYY hh:mm A');
        } else {
          return '';
        }
      },
      getMintus: function getMintus(duration) {
        if (duration) {
          var total = parseFloat(Math.round(duration * 100) / 100).toFixed(2);
          var num = total * 60;
          var quotient = num / 60;
          var hours = Math.floor(quotient) * 60;
          var minutes = Math.floor(num % 60);
          return hours + minutes;
        }
      },
      getOnlyHour: function getOnlyHour(dateAndTime) {
        if (dateAndTime) {
          dateAndTime = moment.tz(dateAndTime, 'UTC').format();
          return moment(dateAndTime).format('H');
        } else {
          return '';
        }
      },
      getCode_Name: function getCode_Name(inputArray, codefield, namefield) {
        var temp = {};
        var arr_code = [];
        var arr_code_name = [];
        for (var i = 0; i < inputArray.length; i++) {
          if (typeof inputArray[i][codefield] !== 'undefined' && inputArray[i][codefield]) {
            arr_code.push(inputArray[i][codefield]);
            temp_codeName = inputArray[i][namefield] + ' (' + inputArray[i][codefield] + ')';
            arr_code_name.push(temp_codeName);
          }
        }
        temp_code = arr_code.join(',');
        temp_codeName = arr_code_name.join(',');
        temp = {
          'Code': temp_code,
          'Code_Name': temp_codeName
        };
        return temp;
      },
      checklevel: function checklevel(data) {
        var arr = [
            'Nursing',
            'Admin',
            'HR',
            'Office Clerical',
            'Office Manager',
            'On Call',
            'Corporate Billing Department',
            'Scheduler',
            'Basic'
          ];
        return arr[data];
      },
      AddEditUser: function AddEditUser(data) {
        if (data) {
          try {
            var temp = JSON.parse(data);
            var tempar = '-';
            if (temp.lastname) {
              tempar = temp.lastname + ', ' + temp.firstname + ' (' + temp.username + ')';
            } else if (temp.firstname) {
              tempar = temp.firstname + ' (' + temp.username + ')';
            }
            return tempar;
          } catch (e) {
            return data;
          }
        } else {
          return '-';
        }
      },
      addslashes: function addslashes(data) {
        if (data) {
          data = data.replace(/'/g, '\\\'');
          return data;
        } else {
          return '';
        }
      },
      stripslashes: function stripslashes(data) {
        if (data) {
          data = data.replace(/\\'/g, '\'');
          return data;
        } else {
          return '';
        }
      }
    };
  }]);