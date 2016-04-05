import template from './assignment.html';
import controller from './assignment.controller';
import './assignment.scss';

let assignmentComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default assignmentComponent;
