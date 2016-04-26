class AssignmentController {
  constructor(Enums, User, Alert) {
    this.name = 'assignment';
    this.edit = false;
    this.userIsAdmin = User.isAdmin();
    this.enums = Enums;

    if(this.assignment.posted_by.id == User.getUser().id) {
      this.edit = true;
    }

    let updateAssignment = (assignment) => {
      $http.patch(api + '/assignments/' + this.assignment.id + '/', this.assignment).then((res) => {
        Alert.add('success', 'Assignment successfully updated');
      }, (error) => {
        Alert.add('danger', 'Error: Could not update Assignment');
        console.log(error);
      });
    };
    
  }
}
AssignmentController.$inject = ['Enums', 'User', 'Alert']
export default AssignmentController;
