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

            var ctx = document.getElementById("dashboardChart");
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }
    );