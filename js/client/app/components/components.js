import angular from 'angular';
import VolunteerSearch from './volunteerSearch/volunteerSearch';
import About from './about/about';
import Volunteer from './volunteer/volunteer';

import Login from './login/login';
import VolunteerForm from './volunteerForm/volunteerForm';
import Assignment from './assignment/assignment';

let componentModule = angular.module('app.components', [
  About.name,
  Login.name,
  VolunteerForm.name,
  Volunteer.name,
  VolunteerSearch.name,
  Assignment.name
]);

export default componentModule;
