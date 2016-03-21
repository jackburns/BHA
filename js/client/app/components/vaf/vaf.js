import angular from 'angular';
import uiRouter from 'angular-ui-router';
import vafComponent from './vaf.component';

let vafModule = angular.module('vaf', [
  uiRouter
])

.config(['$stateProvider', ($stateProvider) => {
  $stateProvider
    .state('vaf', {
      url: '/vaf',
      template: '<vaf></vaf>'
    });
}])

.component('vaf', vafComponent);

export default vafModule;
