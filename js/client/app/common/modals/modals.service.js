import notificationsModalTemplate from '../notificationsModal/notificationsModal.html'
import NotificationsModalController from '../notificationsModal/notificationsModal.controller.js'

let ModalsService = function($uibModal) {
  let openNotifications = (volunteerList) => {
    var modalInstance = $uibModal.open({
      animation: true,
      template: notificationsModalTemplate,
      controller: NotificationsModalController,
      size: 'md',
      resolve: {
        volunteerList: function() {
          return volunteerList;
        }
      }
    });
  };

  return { openNotifications };
};

ModalsService.$inject = ['$uibModal'];
export default ModalsService;
