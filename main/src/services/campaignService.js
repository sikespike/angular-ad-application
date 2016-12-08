angular = require('angular');

angular.module('angular-choco')
    .factory("campaignService", function ($http, $injector) {
        'use strict';
        return {
            getCampaignList: function() {
                return $http({
                    method:"GET",
                    url:"/api/campaigns"
                }).then(function success(res) {
                    return JSON.parse(JSON.stringify(res.data));
                }, function error(res) {
                    console.log("Error Found:");
                    console.log(res);
                });
            },
            getCampaign: function(id, it) {
                return $http({
                    method:"GET",
                    url:"/api/campaigns/"+id+"?number="+it
                }).then(function success(res) {
                    return JSON.parse(JSON.stringify(res.data));
                }, function error(res) {
                    console.log("Error Found:");
                    console.log(res);
                });
            }
        };
    });
