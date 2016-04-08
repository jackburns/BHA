import angular from 'angular';
import uiRouter from 'angular-ui-router';
import resetPasswordComponent from './resetPassword.component';

let resetPasswordModule = angular.module('resetPassword', [
  uiRouter
])
.config(['$stateProvider', ($stateProvider) => {
  $stateProvider
    .state('resetPassword', {
      url: '/reset-password?userId&token',
      template: '<reset-password></reset-password>'
    });
}])

.component('resetPassword', resetPasswordComponent);

export default resetPasswordModule;
