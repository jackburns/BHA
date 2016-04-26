import template from './volunteersEdit.html';
import controller from './volunteersEdit.controller';
import './volunteersEdit.scss';

let volunteersEditComponent = {
  restrict: 'E',
  bindings: {
    selectedVolunteers: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default volunteersEditComponent;
