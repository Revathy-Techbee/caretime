//'use strict';
/* Filters */
// need load the moment.js to use this filter. 
angular.module('utils.ct.filters', []).filter('fromNow', function () {
  return function (date) {
    return moment(date).fromNow();
  };
}).filter('parseToJson', [
  '$sce',
  function ($sce) {
    return function (data, fieldToShow, ifMe) {
      var temp = null, tempar = null;
      if (data) {
        if (ifMe === 'preferCommunication') {
          temp = JSON.parse(data);
          var returnStr = '';
          if (temp) {
            if (temp.isVoice) {
              returnStr += ' <br> Voice call enabled to ' + temp.voice.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            }
            if (temp.isText) {
              returnStr += '  <br> Texting enabled to ' + temp.text.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            }
            if (temp.isEmail) {
              returnStr += ' <br> Email enabled to ' + temp.email;
            }
          }
          return $sce.trustAsHtml(returnStr);
        } else if (ifMe === 'externalCode') {
          temp = JSON.parse(data);
          tempar = '';
          angular.forEach(temp, function (value, key) {
            tempar += key + ' = ' + value + ' <br>';
          });
          return tempar;
        } else if (ifMe === 'language') {
          temp = JSON.parse(data);
          tempar = '';
          angular.forEach(temp, function (value, key) {
            tempar += key + ' = ' + value + ' <br>';
          });
          return temp.join(',');
        } else if (ifMe === 'zone' || ifMe === 'text') {
          if (data) {
            temp = JSON.parse(data);
            tempar = temp.text + ' (' + temp.id + ')';
            /* angular.forEach(temp, function(value, key) {
                     tempar += value.text + " ( "+ value.id+" )<br>";
                     })*/
            return tempar;  //temp.join(",");
          }
        }
        if (fieldToShow) {
          temp = JSON.parse(data);
          return temp[fieldToShow];
        } else {
          temp = JSON.parse(data);
          tempar = '';
          //console.log(temp.text);
          angular.forEach(temp, function (value, key) {
            tempar += key + ' = ' + value + ' ';
          });
          // return tempar.join();
          //console.log(tempar);
          return tempar;
        }
      } else {
        return data;
      }
    };
  }
]).filter('checkstatus', [
  '$sce',
  function ($sce) {
    return function (data, fieldToShow) {
      if (data == '1') {
        return $sce.trustAsHtml('<span class="label bg-success">Active</span>');
      } else if (data == '2') {
        return $sce.trustAsHtml('<span class="label bg-danger">Terminated</span>');
      } else {
        return $sce.trustAsHtml('<span class="label bg-info">Inactive</span>');
      }
    };
  }
]).filter('checkAgencystatus', [
  '$sce',
  function ($sce) {
    return function (data, fieldToShow) {
      if (data == '1') {
        return $sce.trustAsHtml('<span class="label bg-success">Active</span>');
      } else if (data == '2') {
        return $sce.trustAsHtml('<span class="label bg-danger">Trial</span>');
      } else {
        return $sce.trustAsHtml('<span class="label bg-info">Inactive</span>');
      }
    };
  }
]).filter('checkStatStatus', [
  '$sce',
  function ($sce) {
    return function (data, fieldToShow) {
      if (data == '1') {
        return $sce.trustAsHtml('<i class="fa fa-circle text-success pull-right text-xs m-t-sm"> Active</i>');
      } else if (data == '2') {
        return $sce.trustAsHtml('<i class="fa fa-circle text-danger pull-right text-xs m-t-sm"> Terminated</i>');
      } else {
        return $sce.trustAsHtml('<i class="fa fa-circle text-info pull-right text-xs m-t-sm"> Inactive</i>');
      }
    };
  }
]).filter('datecustomeFormat', function () {
  return function (data) {
    return data;  /*if(data && angular.isUndefined(date.split())){
                //console.log(data);
                var temp = data.split("-");
                return  temp[1]+"-"+temp[2].split(" ")[0]+'-'+temp[0]+" "+temp[2].split(" ")[1];
            }else{
                return "Not yet edited";
            }*/
  };
}).filter('MMDDYYYY', function () {
  return function (data, country) {
    if (data) {
      var moment_data = moment.tz(data, 'UTC').format();
      // set incoming time zone as UTC
      if (country && country != 'United States') {
        return moment(moment_data).format('DD/MM/YYYY hh:mm a');
      } else {
        return moment(moment_data).format('MM/DD/YYYY hh:mm a');
      }
    } else {
      return 'Not yet edited';
    }
  };
}).filter('splithoursMinutes', function () {
  return function (data) {
    if (data) {
      var hoursMinutes = data.split(/[.:]/);
      if (hoursMinutes[0] !== 0 && hoursMinutes[1] !== 0) {
        return '(' + hoursMinutes[0] + 'h ' + hoursMinutes[1] + 'm)';
      } else if (hoursMinutes[0] !== 0) {
        return '(' + hoursMinutes[0] + 'h)';
      } else if (hoursMinutes[1] !== 0) {
        return '(' + hoursMinutes[1] + 'm)';
      } else {
        return '(0h 0m)';
      }
    } else {
      return '(0h 0m)';
    }
  };
}).filter('floatToTimewithformat', function () {
  return function (data) {
    if (data) {
      var total = parseFloat(Math.round(data * 100) / 100).toFixed(2);
      var num = total * 60;
      var quotient = num / 60;
      var hours = Math.floor(quotient);
      var minutes = Math.floor(num % 60);
      if (hours !== 0 && minutes !== 0) {
        return '(' + hours + 'h ' + minutes + 'm)';
      } else if (hours !== 0) {
        return '(' + hours + 'h)';
      } else if (minutes !== 0) {
        return '(' + minutes + 'm)';
      } else {
        return '(0h 0m)';
      }
    } else {
      return '(0h 0m)';
    }
  };
}).filter('visitonly', [
  '$sce',
  function ($sce) {
    return function (data, fieldToShow) {
      if (data === '"1"') {
        return $sce.trustAsHtml('Yes');
      } else {
        return $sce.trustAsHtml('No');
      }
    };
  }
]).filter('checklevel', [
  '$sce',
  function ($sce) {
    return function (data, fieldToShow) {
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
      return $sce.trustAsHtml(arr[data]);
    };
  }
]).filter('phoneFormat', [
  '$sce',
  function ($sce) {
    return function (data, fieldToShow) {
      if (data) {
        var num = data.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        return num;
      }
    };
  }
]).filter('job_phone_list', [
  '$sce',
  function ($sce) {
    return function (data, fieldToShow) {
      if (data) {
        var res = $sce.trustAsHtml('<br>');
        var mySplitResult = data.replace(/, /g, res);
        return mySplitResult;
      }
    };
  }
]).filter('payclass', [
  '$sce',
  function ($sce) {
    return function (data, fieldToShow) {
      if (data === 'null') {
        return '';
      } else {
        try {
          var temp = JSON.parse(data);
          return temp.text;
        } catch (e) {
          return data;
        }
      }
    };
  }
]).filter('logtype', [
  '$sce',
  function ($sce) {
    return function (data, fieldToShow) {
      var temp = null;
      if (data === 1) {
        temp = $sce.trustAsHtml('Clock-In');
      } else {
        temp = $sce.trustAsHtml('Clock-Out');
      }
      return temp;
    };
  }
]).filter('billable_hrs', [
  '$sce',
  function ($sce) {
    return function (data, fieldToShow) {
      var temp = null;
      if (data === 1) {
        temp = $sce.trustAsHtml('Yes');
      } else {
        temp = $sce.trustAsHtml('No');
      }
      return temp;
    };
  }
]).filter('duration_in_decimal', [
  '$sce',
  function ($sce) {
    return function (data, fieldToShow) {
      var temp = null;
      if (data) {
        temp = parseFloat(Math.round(data * 100) / 100).toFixed(2);
      }
      return temp;
    };
  }
]).filter('removeJSONName', function () {
  return function (data) {
    if (data) {
      // var response=jQuery.parseJSON(data);
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
  };
}).filter('yesOrNo', [
  '$sce',
  function ($sce) {
    return function (data) {
      var temp = '';
      if (data == 1) {
        temp = $sce.trustAsHtml('YES');
      } else {
        temp = $sce.trustAsHtml('NO');
      }
      return temp;
    };
  }
]).filter('prompt_details', function () {
  return function (data) {
    if (data) {
      var temp = JSON.parse(data);
      var value = '';
      angular.forEach(temp, function (item) {
        if (!angular.isUndefined(item.prompt) && item.prompt) {
          value += item.prompt.text + ',';
        }
      });
      if (value) {
        return value.substring(0, value.length - 1);
      } else {
        return '-';
      }
    } else {
      return '-';
    }
  };
}).filter('onlydate', function () {
  return function (data) {
    if (data) {
      return moment(data).format('YYYY-MM-DD');
    } else {
      return '-';
    }
  };
}).filter('onlydateMMDDYYYY', function () {
  return function (data, country) {
    if (data, country) {
      if (country && country != 'United States') {
        return moment(data).format('DD-MM-YYYY');
      } else {
        //console.log("in");
        return moment(data).format('MM-DD-YYYY');
      }
    } else {
      return '-';
    }
  };
}).filter('removeJSONCreateName', function () {
  return function (data) {
    if (data) {
      // var response=jQuery.parseJSON(data);
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
  };
}).filter('datewithtimeformat', function () {
  return function (data, country) {
    if (data) {
      data = moment.tz(data, 'UTC').format();
      // set incoming time zone as UTC
      if (country && country != 'United States') {
        return moment(data).format('DD/MM/YYYY hh:mm a');
      } else {
        return moment(data).format('MM/DD/YYYY hh:mm a');
      }
    } else {
      return '-';
    }
  };
}).filter('SecPhoneParseToJson', [
  '$sce',
  function ($sce) {
    return function (data, fieldToShow, ifMe) {
      if (data) {
        var temp = JSON.parse(data);
        var tempar = '';
        angular.forEach(temp, function (value, key) {
          tempar += key + ' = ' + value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') + ' <br>';
        });
        return $sce.trustAsHtml(tempar);
      } else {
        return '';
      }
    };
  }
]).filter('iconColor', [
  '$sce',
  function ($sce) {
    return function (date) {
      if (date) {
        dateAndTime = moment.tz(date, 'UTC').format();
        sdate = moment(dateAndTime).format('MM/DD/YYYY');
        edate = moment().format('MM/DD/YYYY');
        a = moment(sdate);
        b = moment(edate);
        duration = b.diff(a, 'days', true);
        if (duration < 29) {
          return $sce.trustAsHtml(' <i class="fa fa-clock-o text-success"></i>');
        } else {
          return $sce.trustAsHtml('<i class="fa fa-clock-o text-danger"></i>');
        }
      } else {
        return $sce.trustAsHtml('<i class="fa fa-clock-o text-default"></i>');
      }
    };
  }
]).filter('calenderIconColor', [
  '$sce',
  function ($sce) {
    return function (date) {
      if (date) {
        dateAndTime = moment.tz(date, 'UTC').format();
        sdate = moment(dateAndTime).format('MM/DD/YYYY');
        edate = moment().format('MM/DD/YYYY');
        a = moment(sdate);
        b = moment(edate);
        duration = b.diff(a, 'days', true);
        if (duration < 29) {
          return $sce.trustAsHtml(' <i class="fa fa-calendar text-success"></i>');
        } else {
          return $sce.trustAsHtml('<i class="fa fa-calendar text-danger"></i>');
        }
      } else {
        return $sce.trustAsHtml('<i class="fa fa-calendar text-default"></i>');
      }
    };
  }
]).filter('generateAgencyCode', function () {
  return function (data) {
    if (data) {
      return '1' + ('000' + data).slice(-4);
    }
  };
}).filter('AddEditUser', function () {
  return function (data) {
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
  };
});