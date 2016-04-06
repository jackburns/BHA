import angular from 'angular';
import Navbar from './navbar/navbar';
import User from './user/user';
import Footer from './footer/footer'
import Enums from './enums/enums';
import LanguageSelect from './languageSelect/languageSelect';

let commonModule = angular.module('app.common', [
  Navbar.name,
  User.name,
  Footer.name,
  Enums.name,
  LanguageSelect.name
]);

export default commonModule;
