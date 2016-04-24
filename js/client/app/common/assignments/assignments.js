import angular from 'angular';
import AssignmentsService from './assignments.service';

let assignmentsModule = angular.module('assignments', [])

.service('Assignments', AssignmentsService);

export default assignmentsModule;
