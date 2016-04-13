import template from './volunteers.html';
import controller from './volunteers.controller';
import 'ui-select/dist/select.css';
import './volunteers.scss';

let volunteersComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default volunteersComponent;
