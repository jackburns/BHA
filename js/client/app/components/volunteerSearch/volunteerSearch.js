import angular from 'angular';
import uiRouter from 'angular-ui-router';
import volunteerSearchComponent from './volunteerSearch.component';
import uiSelect from 'ui-select';

let volunteerSearchModule = angular.module('volunteerSearch', [
  uiRouter,
  uiSelect
]).config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('volunteerSearch', {
      url: '/volunteers',
      template: '<volunteer-search></volunteer-search>'
    });
}]).component('volunteerSearch', volunteerSearchComponent);

export default volunteerSearchModule;
