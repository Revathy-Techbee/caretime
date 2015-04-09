'use strict';

var app = angular.module('app');

app.controller('chartCtrl', function appCtrl($scope) {

    // data context
    $scope.ctx = {
        chart: null,
        pal: 0,
        palettes: ['standard', 'cocoa', 'coral', 'dark', 'highcontrast', 'light', 'midnight', 'minimal', 'modern', 'organic', 'slate' ],
        itemsSource: []
    };

    $scope.menuPaletteItemClicked = function (sender, args) {
        var menu = sender;
        $scope.ctx.chart.palette = wijmo.chart.Palettes[$scope.ctx.palettes[menu.selectedIndex]];
    }

    // populate itemsSource
    var names = ['Oranges', 'Apples', 'Pears', 'Bananas', 'Pineapples'],
        data = [];
    for (var i = 0; i < names.length; i++) {
        $scope.ctx.itemsSource.push({
            name: names[i],
            mar: Math.random() * 3,
            apr: Math.random() * 10,
            may: Math.random() * 5
        });
    }
});
