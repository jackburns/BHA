class AssignmentController {
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

AssignmentController.$inject = ['Modals', 'Requests'];
export default AssignmentController;
