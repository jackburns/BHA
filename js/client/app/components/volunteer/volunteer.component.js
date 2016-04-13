import template from './volunteer.html';
import controller from './volunteer.controller';
import './volunteer.scss';

let volunteerComponent = {
  restrict: 'E',
  template,
  controller,
  controllerAs: 'vm',
};

export default volunteerComponent;
