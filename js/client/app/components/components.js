import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Volunteer from './volunteer/volunteer';
import Login from './login/login';
import Vaf from './vaf/vaf';

let componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Login.name,
  Vaf.name,
  Volunteer.name
]);

export default componentModule;
