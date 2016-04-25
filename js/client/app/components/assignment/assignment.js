import angular from 'angular';
import uiRouter from 'angular-ui-router';
import assignmentComponent from './assignment.component';

let assignmentModule = angular.module('assignment', [
  uiRouter
])

.component('assignment', assignmentComponent);

export default assignmentModule;
