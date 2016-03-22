import angular from 'angular';
import uiRouter from 'angular-ui-router';
import $ from 'jquery';
window.$ = $;
window.jQuery = $;
import jQuery from 'jquery';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
require('bootstrap-sass');
import 'normalize.css';

angular.module('app', [
    uiRouter,
    Common.name,
    Components.name
  ])
  .config(['$locationProvider',($locationProvider) => {
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  }])

  .component('app', AppComponent);
