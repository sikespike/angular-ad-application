angular = require("angular");
require("../services/campaignService");
var Chart = require("chart.js");

var UiEvents = require("../model/UiEvents");

angular.module("app")
    .controller('DashboardOverlayController',
        function($scope, $interval, campaignService) {
            $scope.closeDashboard = function() {
                $scope.$rootScope.$emit(UiEvents.DASH_CLOSE);
            };

            var ctx = document.getElementById("dashboardChart");
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Impressions',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });

            var updateChart = function() {
                myChart.data.datasets.data.push($scope.campaign.mostRecentRecord.totalImpressions);
            };

            $scope.dashTimer = null;

            $scope.startTimer = function (id,it) {
                $scope.dashTimer = $interval(function () {
                    campaignService.getCampaign(id, it).then(function(data){
                        if($scope.campaign.impressions != data.impressions) {
                            $scope.campaign.addData(data);

                        }
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