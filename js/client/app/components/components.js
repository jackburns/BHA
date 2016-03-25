import angular from 'angular';
import Home from './home/home';
import About from './about/about';
<<<<<<< HEAD
import Login from './login/login';
=======
>>>>>>> 6806fc6fbe1ccdf26e454c26e24ab666f1942eea
import Vaf from './vaf/vaf';

let componentModule = angular.module('app.components', [
  Home.name,
  About.name,
<<<<<<< HEAD
  Login.name
=======
>>>>>>> 6806fc6fbe1ccdf26e454c26e24ab666f1942eea
  Vaf.name
]);

export default componentModule;
