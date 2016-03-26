import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import uiSelect from 'ui-select';

let homeModule = angular.module('home', [
  uiRouter,
  uiSelect
]).config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      template: '<home></home>'
    });
}]).component('home', homeComponent);

export default homeModule;
