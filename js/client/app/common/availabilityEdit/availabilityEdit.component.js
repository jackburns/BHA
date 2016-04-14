import template from './availabilityEdit.html';
import controller from './availabilityEdit.controller';
import './availabilityEdit.scss';

let availabilityEditComponent = {
  restrict: 'E',
  bindings: {
    availability: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default availabilityEditComponent;
