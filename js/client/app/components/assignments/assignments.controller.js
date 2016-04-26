class AssignmentsController {
  constructor(Modals, Requests, $state, User) {
    let getAssignments = () => {
      Requests.getAssignments((results) => { console.log(results); this.assignments = results;  })
    };

    this.futureAssignments = [];
    getAssignments();

    this.search = {status: 0};
    this.isAdmin = User.isAdmin();
    this.isReverseOrder = false;

    this.openNotificationsModal = (languageKey) => {
      Requests.getVolunteers({params: {language: languageKey}}, Modals.openNotifications)
    };

    this.getVolunteersDisplay = (volunteers) => {
      return _.map(volunteers, volunteer => volunteer.first_name + ' ' + volunteer.last_name).join(', ');
    };

  }
}

AssignmentsController.$inject = ['Modals', 'Requests', '$state', 'User'];
export default AssignmentsController;
