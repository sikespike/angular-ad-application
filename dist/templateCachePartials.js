(function(module) {
try {
  module = angular.module('adPartials');
} catch (e) {
  module = angular.module('adPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partial/directives/dashboard-overlay.html',
    '<div class="dashboard-overlay-wrapper" ng-class="{show: isCartShowing}">\n' +
    '    <div class="dashboard-overlay">\n' +
    '        <span class="close-button" ng-click="closeCart()">\n' +
    '            <i class="fa fa-window-close" aria-hidden="true"></i>\n' +
    '        </span>\n' +
    '        <span class="dashboard-header">{{data.name}} Campaign</span>\n' +
    '        <div class="campaign-list" >\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('adPartials');
} catch (e) {
  module = angular.module('adPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partial/directives/option-list-container.html',
    '<div id="#list-container" class="base-panel-wrapper">\n' +
    '    <div class="base-panel option-list-container" ng-class="{open: menuOpen}">\n' +
    '        <span class="panel-header">List of ad campaigns</span>\n' +
    '        <div class="view-style-container">\n' +
    '            <div class="style-container">\n' +
    '            <span class="tile-list-view">\n' +
    '            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">\n' +
    '                <g>\n' +
    '                    <path d="M0,9h7v7H0V9z" fill="#cecece"/>\n' +
    '                    <path d="M0,0h7v7H0V0z" fill="#cecece"/>\n' +
    '                    <path d="M9,9h7v7H9V9z" fill="#cecece"/>\n' +
    '                    <path d="M9,0h7v7H9V0z" fill="#cecece"/>\n' +
    '                </g>\n' +
    '            </svg>\n' +
    '            </span>\n' +
    '            <span class="list-list-view">\n' +
    '                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 13 13" style="enable-background:new 0 0 13 13;" xml:space="preserve">\n' +
    '                    <g>\n' +
    '                        <path d="M3,3H0v3h3V3z M2,5H1V4h1V5z" fill="#cecece"/>\n' +
    '                        <path d="M4,3h9v1H4V3z" fill="#cecece"/>\n' +
    '                        <path d="M0,10h3V7H0V10z M1,8h1v1H1V8z" fill="#cecece"/>\n' +
    '                        <path d="M4,9h9v1H4V9z" fill="#cecece"/>\n' +
    '                        <path d="M4,5h9v1H4V5z" fill="#cecece"/>\n' +
    '                        <path d="M4,7h9v1H4V7z" fill="#cecece"/>\n' +
    '                    </g>\n' +
    '                </svg>\n' +
    '            </span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <ul class="option-list">\n' +
    '            <li class="option-list-item" ng-repeat="item in list track by item.id" ng-click="campaignItemClick(item)">\n' +
    '                <div class="image-container">\n' +
    '                    <div class="colour-container {{item.name.toLowerCase()}}"></div>\n' +
    '                </div>\n' +
    '                <div class="item-info-container">\n' +
    '                    <span class="type-name">{{item.name}}</span>\n' +
    '                </div>\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('adPartials');
} catch (e) {
  module = angular.module('adPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partial/views/ad-index.html',
    '<div>\n' +
    '    <header id="choco-header" class="main-header">\n' +
    '        <span class="header-text">Ad Campaign Management</span>\n' +
    '    </header>\n' +
    '    <section id="choco-app">\n' +
    '        <div class="main-container">\n' +
    '            <div class="main-body">\n' +
    '                <option-list-container list="campaigns.data"/>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </section>\n' +
    '    <section id="dashboard-layover">\n' +
    '        <dashboard-overlay data="campaign" ng-class="{show: isDashShowing}" />\n' +
    '    </section>\n' +
    '</div>\n' +
    '');
}]);
})();
