class AssignmentListController {
  constructor($state) {
    this.viewAssignment = (assignment) => {
      $state.go('assignment', {
        assignmentId: assignment.id,
        assignment: assignment});
    };
  }
}

AssignmentListController.$inject = ['$state'];
export default AssignmentListController;
