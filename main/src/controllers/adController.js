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

        $scope.$on(UiEvents.DASH_OPEN, function(event, target) {
            campaignService.getCampaign(target.id).then(function(data) {
                campaign = new Campaign();
                campaign.addData(data);
                $scope.campaign = campaign;
                toggleDashboard();
                $scope.startTimer(target.id);
            });
        });

        $scope.$on(UiEvents.DASH_CLOSE, function($targetScope, $currentScope, value) {
            toggleDashboard();
        });
    }
);
