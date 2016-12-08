angular = require("angular");

var UiEvents = require("../model/UiEvents");

angular.module("app")
    .controller('OptionListController',
        function($scope) {
            $scope.campaignItemClick = function(item) {
                $scope.$emit(UiEvents.DASH_OPEN, item);
            }
        });