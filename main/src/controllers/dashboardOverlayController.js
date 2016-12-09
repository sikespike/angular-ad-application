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

            $scope.chartData = [];
            var ctx = document.getElementById("dashboardChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [0, 1, 2, 3, 4, 5, 6, 7],
                    animationSteps: 15,
                    datasets: [{
                        label: 'Impressions',
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        data: $scope.chartData,
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
            }, {
                responsive : true,
            });

            var latestLabel = myChart.data.labels[6];

            $scope.dashTimer = null;

            var addChartData = function(data) {
                myChart.data.datasets[0].data.push(data.impressions);

                var dataLength = myChart.data.datasets[0].data.length;
                if(dataLength > myChart.data.labels.length) {
                    myChart.data.labels.push(dataLength - 1);
                }

                myChart.update();
            };

            $scope.startTimer = function (id,it) {
                $scope.dashTimer = $interval(function () {
                    campaignService.getCampaign(id, it).then(function(data){
                        if($scope.campaign.impressions != data.impressions) {
                            $scope.campaign.addData(data);
                            addChartData(data);
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