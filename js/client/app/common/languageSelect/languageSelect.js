import angular from 'angular';
import uiRouter from 'angular-ui-router';
import languageSelectComponent from './languageSelect.component';

let languageSelectModule = angular.module('languageSelect', [
  uiRouter
])

.component('languageSelect', languageSelectComponent);

export default languageSelectModule;
