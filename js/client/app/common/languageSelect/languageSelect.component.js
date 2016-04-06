import template from './languageSelect.html';
import controller from './languageSelect.controller';
import './languageSelect.scss';

let languageSelectComponent = {
  restrict: 'E',
  bindings: {
    selectedLanguage: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default languageSelectComponent;
