import _ from 'lodash';

class AssignmentController {
  constructor(Modals, Requests, User) {

    let getAssignments = () => {
      Requests.getAssignments((results) => { this.assignments = results;  })
    };

    this.futureAssignments = [];
    getAssignments();

    this.search = {status: 1};
    this.isAdmin = User.isAdmin();
    this.isReverseOrder = false;

    this.openNotificationsModal = (languageKey) => {
      Requests.getVolunteers({params: {language: languageKey}}, Modals.openNotifications)
    };

    this.getVolunteersDisplay = (volunteers) => {
      return _.map(volunteers, volunteer => volunteer.first_name + ' ' + volunteer.last_name).join(', ');
    }
  }
}

AssignmentController.$inject = ['Modals', 'Requests', 'User'];
export default AssignmentController;
