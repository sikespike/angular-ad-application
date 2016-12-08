angular = require('angular');
require("../controllers/dashboardOverlayController");

angular.module('app')
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