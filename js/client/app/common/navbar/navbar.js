import angular from 'angular';
import uiRouter from 'angular-ui-router';
import navbarComponent from './navbar.component';
import collapse from 'angular-ui-bootstrap/src/collapse'

console.log(collapse);
let navbarModule = angular.module('navbar', [
  uiRouter,
  collapse
])

.component('navbar', navbarComponent);

export default navbarModule;
