import template from './home.html';
import controller from './home.controller';
import './home.scss';
import 'ui-select/dist/select.css';

let homeComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default homeComponent;
