import angular from 'angular';
import AlertService from './alert.service';

let alertModule = angular.module('alert', [])

.service('Alert', AlertService);

export default alertModule;
