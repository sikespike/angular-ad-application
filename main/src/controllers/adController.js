angular = require('angular');
require("../services/campaignService");

var UiEvents = require("../model/UiEvents");
var CampaignList = require("../model/CampaignList");

function buildCampaignList(dataList) {
    return new CampaignList(dataList.campaigns);
}

angular.module('angular-choco')
    .controller('AdController', function ChocoController($scope,$window, campaignService) {
        'use strict';
        var campaigns = null

        $scope.campaign = null;

        campaignService.getCampaignList().then(function(data){
            campaigns = buildCampaignList(JSON.parse(data));

            $scope.campaigns = campaigns;
        }, function(e){
            throw new Exception(e);
        });

        $scope.isDashShowing = false;

        var openDashboard = function() {
            $scope.isDashShowing = !$scope.isDashShowing;
        };

        $scope.$on(UiEvents.DASH_OPEN, function($targetScope, $currentScope, value) {
            openDashboard();
            $scope.campaign = value;
        });

        $scope.$on(UiEvents.DASH_CLOSE, function() {
            openDashboard();
        });
    }
);
