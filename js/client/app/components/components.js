import angular from 'angular';
import VolunteerSearch from './volunteerSearch/volunteerSearch';
import Volunteers from './volunteers/volunteers';
import About from './about/about';
import Volunteer from './volunteer/volunteer';
import Login from './login/login';
import VolunteerForm from './volunteerForm/volunteerForm';
import Assignment from './assignment/assignment';

let componentModule = angular.module('app.components', [
  VolunteerSearch.name,
  About.name,
  Login.name,
  VolunteerForm.name,
  Volunteer.name,
  Volunteers.name,
  Assignment.name
]);

export default componentModule;
