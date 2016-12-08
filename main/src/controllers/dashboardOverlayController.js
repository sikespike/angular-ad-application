angular = require("angular");

var UiEvents = require("../model/UiEvents");

angular.module("angular-choco")
    .controller('DashboardOverlayController',
        function($scope) {
            $scope.closeCart = function() {
                $scope.$rootScope.$emit(UiEvents.DASH_CLOSE);
            };
        }
    );