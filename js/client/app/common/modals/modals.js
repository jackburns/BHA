import angular from 'angular';
import ModalsService from './modals.service';

let modalsModule = angular.module('modals', [])

  .service('Modals', ModalsService);

export default modalsModule;
