import angular from 'angular';
import Navbar from './navbar/navbar';
import Assignments from './assignments/assignments';
import User from './user/user';
import Footer from './footer/footer'
import Enums from './enums/enums';
import LanguageKeyToName from './languageKeyToName/languageKeyToName';
import LanguageSelect from './languageSelect/languageSelect';
import AvailabilityEdit from './availabilityEdit/availabilityEdit';
import LanguageEdit from './languageEdit/languageEdit';
import Alert from './alert/alert';
import Validate from './validate/validate';

let commonModule = angular.module('app.common', [
  Navbar.name,
  Assignments.name,
  User.name,
  Footer.name,
  Enums.name,
  LanguageKeyToName.name,
  LanguageSelect.name,
  Alert.name,
  AvailabilityEdit.name,
  LanguageEdit.name,
  Validate.name
]);

export default commonModule;
