import angular from 'angular';
import uiRouter from 'angular-ui-router';
import volunteerFormComponent from './volunteerForm.component';

let volunteerFormModule = angular.module('volunteerForm', [
  uiRouter
])

.config(['$stateProvider', ($stateProvider) => {
  $stateProvider
    .state('volunteerApplication', {
      url: '/apply',
      template: '<volunteer-form></volunteer-form>'
    });
}])

.component('volunteerForm', volunteerFormComponent);

export default volunteerFormModule;
