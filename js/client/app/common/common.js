import angular from 'angular';
import Navbar from './navbar/navbar';
import User from './user/user';
import Footer from './footer/footer'
import Enums from './enums/enums';
import LanguageKeyToName from './languageKeyToName/languageKeyToName';
import LanguageSelect from './languageSelect/languageSelect';
import Alert from './alert/alert';

let commonModule = angular.module('app.common', [
  Navbar.name,
  User.name,
  Footer.name,
  Enums.name,
  LanguageKeyToName.name,
  LanguageSelect.name,
  Alert.name
]);

export default commonModule;
