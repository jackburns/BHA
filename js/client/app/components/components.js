import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Login from './login/login';

let componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Login.name
]);

export default componentModule;
