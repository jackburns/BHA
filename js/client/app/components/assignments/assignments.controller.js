class AssignmentsController {
  constructor(Modals, Requests) {

    let getAssignments = () => {
      Requests.getAssignments((results) => { this.futureAssignments = results;  })
    };

    this.futureAssignments = [];
    getAssignments();

    this.openNotificationsModal = (languageKey) => {
      Requests.getVolunteers({params: {language: languageKey}}, Modals.openNotifications)
    };

  }
}

AssignmentsController.$inject = ['Modals', 'Requests'];
export default AssignmentsController;
