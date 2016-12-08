angular = require('angular');
require("../services/campaignService");

var UiEvent = require("../model/UiEvent");
var CampaignList = require("../model/CampaignList");

function buildCampaignList(dataList) {
    return new CampaignList(dataList);
}

angular.module('angular-choco')
    .controller('AdController', function ChocoController($scope,$window, camService) {
        'use strict';
        var campaign = null

        camService.getCampaignList().then(function(data){

            campaign = buildCampaignList(JSON.parse(data));

            $scope.campaign = campaign;
        }, function(e){
            throw new Exception(e);
        });

        $scope.menuOpen = false;

        $scope.menuClick = function() {
            $scope.menuOpen = !$scope.menuOpen;
        };

        $scope.$on(UiEvent.OPEN_DASH, function($targetScope, $currentScope) {

        });

        $scope.$on(UiEvent.OPEN_MENU, function($targetScope, $currentScope) {

        });

        $scope.isDashShowing = false;

        var showCart = function() {
            $scope.isDashShowing = true;
        };

        $scope.showCart = showCart;

        var closeCart = function() {
            $scope.isDashShowing = false;
        };

        $scope.closeCart = closeCart;
    }
);
