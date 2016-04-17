import angular from 'angular';
import uiRouter from 'angular-ui-router';
import languageEditComponent from './languageEdit.component';

let languageEditModule = angular.module('languageEdit', [
  uiRouter
])

.component('languageEdit', languageEditComponent);

export default languageEditModule;
