import angular from 'angular';
import uiRouter from 'angular-ui-router';
import volunteerComponent from './volunteer.component';

let volunteerModule = angular.module('volunteer', [
  uiRouter
])

.config(['$stateProvider', ($stateProvider) => {
  $stateProvider
    .state('volunteer', {
      url: '/volunteer/:volunteerId',
      template: '<volunteer></volunteer>'
    });
}])

.component('volunteer', volunteerComponent);

export default volunteerModule;
