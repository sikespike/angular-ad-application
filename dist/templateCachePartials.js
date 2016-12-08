(function(module) {
try {
  module = angular.module('adPartials');
} catch (e) {
  module = angular.module('adPartials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/partial/directives/dashboard-overlay.html',
    '<div>hello world</div>');
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
    '        <span class="panel-header">available flavours</span>\n' +
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
    '            <li class="option-list-item" ng-repeat="item in data track by item.type">\n' +
    '                <div class="image-container">\n' +
    '                    <img class="image-tile" src="{{item.img}}"/>\n' +
    '                </div>\n' +
    '                <div class="item-info-container">\n' +
    '                    <span class="type-name">{{item.title}}</span>\n' +
    '                    <span class="type-description">{{item.description}}</span>\n' +
    '                    <span class="type-price">$ {{item.price.toFixed(2)}}</span>\n' +
    '                    <div class="quantity-controller">\n' +
    '                        <div class="quantity-container">\n' +
    '                            <span class="quantity">{{item.quantity}}</span>\n' +
    '                        </div>\n' +
    '\n' +
    '                    <span class="subtract-item" ng-click="subFromType(item.type)">\n' +
    '                        <svg ng-if="item.quantity == 0" width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
    '                            <defs></defs>\n' +
    '                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '                                <g id="minus" stroke="#979797">\n' +
    '                                    <circle id="Oval" stroke-width="2" fill="#D8D8D8" opacity="0.354846014" cx="24" cy="24" r="23"></circle>\n' +
    '                                    <path d="M8.5,24.5 L40.5,24.5" id="Line" stroke-width="3" stroke-linecap="square" opacity="0.348958333"></path>\n' +
    '                                </g>\n' +
    '                            </g>\n' +
    '                        </svg>\n' +
    '\n' +
    '                        <svg ng-if="item.quantity > 0" width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
    '                            <defs></defs>\n' +
    '                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '                                <g id="minus-color" stroke="#979797">\n' +
    '                                    <circle id="Oval" stroke-width="2" fill="#D8D8D8" cx="24" cy="24" r="23"></circle>\n' +
    '                                    <path d="M8.5,24.5 L40.5,24.5" id="Line" stroke-width="3" stroke-linecap="square"></path>\n' +
    '                                </g>\n' +
    '                            </g>\n' +
    '                        </svg>\n' +
    '                    </span>\n' +
    '                    <span class="add-item" ng-click="addToType(item.type)">\n' +
    '                        <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
    '                            <defs></defs>\n' +
    '                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
    '                                <g id="plus-color" stroke="#979797">\n' +
    '                                    <circle id="Oval" stroke-width="2" fill="#D8D8D8" cx="24" cy="24" r="23"></circle>\n' +
    '                                    <path d="M8.5,24.5 L40.5,24.5" id="Line" stroke-width="3" stroke-linecap="square"></path>\n' +
    '                                    <path d="M24,8 L24,40" id="Line" stroke-width="3" stroke-linecap="square"></path>\n' +
    '                                </g>\n' +
    '                            </g>\n' +
    '                        </svg>\n' +
    '                    </span>\n' +
    '                    </div>\n' +
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
    '                <option-list-container data="campaign"/>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </section>\n' +
    '    <section id="dashboard-layover">\n' +
    '        <dashboard-overlay data="campaign" />\n' +
    '    </section>\n' +
    '</div>\n' +
    '');
}]);
})();
