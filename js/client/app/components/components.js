import angular from 'angular';
import Home from './home/home';
import VolunteerSearch from './volunteerSearch/volunteerSearch';
import Volunteer from './volunteer/volunteer';
import Login from './login/login';
import VolunteerForm from './volunteerForm/volunteerForm';
import Assignment from './assignment/assignment';
import ResetPassword from './resetPassword/resetPassword'
import AddAssignment from './addAssignment/addAssignment'

let componentModule = angular.module('app.components', [
  Home.name,
  Login.name,
  VolunteerForm.name,
  Volunteer.name,
  VolunteerSearch.name,
  Assignment.name,
  ResetPassword.name,
  AddAssignment.name
]);

export default componentModule;
