import _ from 'lodash';
import notificationsModalTemplate from './../../common/notificationsModal/notificationsModal.html'
import NotificationsModalController from './../../common/notificationsModal/notificationsModal.controller.js'

class HomeController {
  constructor($state, $uibModal, $http, User) {
    this.user = User;
  }
}

HomeController.$inject = ["$state", "$uibModal", "$http", "User"];

export default HomeController;
