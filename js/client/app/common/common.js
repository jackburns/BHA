import angular from 'angular';
import Navbar from './navbar/navbar';
import User from './user/user';
import Footer from './footer/footer'
import Enums from './enums/enums';
import LanguageKeyToName from './languageKeyToName/languageKeyToName';
import LanguageSelect from './languageSelect/languageSelect';
import AvailabilityEdit from './availabilityEdit/availabilityEdit';
import LanguageEdit from './languageEdit/languageEdit';
import Alert from './alert/alert';
import Validate from './validate/validate';
import Requests from './requests/requests';
import Modals from './modals/modals';
import AssignmentList from './assignmentList/assignmentList';
import VolunteersEdit from './volunteersEdit/volunteersEdit';

let commonModule = angular.module('app.common', [
  Navbar.name,
  User.name,
  Footer.name,
  Enums.name,
  LanguageKeyToName.name,
  LanguageSelect.name,
  Alert.name,
  AvailabilityEdit.name,
  LanguageEdit.name,
  Validate.name,
  Requests.name,
  Modals.name,
  AssignmentList.name,
  VolunteersEdit.name
]);

export default commonModule;
