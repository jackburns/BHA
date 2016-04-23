import angular from 'angular';
import RequestsService from './requests.service';

let userModule = angular.module('requests', [])

  .service('Requests', RequestsService);

export default userModule;
