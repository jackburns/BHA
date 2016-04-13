import template from './home.html';
import controller from './home.controller';
import 'ui-select/dist/select.css';
import './home.scss';

let homeComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default homeComponent;
