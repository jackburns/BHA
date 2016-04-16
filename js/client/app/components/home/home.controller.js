import _ from 'lodash';
import notificationsModalTemplate from './../../common/notificationsModal/notificationsModal.html'
import NotificationsModalController from './../../common/notificationsModal/notificationsModal.controller.js'

class HomeController {
  constructor($state, $uibModal, $http, Enums) {
    console.log("Here i am");
  }
}

HomeController.$inject = ["$state", "$uibModal", "$http", "Enums"];

export default HomeController;
