import angular from 'angular';
import datepicker from 'angular-ui-bootstrap/src/datepicker';
import uiRouter from 'angular-ui-router';
import volunteerComponent from './volunteer.component';


let volunteerModule = angular.module('volunteer', [
    datepicker,
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
