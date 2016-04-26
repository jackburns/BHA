import angular from 'angular';
import AssignmentsService from './assignments.service';

let assignmentsModule = angular.module('assignmentsAPI', [])

.service('AssignmentsAPI', AssignmentsService);

export default assignmentsModule;
