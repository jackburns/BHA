import template from './assignments.html';
import controller from './assignments.controller';
import './assignments.scss';

let assignmentsComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default assignmentsComponent;
