import angular from 'angular';
import EnumsService from './enums.service';

let enumsModule = angular.module('enums', [])

.service('Enums', EnumsService);

export default enumsModule;
