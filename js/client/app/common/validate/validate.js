import angular from 'angular';
import ValidateService from './validate.service';

let validateModule = angular.module('validate', [])

.service('Validate', ValidateService);

export default validateModule;
