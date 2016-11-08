class AssignmentsController {
  constructor(Modals, Requests, $state, User, Enums) {
    this.enums = Enums;
    let getAssignments = () => {
      Requests.getAssignments((this.search), (results) => {
        this.assignments = results;
      });
    };

    this.futureAssignments = [];

    // Default on load is All assignments
    this.search = {
      [status]: [0, 1, 2],
      language_name: '',
      unassigned: false
    };

    this.isAdmin = User.isAdmin();
    this.isReverseOrder = false;
    getAssignments();
    // Change back to the status of 3 (for HTML)
    this.search.status = 3;

    this.updateAssignments = () => {
      // Variable to change status back to normal
      var change_back = false;
      if (this.search.status == 3) {
          change_back = true;
          this.search = {
            [status]: [0, 1, 2],
            language_name: '',
            unassigned: false
          };
      }
      getAssignments();
      // Check if we should change back to All status
      if (change_back == true) {
        // Switch the status back to 3 for HTML
        this.search.status = 3;
      }
    };

    this.openNotificationsModal = (languageKey) => {
      Requests.getVolunteers({params: {language: languageKey}}, Modals.openNotifications)
    };

    this.getVolunteersDisplay = (volunteers) => {
      return _.map(volunteers, volunteer => volunteer.first_name + ' ' + volunteer.last_name).join(', ');
    };

    this.viewAssignment = (assignment) => {
      $state.go('assignment', {
        assignmentId: assignment.id,
        assignment: assignment
      });
    }
  }
}

AssignmentsController.$inject = ['Modals', 'Requests', '$state', 'User', 'Enums'];
export default AssignmentsController;
