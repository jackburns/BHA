import angular from 'angular';
import uiRouter from 'angular-ui-router';
import assignmentsComponent from './assignments.component';

let assignmentsModule = angular.module('assignments', [
  uiRouter
])

.config(['$stateProvider', ($stateProvider) => {
  $stateProvider
    .state('assignments', {
      url: '/assignments',
      template: '<assignments></assignment>'
    });
}])

.component('assignments', assignmentsComponent);

export default assignmentsModule;
