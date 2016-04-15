import _ from 'lodash';

class VolunteerController {
  constructor($state, $http, Enums, User, Alert) {
    this.edit = false;
    this.User = User;
    this.enums = Enums;

    if(this.volunteer.user.id == User.getUser().user.id) {
      this.edit = true;
    }

    this.submit = (ang_valid) => {
      let validAvailability = _.every(Validate.availability(this.volunteer.availability), 'isValid');

      this.allValid = ang_valid
                      && Validate.zip(this.volunteer.contact.zip)
                      && Validate.phoneNumber(this.volunteer.contact.phone)
                      && validAvailability;

      if(this.allValid) {
        updateVolunteer();
      }
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
