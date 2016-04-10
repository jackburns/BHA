import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Volunteer from './volunteer/volunteer';
import Login from './login/login';
import VolunteerForm from './volunteerForm/volunteerForm';
import Assignment from './assignment/assignment';

let componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Login.name,
  VolunteerForm.name,
  Volunteer.name,
  Assignment.name
]);

export default componentModule;
