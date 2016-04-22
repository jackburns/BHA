import angular from 'angular';
import uiRouter from 'angular-ui-router';
import addAssignmentComponent from './addAssignment.component';

let addAssignmentModule = angular.module('addAssignment', [
  uiRouter
])

.config(['$stateProvider', ($stateProvider) => {
  $stateProvider
    .state('addAssignment', {
      url: '/add-assignment',
      template: '<add-assignment></add-assignment>'
    });
}])

.component('addAssignment', addAssignmentComponent);

export default addAssignmentModule;
