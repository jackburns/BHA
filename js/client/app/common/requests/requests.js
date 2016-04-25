import angular from 'angular';
import RequestsService from './requests.service';

let requestModule = angular.module('requests', [])

  .service('Requests', RequestsService);

export default requestModule;
