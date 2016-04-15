import _ from 'lodash';

class VolunteerController {
  constructor($state, $http, Enums, User, Alert) {
    this.edit = false;
    this.User = User;
    this.enums = Enums;

    if(this.volunteer.user.id == User.getUser().user.id) {
      this.edit = true;
    }

    let validateForm = (ang_valid) => {
      this.allValid = ang_valid && this.zip_valid && this.phone_valid && this.validAvailabilities && this.passwordError.length == 0;
    };

    this.submit = (ang_valid) => {
      validateForm(ang_valid);
    };

    let updateVolunteer = () => {
      $http.put(api + '/volunteers/' + this.volunteer.user.id + '/', this.volunteer).then((res) => {
        Alert.add('sucess', 'Volunteer successfully updated');
      }, (error) => {
        Alert.add('danger', 'Error: Could not update Volunteer');
        console.log(error);
      });
    }
  };
};

VolunteerController.$inject = ["$state", "$http", "Enums", "User", "Alert"];

export default VolunteerController;
