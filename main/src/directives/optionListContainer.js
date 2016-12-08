angular = require('angular');
require("../controllers/optionListController");

angular.module('angular-choco')
    .directive('optionListContainer', function() {
        'use strict';

        return {
            restrict: "E",
            transclude: true,
            scope: {
                list: "=list"
            },
            templateUrl: "/partial/directives/option-list-container.html",
            controller:"OptionListController"
        };
    });
