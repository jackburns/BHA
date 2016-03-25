import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Volunteer from './volunteer/volunteer';

let componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Volunteer.name
]);

export default componentModule;
