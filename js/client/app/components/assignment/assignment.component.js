import template from './assignment.html';
import controller from './assignment.controller';
import './assignment.scss';

let assignmentComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm',
  bindings: {
    assignment: '='
  },
  bindToController: true
};

export default assignmentComponent;
