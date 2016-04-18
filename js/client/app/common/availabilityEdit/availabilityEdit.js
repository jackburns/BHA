import angular from 'angular';
import uiRouter from 'angular-ui-router';
import availabilityEditComponent from './availabilityEdit.component';

let availabilityEditModule = angular.module('availabilityEdit', [
  uiRouter
])

.component('availabilityEdit', availabilityEditComponent);

export default availabilityEditModule;
