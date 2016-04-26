import angular from 'angular';
import uiRouter from 'angular-ui-router';
import volunteersEditComponent from './volunteersEdit.component';

let volunteersEditModule = angular.module('volunteersEdit', [
  uiRouter
])

.component('volunteersEdit', volunteersEditComponent);

export default volunteersEditModule;
