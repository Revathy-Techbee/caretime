﻿(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('appCtrl', function ($scope) {

        // a collection of property values for the Wijmo Gauges
        $scope.props = {
            autoScale: true,
            direction: 'Right',
            format: 'p0',
            isReadOnly: false,
            max: 1,
            min: 0,
            showRanges: true,
            showText: 'All',
            step: 0.25,
            startAngle: 0,
            sweepAngle: 180,
            ranges: {
                pointerThickness: 0.5,
                target: .75,
                lower: {
                    min: 0,
                    max: .33,
                    color: 'rgba(255,100,100,.1)'
                },
                middle: {
                    min: .33,
                    max: .66,
                    color: 'rgba(255,255,100,.1)'
                },
                upper: {
                    min: .66,
                    max: 1,
                    color: 'rgba(100,255,100,.1)'
                }
            },
            value: 0.5
        };

        // "showRanges" change event handler
        $scope.showRangesChanged = function () {
            // get the value of "showRanges" from $scope
            var showRanges = $scope.props.showRanges;

            // update the percentile.ranges object based on "$scope.props.showRanges"
            $scope.props.ranges.lower.color = showRanges ? 'rgba(255,100,100,.1)' : 'red';
            $scope.props.ranges.middle.color = showRanges ? 'rgba(255,255,100,.1)' : 'yellow';
            $scope.props.ranges.upper.color = showRanges ? 'rgba(100,255,100,.1)' : 'green';
            $scope.props.ranges.pointerThickness = showRanges ? 0.5 : 1;
        };
    });
})();