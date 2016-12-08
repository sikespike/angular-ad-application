angular = require('angular');
require("../controllers/dashboardOverlayController");

angular.module('angular-choco')
    .directive('dashboardOverlay', function() {
        'use strict';

        return {
            restrict: "E",
            transclude: true,
            scope: false,
            templateUrl: "/partial/directives/dashboard-overlay.html",
            controller:"DashboardOverlayController"
        };
    });