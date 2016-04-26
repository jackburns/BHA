class AssignmentsController {
  constructor(Modals, Requests, $state) {

    let getAssignments = () => {
      Requests.getAssignments((results) => { this.futureAssignments = results;  })
    };

    this.futureAssignments = [];
    getAssignments();

    this.openNotificationsModal = (languageKey) => {
      Requests.getVolunteers({params: {language: languageKey}}, Modals.openNotifications)
    };

    this.viewAssignment = (assignment) => {
      $state.go('assignment', assignment)
    };

  }
}

AssignmentsController.$inject = ['Modals', 'Requests', '$state'];
export default AssignmentsController;
