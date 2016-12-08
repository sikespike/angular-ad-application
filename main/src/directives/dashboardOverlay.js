angular = require('angular');
require("../controllers/dashboardOverlayController");

angular.module('angular-choco')
    .directive('dashboard-Overlay', function() {
        'use strict';

        return {
            restrict: "E",
            transclude: true,
            scope: {
                data: "=data"
            },
            templateUrl: "/partial/directives/dashboard-overlay.html",
            controller:"DashboardOverlayController"
        };
    });