import _ from 'lodash';

class AssignmentController {
  constructor(Enums, User, Alert, Requests, $state, Modals) {
    this.name = 'assignment';
    this.edit = false;
    this.userIsAdmin = User.isAdmin();
    this.enums = Enums;
    this.assignment.start_date = new Date(this.assignment.start_date);

    this.dateOptions = {
      showWeeks: false
    };

    if(this.assignment.posted_by.id == User.getUser().id) {
      this.edit = false;
    }

    this.displayDate = function(date) {
      return date.getMonth() + 1 + '/' + date.getDay() + '/' + date.getFullYear();
    }

    this.viewProfile = function(volunteer) {
      $state.go('volunteer', {
        volunteerId: volunteer.id,
        volunteer: volunteer
      });
    }

    this.displayTime = function(date) {
      let hours = date.getHours();
      let ampm = hours >= 12 ? ' pm' : ' am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      return hours + ':' + ('0' + date.getMinutes()).slice(-2) + ampm;
    }

    this.submit = () => {
      updateAssignment(this.assignment);
    }

    let updateAssignment = (assignment) => {
      Requests.updateAssignment(assignment).then(() => {
        Alert.add('success', 'Assignment successfully updated');
      }, (error) => {
        Alert.add('danger', 'Error: Could not update Assignment');
        console.log(error);
      });
    };
    this.openNotificationsModal = Modals.openNotifications;
  }
}
AssignmentController.$inject = ['Enums', 'User', 'Alert', 'Requests', '$state', 'Modals']
export default AssignmentController;
