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
    
    let getAssignments = () => {
      $http.get('http://api.local.bha.com/api/assignments/').then((res) => {
        return res.data.results;
      }, (error) => {
        console.log(error);
        return error;
      });
    };

    this.futureAssignments = [];
    this.futureAssignments = getAssignments();

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
