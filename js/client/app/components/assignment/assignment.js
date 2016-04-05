import angular from 'angular';
import uiRouter from 'angular-ui-router';
import assignmentComponent from './assignment.component';

let assignmentModule = angular.module('assignment', [
  uiRouter
])

.config(['$stateProvider', ($stateProvider) => {
  $stateProvider
    .state('assignment', {
      url: '/assignments',
      template: '<assignment></assignment>'
    });
}])
  
.component('assignment', assignmentComponent);

export default assignmentModule;
