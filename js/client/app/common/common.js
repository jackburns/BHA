import angular from 'angular';
import Navbar from './navbar/navbar';
import User from './user/user';
import Footer from './footer/footer'

let commonModule = angular.module('app.common', [
  Navbar.name,
  User.name,
  Footer.name
]);

export default commonModule;
