import _ from 'lodash';
import notificationsModalTemplate from './../../common/notificationsModal/notificationsModal.html'
import NotificationsModalController from './../../common/notificationsModal/notificationsModal.controller.js'

class AssignmentController {
  constructor($uibModal, $http) {

    let makeAssignment = (name, status, language, date, volunteers) => {
      return {
        name: name,
        status: status,
        language: language,
        date: date,
        volunteers: volunteers
      }
    };

    this.futureAssignments = [
      makeAssignment('assn2', 'valid', 'fr', 1462989649587, [2, 3]),
      makeAssignment('assn3', 'valid', 'ja', 1463151625587, [1]),
      makeAssignment('assignment in the far future', 'valid', 'ca', 1470936625587, []),
      makeAssignment('assn1', 'valid', 'es', 1462978825587, []),
      makeAssignment('assignment in the very far future', 'valid', 'ja', 1490367625587, [6])
    ];
    
    // modal stuff
    this.openNotificationsModal = (languageKey) => {
      $http.get(api + '/volunteers/', {params: {language: languageKey}}
      ).then((res) => {
        open(res.data.results);
      });
    };

    let open = (volunteerList) => {
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
    }
  }
}

AssignmentController.$inject = ['$uibModal', '$http'];
export default AssignmentController;
