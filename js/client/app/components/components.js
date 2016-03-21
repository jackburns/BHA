import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Vaf from './vaf/vaf';

let componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Vaf.name
]);

export default componentModule;
