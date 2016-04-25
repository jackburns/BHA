import _ from 'lodash';
import notificationsModalTemplate from './../../common/notificationsModal/notificationsModal.html'
import NotificationsModalController from './../../common/notificationsModal/notificationsModal.controller.js'

class HomeController {
  constructor($state, $uibModal, $http, User, Assignments) {
    this.user = User;
    Assignments.getMyAssignments().then((res) => {
      this.assignments = res.data;
    });
  }
}

HomeController.$inject = ["$state", "$uibModal", "$http", "User", "Assignments"];

export default HomeController;
