//'use strict';
/* Directives */
// All the directives rely on jQuery.
angular.module('utils.ct.directives', ['ui.load']).directive('uiModule', [
  'MODULE_CONFIG',
  'uiLoad',
  '$compile',
  function (MODULE_CONFIG, uiLoad, $compile) {
    return {
      restrict: 'A',
      compile: function (el, attrs) {
        var contents = el.contents().clone();
        return function (scope, el, attrs) {
          el.contents().remove();
          uiLoad.load(MODULE_CONFIG[attrs.uiModule]).then(function () {
            $compile(contents)(scope, function (clonedElement, scope) {
              el.append(clonedElement);
            });
          });
        };
      }
    };
  }
]).directive('uiShift', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, el, attr) {
        // get the $prev or $parent of this el
        var _el = $(el), _window = $(window), prev = _el.prev(), parent, width = _window.width();
        ;
        //!prev.length && (parent = _el.parent());
        if (!prev.length) {
          parent = _el.parent();
        }
        function sm() {
          $timeout(function () {
            var method = attr.uiShift;
            var target = attr.target;
            ///_el.hasClass('in') || _el[method](target).addClass('in');
            if (_el.hasClass('in')) {
              _el[method](target).addClass('in');
            }
          });
        }
        function md() {
          /* parent && parent['prepend'](el);
                     !parent && _el['insertAfter'](prev);*/
          if (parent) {
            parent['prepend'](el);
          }
          if (!parent) {
            _el['insertAfter'](prev);
          }
          _el.removeClass('in');
        }
        //(width < 768 && sm()) || md();
        if (width < 768 && sm()) {
          md();
        }
        _window.resize(function () {
          if (width !== _window.width()) {
            $timeout(function () {
              if (_window.width() < 768 && sm()) {
                md();
              }
              //(_window.width() < 768 && sm()) || md();
              width = _window.width();
            });
          }
        });
      }
    };
  }
]).directive('uiToggleClass', [
  '$timeout',
  '$document',
  function ($timeout, $document) {
    return {
      restrict: 'AC',
      link: function (scope, el, attr) {
        el.on('click', function (e) {
          e.preventDefault();
          var classes = attr.uiToggleClass.split(','), targets = attr.target && attr.target.split(',') || new Array(el), key = 0;
          var magic = function (_class, target) {
            var patt = new RegExp('\\s' + _class.replace(/\*/g, '[A-Za-z0-9-_]+').split(' ').join('\\s|\\s') + '\\s', 'g');
            var cn = ' ' + $(target)[0].className + ' ';
            while (patt.test(cn)) {
              cn = cn.replace(patt, ' ');
            }
            $(target)[0].className = $.trim(cn);
          };
          angular.forEach(classes, function (_class) {
            var target = targets[targets.length && key];
            ///( _class.indexOf( '*' ) !== -1 ) && magic(_class, target);
            if (_class.indexOf('*') !== -1) {
              magic(_class, target);
            }
            $(target).toggleClass(_class);
            key++;
          });
          $(el).toggleClass('active');
        });
      }
    };
  }
]).directive('uiNav', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'AC',
      link: function (scope, el, attr) {
        var _window = $(window);
        var _mb = 768;
        // unfolded
        $(el).on('click', 'a', function (e) {
          var _this = $(this);
          _this.parent().siblings('.active').toggleClass('active');
          _this.parent().toggleClass('active');
          //_this.next().is('ul') && e.preventDefault();
          if (_this.next().is('ul')) {
            e.preventDefault();
          }
          //_this.next().is('ul') || ( ( _window.width() < _mb ) && $('.app-aside').toggleClass('show') );
          if (_this.next().is('ul')) {
            if (_window.width() < _mb) {
              $('.app-aside').toggleClass('show');
            }
          }
        });
        // folded
        var wrap = $('.app-aside'), next;
        $(el).on('mouseenter', 'a', function (e) {
          if (!$('.app-aside-fixed.app-aside-folded').length || _window.width() < _mb) {
            return;
          }
          var _this = $(this);
          //next && next.trigger('mouseleave.nav');
          if (next) {
            next.trigger('mouseleave.nav');
          }
          if (_this.next().is('ul')) {
            next = _this.next();
          } else {
            return;
          }
          next.appendTo(wrap).css('top', _this.offset().top - _this.height());
          next.on('mouseleave.nav', function (e) {
            next.appendTo(_this.parent());
            next.off('mouseleave.nav');
            _this.parent().removeClass('active');
          });
          _this.parent().addClass('active');
        });
        wrap.on('mouseleave', function (e) {
          //next && next.trigger('mouseleave.nav');
          if (next) {
            next.trigger('mouseleave.nav');
          }
        });
      }
    };
  }
]).directive('uiScroll', [
  '$location',
  '$anchorScroll',
  function ($location, $anchorScroll) {
    return {
      restrict: 'AC',
      link: function (scope, el, attr) {
        el.on('click', function (e) {
          $location.hash(attr.uiScroll);
          $anchorScroll();
        });
      }
    };
  }
]).directive('uiFullscreen', [
  'uiLoad',
  function (uiLoad) {
    return {
      restrict: 'AC',
      template: '<i class="fa fa-expand fa-fw text"></i><i class="fa fa-compress fa-fw text-active"></i>',
      link: function (scope, el, attr) {
        el.addClass('hide');
        uiLoad.load('js/libs/screenfull.min.js').then(function () {
          if (screenfull.enabled) {
            el.removeClass('hide');
          }
          el.on('click', function () {
            var target;
            //attr.target && ( target = $(attr.target)[0] );
            if (attr.target) {
              target = $(attr.target)[0];
            }
            el.toggleClass('active');
            screenfull.toggle(target);
          });
        });
      }
    };
  }
]).directive('uiButterbar', [
  '$rootScope',
  '$location',
  '$anchorScroll',
  function ($rootScope, $location, $anchorScroll) {
    return {
      restrict: 'AC',
      template: '<span class="bar"></span>',
      link: function (scope, el, attrs) {
        el.addClass('butterbar hide');
        scope.$on('$stateChangeStart', function (event) {
          $location.hash('app');
          $anchorScroll();
          el.removeClass('hide').addClass('active');
        });
        scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            el.addClass('hide').removeClass('active');
          });
        });
      }
    };
  }
]).directive('googleplace', [function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, model) {
        var options = {
            types: [],
            componentRestrictions: {}
          };
        scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
        google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
          scope.$apply(function () {
            model.$setViewValue(element.val());
          });
        });
      }
    };
  }]).directive('locationForm', [
  '$rootScope',
  'Services',
  '$timeout',
  function ($rootScope, Services, $timeout) {
    return {
      restrict: 'E',
      controller: function ($scope) {
        var placeSearch, autocomplete;
        var componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            postal_code: 'short_name'
          };
        function initialize() {
          //console.log('init');
          // Create the autocomplete object, restricting the search
          // to geographical location types.
          autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), { types: ['geocode'] });
          // When the user selects an address from the dropdown,
          // populate the address fields in the form.
          google.maps.event.addListener(autocomplete, 'place_changed', function () {
            fillInAddress();
            return false;  //$scope.apply();
          });
        }
        // [START region_fillform]
        function fillInAddress() {
          //console.log('fill');
          // Get the place details from the autocomplete object.
          var place = autocomplete.getPlace();
          // Get each component of the address from the place details
          // and fill the corresponding field on the form.
          var street_number = '';
          var street = '';
          var city = '';
          var state = '';
          var zip = '';
          for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (addressType === 'street_number') {
              street_number = place.address_components[i]['short_name'];
            }
            if (addressType === 'route') {
              street = place.address_components[i]['short_name'];
            }
            if (addressType === 'locality') {
              city = place.address_components[i]['short_name'];
            }
            if (addressType === 'administrative_area_level_1') {
              state = place.address_components[i]['short_name'];
            }
            if (addressType === 'postal_code') {
              zip = place.address_components[i]['short_name'];
            }
          }
          //jQuery("#autocomplete").val(street_number+" "+street);
          jQuery('#autocomplete').val(street_number + ' ' + street);
          jQuery('#zip').val(zip);
          jQuery('#city').val(city);
          jQuery('#state').val(state);  // $scope.address1 = street_number+" "+street;
                                        // $scope.zip      = zip;
                                        // $scope.city     = city;
                                        // $scope.state    = state;
        }
        // [END region_fillform]
        // [START region_geolocation]
        // Bias the autocomplete object to the user's geographical location,
        // as supplied by the browser's 'navigator.geolocation' object.
        $scope.geolocate = function () {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              var geolocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              autocomplete.setBounds(new google.maps.LatLngBounds(geolocation, geolocation));
            });
          }
        };
        initialize();
      },
      template: '<div class="form-horizontal"><div id="locationField" class="form-group"> <label class="col-sm-2 control-label">Address Line * </label> <div class="col-sm-10"><input id="autocomplete" class="form-control" placeholder="Enter Address line" ng-model="chosenPlace" googleplace type="text"></input> </div> </div>    <div id="address">     <div class="form-group">        <div class="control-label col-sm-2">Address Line 2</div> <div class="col-sm-5 slimField"><input class="form-control field" id="address2" placeholder="Address line 2 (optional)" ng-model="address2" disabled="true"></input></div>    <div class="col-sm-5 wideField"></div>  </div>    <div class="form-group">  <div class="col-sm-2 control-label">Zip/City/State *</div>  <div class="col-sm-3 slimField"><input class="form-control field" placeholder="Zip" id="zip" ng-model="zip"  disabled="true"></input></div> <div class="wideField col-sm-3"><input class="form-control field" id="city" ng-model="city"  placeholder="City"  disabled="true"></input></div> <div class="wideField col-sm-3"><input class="form-control field" placeholder="State" id="state" ng-model="state"  disabled="true"></input></div></div> </div></div>'
    };
  }
]).directive('multiField', [
  '$document',
  function ($document) {
    return function (scope, element, attr) {
      //scope.multifieldData = [{workphone: scope.employee.workphone}];
      scope.job.workphone = {};
      var config = {
          linkText: 'Add more',
          linkClass: 'addMoreFields',
          enableRemove: true,
          removeLinkText: 'Remove',
          removeLinkClass: 'removeFields',
          confirmOnRemove: true,
          confirmationMsgOnRemove: 'Are you sure you wish to remove selected field(s)?',
          beforeAddEventCallback: null,
          addEventCallback: null,
          removeEventCallback: null,
          maxItemsAllowedToAdd: null,
          maxItemReachedCallback: null,
          data: scope.job.workphone
        };
      //console.log(scope.multifieldData);
      var self = angular.element(element);
      self.attr('TotalFieldsAdded', '0');
      self.attr('maxCountReached', 'false');
      self.attr('FieldCount', '0');
      self.attr('uniqueId', config.linkClass + Math.random());
      self.find('.' + config.linkClass).remove();
      self.find('.' + config.removeLinkClass).remove();
      angular.element(element).append('<a href=\'javascript:void(0);\' class=\'' + config.linkClass + '\'>' + config.linkText + '</a>');
      angular.element(element).find('.' + config.linkClass).unbind('click').click(function () {
        return handleAdd($(this));
      });
      var myClone = angular.element(element).clone();
      if (config.data.length > 0) {
        var datacurElem = self;
        /*for (var i = 0; i < config.data.length; i++) {
                    datacurElem.find("input,select,textarea").each(function findItemName () {
                        var itemName = $(this).attr("recName");
                        $(this).val(config.data[i][itemName]);
                    });
                    datacurElem.find("." + config.linkClass).trigger("click");
                    datacurElem = datacurElem.next();
                }*/
        var findItemName = function () {
          var itemName = $(this).attr('recName');
          $(this).val(config.data[i][itemName]);
        };
        for (var i = 0; i < config.data.length; i++) {
          datacurElem.find('input,select,textarea').each(findItemName());
          datacurElem.find('.' + config.linkClass).trigger('click');
          datacurElem = datacurElem.next();
        }
      }
      function handleAdd(element) {
        var totalCount = parseInt(self.attr('TotalFieldsAdded'), 10);
        var fieldCount = parseInt(self.attr('FieldCount'), 10);
        var ngmodelCount = fieldCount + 1;
        if (config.maxItemsAllowedToAdd === null || totalCount < config.maxItemsAllowedToAdd) {
          var newElem = myClone.clone();
          var findElem = angular.element(newElem).find('*[id!=\'\'][name!=\'\']');
          angular.forEach(findElem, function (value, key) {
            var currentElem = angular.element(value);
            if (currentElem.attr('id')) {
              var strid = currentElem.attr('id');
              var strname = '';
              var strngmodel = '';
              if (currentElem.attr('name')) {
                strname = currentElem.attr('name');
              }
              if (currentElem.attr('ng-model')) {
                strngmodel = currentElem.attr('ng-model');
              }
              currentElem.attr('id', strid + '_' + fieldCount);
              currentElem.attr('name', strname + '$' + fieldCount);
              //currentElem.attr("ng-model", strname +"."+ fieldCount);
              currentElem.attr('ng-model', 'job.workphone[' + ngmodelCount + ']');
            }
          });
          totalCount++;
          fieldCount++;
          self.attr('TotalFieldsAdded', totalCount);
          self.attr('FieldCount', fieldCount);
          newElem.removeAttr('uniqueId');
          if (config.enableRemove && self.attr('uniqueId') != angular.element(element).parent().attr('uniqueId')) {
            if (angular.element(element).parent().find('.' + config.removeLinkClass).length === 0) {
              angular.element(element).parent().append(' <a href=\'#\' class=\'' + config.removeLinkClass + '\'>' + config.removeLinkText + '</a>');
            }
            angular.element(element).parent().find('.' + config.removeLinkClass).unbind('click').click(function () {
              return handleRemove($(this));
            });
          }
          newElem.attr('uniqueId', config.linkClass + Math.random());
          angular.element(element).parent().after(newElem);
          angular.element(element).parent().find('.' + config.linkClass).remove();
          newElem.find('.' + config.linkClass).remove();
          newElem.find('.' + config.removeLinkClass).remove();
          if (config.enableRemove) {
            if (newElem.find('.' + config.removeLinkClass).length === 0) {
              newElem.append(' <a href=\'#\' class=\'' + config.removeLinkClass + '\'>' + config.removeLinkText + '</a>');
            }
            newElem.find('.' + config.removeLinkClass).unbind('click').click(function () {
              return handleRemove($(this));
            });
          }
          self.attr('maxCountReached', 'false');
          newElem.append(' <a href=\'#\' class=\'' + config.linkClass + '\'>' + config.linkText + '</a>');
          newElem.find('.' + config.linkClass).unbind('click').click(function () {
            return handleAdd($(this));
          });
        }
        return false;
      }
      function handleRemove(element) {
        var cnt = true;
        if (config.confirmOnRemove) {
          cnt = confirm(config.confirmationMsgOnRemove);
        }
        if (cnt) {
          var prevParent = angular.element(element).parent().prev();
          var totalCount = parseInt(self.attr('TotalFieldsAdded'), 10);
          totalCount--;
          self.attr('TotalFieldsAdded', totalCount);
          if (angular.element(element).parent().find('.' + config.linkClass).length > 0) {
            if (config.enableRemove && self.attr('uniqueId') != prevParent.attr('uniqueId')) {
              if (prevParent.find('.' + config.removeLinkClass).length === 0) {
                prevParent.append(' <a href=\'#\' class=\'' + config.removeLinkClass + '\'>' + config.removeLinkText + '</a>');
              }
              prevParent.find('.' + config.removeLinkClass).unbind('click').click(function () {
                return handleRemove($(this));
              });
            }
            prevParent.append(' <a href=\'#\' class=\'' + config.linkClass + '\'>' + config.linkText + '</a>');
            prevParent.find('.' + config.linkClass).unbind('click').click(function () {
              return handleAdd($(this));
            });
          }
          if (config.maxItemsAllowedToAdd !== null && totalCount < config.maxItemsAllowedToAdd) {
            self.siblings().find('.' + config.linkClass).show();
          }
          angular.element(element).parent().remove();
          if (config.removeEventCallback !== null) {
            config.removeEventCallback(prevParent, self);
          }
        }
        return false;
      }
    };
  }
]).directive('newUploader', [function ($rootScope) {
    'use strict';
    var uniqueId = 0;
    var upduniqueId = 0;
    return {
      restrict: 'A',
      replace: true,
      transclude: true,
      controller: 'newUploaderCtl',
      link: function (scope, element, attrs, ctrl) {
        element.find('.uploadHolder').attr('rel', uniqueId);
        var item = 'UPDitem' + uniqueId++;
        var updPath = 'certificates_' + upduniqueId++;
        element.find('.uploadAnchor').attr('rel', item);
        element.find('.uploadHolder').attr('uploadpath', updPath);
        element.attr('uploadpath', updPath);
      },
      templateUrl: 'ct-app/employees/upload-skeleton.tpl.html'
    };
  }]).controller('newUploaderCtl', [
  '$scope',
  '$rootScope',
  'Services',
  '$state',
  'HelperService',
  '$modal',
  '$timeout',
  '$element',
  '$attrs',
  function ($scope, $rootScope, Services, $state, HelperService, $modal, $timeout, $element, $attrs) {
    $timeout(function () {
      //var uploadPathPartial = '/files/applications/testing/';
      var getuploadpath = $element.attr('uploadpath');
      if (!angular.isDefined(getuploadpath)) {
        getuploadpath = 'unknown';
      }
      $scope.uploadPathFinal = $rootScope.uploadListingPath + getuploadpath + '/';
      $scope.frameTarget = $attrs.uploadtarget;
      $scope.fileInpName = $attrs.fileinpname;
    });
  }
]).directive('newframeOnload', [function ($rootScope) {
    return {
      scope: { callBack: '&newframeOnload' },
      link: function (scope, element, attrs) {
        element.on('load', function () {
          return scope.callBack();
        });
      }
    };
  }]).directive('customOnChange', [function ($rootScope) {
    'use strict';
    return {
      restrict: 'A',
      scope: {},
      link: function (scope, element, attrs) {
        var onChangeFunc = element.scope()[attrs.customOnChange];
        element.bind('change', onChangeFunc);
      }
    };
  }]).directive('mydateDirective', [function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelController) {
        ngModelController.$parsers.push(function (data) {
          //convert data from view format to model format
          return data;  //converted
        });
        ngModelController.$formatters.push(function (data) {
          //convert data from model format to view format
          return data;  //converted
        });
      }
    };
  }]).directive('capitalize', [function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        /* Edited by Lavanya 12/6/2014*/
        var el = element[0];
        function clean(x) {
          return x && x.toUpperCase();
        }
        modelCtrl.$parsers.push(function (val) {
          var cleaned = clean(val);
          // Avoid infinite loop of $setViewValue <-> $parsers
          if (cleaned === val) {
            return val;
          }
          var start = el.selectionStart;
          var end = el.selectionEnd + cleaned.length - val.length;
          // element.val(cleaned) does not behave with
          // repeated invalid elements
          modelCtrl.$setViewValue(cleaned);
          modelCtrl.$render();
          el.setSelectionRange(start, end);
          return cleaned;
        });  /*var capitalize = function (inputValue) {
                if (angular.isUndefined(inputValue))
                return;

                var capitalized = inputValue.toUpperCase();
                if (capitalized !== inputValue) {
                modelCtrl.$setViewValue(capitalized);
                modelCtrl.$render();

                }
                return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]); // capitalize initial value*/
      }
    };
  }]).directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            // console.info(elem.val() === $(firstPassword).val());
            ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
          });
        });
      }
    };
  }]);