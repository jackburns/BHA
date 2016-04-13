import template from './volunteerSearch.html';
import controller from './volunteerSearch.controller';
import 'ui-select/dist/select.css';
import './volunteerSearch.scss';

let volunteerSearchComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default volunteerSearchComponent;
