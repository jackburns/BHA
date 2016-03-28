import template from './vaf.html';
import controller from './vaf.controller';
import './vaf.scss';

let vafComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default vafComponent;
