angular = require('angular');
require('angular-route');
require('../../dist/templateCachePartials');

angular.module('angular-choco', ['ngRoute','adPartials'])

.config(function ($routeProvider,$httpProvider) {
        $routeProvider.when('/', {
            templateUrl: '/partial/views/ad-index.html',
            controller: 'AdController',
        });

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
);

//---controllers
require('./controllers/adController');
require("./controllers/optionListController");

//services
require('./services/campaignService');

//directives
require('./directives/optionListContainer');
require("./directives/dashboardOverlay");