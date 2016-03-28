import template from './volunteerForm.html';
import controller from './volunteerForm.controller';
import './volunteerForm.scss';

let volunteerFormComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default volunteerFormComponent;
