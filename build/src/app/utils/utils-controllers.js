/**
 * Created with PyCharm.
 * User: M. Raza Dar
 * Date: 8/29/14
 * Time: 12:16 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('app.utils', [
  'utils.directives',
  'utils.ct.directives',
  'utils.ct.filters',
  'utils.ct.services'
]).controller('DatepickerDemoCtrl', [
  '$scope',
  function ($scope) {
    $scope.today = function () {
      $scope.dt = new Date();
    };
    $scope.today();
    $scope.clear = function () {
      $scope.dt = null;
    };
    // Disable weekend selection
    $scope.disabled = function (date, mode) {
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    };
    $scope.toggleMin = function () {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };
    $scope.initDate = new Date('2016-15-20');
    $scope.formats = [
      'dd-MMMM-yyyy',
      'yyyy/MM/dd',
      'dd.MM.yyyy',
      'shortDate'
    ];
    $scope.format = $scope.formats[0];
  }
]).controller('ProgressDemoCtrl', [
  '$scope',
  function ($scope) {
    $scope.max = 200;
    $scope.random = function () {
      var value = Math.floor(Math.random() * 100 + 1);
      var type;
      if (value < 25) {
        type = 'success';
      } else if (value < 50) {
        type = 'info';
      } else if (value < 75) {
        type = 'warning';
      } else {
        type = 'danger';
      }
      $scope.showWarning = type === 'danger' || type === 'warning';
      $scope.dynamic = value;
      $scope.type = type;
    };
    $scope.random();
    $scope.randomStacked = function () {
      $scope.stacked = [];
      var types = [
          'success',
          'info',
          'warning',
          'danger'
        ];
      for (var i = 0, n = Math.floor(Math.random() * 4 + 1); i < n; i++) {
        var index = Math.floor(Math.random() * 4);
        $scope.stacked.push({
          value: Math.floor(Math.random() * 30 + 1),
          type: types[index]
        });
      }
    };
    $scope.randomStacked();
  }
]);  /*.controller('DropdownCtrl', ['$scope', function DropdownCtrl($scope) {
        $scope.is_open = false;
    }]).controller('RatingCtrl', ['$scope', function($scope){
        $scope.rate = 3;
        $scope.max = 5;
        $scope.isReadonly = false;

        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.ratingStates = [
            {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
            {stateOn: 'glyphicon-heart'},
            {stateOff: 'glyphicon-off'}
        ];
    }]).controller('PaginationDemoCtrl', ['$scope', function ($scope) {
        $scope.totalItems = 64;
        $scope.currentPage = 4;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentPage);
        };

        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
    } ]).controller('AlertDemoCtrl', ['$rootScope', '$scope', function AlertDemoCtrl($rootScope, $scope) {
        */
     /*$rootScope.app_alerts = [
         { type: 'danger', msg: 'Well done! You successfully read this important alert message.' },
         { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
         ];*/
     /*
        $scope.closeAlert = function(index) {
            $rootScope.app_alerts.splice(index, 1);
        };
        $scope.$watch("app_alerts", function(old_val, new_val){
            if(new_val.length !== old_val.length){
                setTimeout(function(){
                    $rootScope.app_alerts.splice(0, 1);
                    $scope.checkApply();
                }, 5000);
            }
        }, true);
    }]).controller('DatePickerCtrl', ['$scope', '$timeout', function DatePickerCtrl($scope, $timeout){
        $scope.bools={
            show_weeks : false,
            show_buttons : false
        };
        $scope.open = function() {
            $timeout(function() {
                $scope.opened = !$scope.opened ;
                if(!$scope.$$phase){
                    $scope.$apply();
                }
            });
        };
        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };
        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();
    }]).controller('TimePickerCtrl', ["$scope", function TimePickerCtrl($scope) {
        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.ismeridian = true;
        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };
    }]);*/