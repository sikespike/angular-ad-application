angular = require('angular');
require("../services/campaignService");

var UiEvents = require("../model/UiEvents");
var CampaignList = require("../model/CampaignListModel");
var Campaign = require("../model/CampaignModel");
var _ = require("underscore");

function buildCampaignList(dataList) {
    return new CampaignList(dataList.campaigns);
}


angular.module('angular-choco')
    .controller('AdController', function ChocoController($scope,$window, campaignService) {
        'use strict';
        var campaigns = null

        var campaign = null;
        $scope.campaign = campaign;

        campaignService.getCampaignList().then(function(data){
            campaigns = buildCampaignList(data);

            $scope.campaigns = campaigns;
        }, function(e){
            throw new Exception(e);
        });

        $scope.isDashShowing = false;

        $scope.dashTimer = 0;

        var toggleDashboard = function() {
            $scope.isDashShowing = !$scope.isDashShowing;
        };

        $scope.toggleDashboard = toggleDashboard;

        var getCampaign = function(id) {
            return campaigns.getType(id);
        };

        $scope.$on(UiEvents.DASH_OPEN, function(event, target) {
            var it = $scope.campaign ? $scope.campaign.iteration: 0;

            campaignService.getCampaign(target.id, it).then(function(data) {
                campaign = getCampaign(target.id);
                campaign.addData(data);
                $scope.campaign = campaign;
                toggleDashboard();
                $scope.startTimer(target.id, $scope.campaign.iteration);
            });
        });

        $scope.$on(UiEvents.DASH_CLOSE, function($targetScope, $currentScope, value) {
            toggleDashboard();
            $scope.campaign = null;
        });
    }
);
