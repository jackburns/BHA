import template from './languageEdit.html';
import controller from './languageEdit.controller';
import './languageEdit.scss';

let languageEditComponent = {
  restrict: 'E',
  bindings: {
    languages: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default languageEditComponent;
