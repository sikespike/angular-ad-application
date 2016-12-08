angular = require("angular");
require("../services/campaignService");

var UiEvents = require("../model/UiEvents");

angular.module("angular-choco")
    .controller('DashboardOverlayController',
        function($scope, $interval, campaignService) {
            $scope.closeDashboard = function() {
                $scope.$rootScope.$emit(UiEvents.DASH_CLOSE);
            };

            $scope.dashTimer = null;

            $scope.startTimer = function (id,it) {
                $scope.dashTimer = $interval(function () {
                    campaignService.getCampaign(id, it).then(function(data){
                        $scope.campaign.addData(data);
                        it++;
                    });
                }, 5000);
            };

            //Timer stop function.
            $scope.stopTimer = function () {
                if (angular.isDefined($scope.dashTimer)) {
                    $interval.cancel($scope.dashTimer);
                    $scope.dashTimer = null;
                }
            };

            $scope.$watch('isDashShowing', function() {
                if(!$scope.isDashShowing) {
                    if($scope.dashTimer) {
                        $scope.stopTimer();
                    }
                }
            });
        }
    );