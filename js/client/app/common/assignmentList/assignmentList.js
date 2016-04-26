import angular from 'angular';
import uiRouter from 'angular-ui-router';
import assignmentListComponent from './assignmentList.component';

let assignmentListModule = angular.module('assignmentList', [
  uiRouter
])

.component('assignmentList', assignmentListComponent);

export default assignmentListModule;
