import angular from 'angular';
import uiRouter from 'angular-ui-router';
import volunteersComponent from './volunteers.component';
import uiSelect from 'ui-select';

let volunteersModule = angular.module('volunteers', [
  uiRouter,
  uiSelect
]).config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('volunteers', {
      url: '/volunteers',
      template: '<volunteers></volunteers>'
    });
}]).component('volunteers', volunteersComponent);

export default volunteersModule;
