import template from './assignmentList.html';
import controller from './assignmentList.controller';
import './assignmentList.scss';

let assignmentListComponent = {
  restrict: 'E',
  bindings: {
    assignments: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default assignmentListComponent;
