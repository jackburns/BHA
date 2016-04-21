import _ from 'lodash';
import NotificationsModalTemplate from './../../common/notificationsModal/notificationsModal.html';
import NotificationsModalController from './../../common/notificationsModal/notificationsModal.controller.js';

class VolunteerController {
  constructor($http, Enums, User, Alert, Validate, $uibModal) {
    this.edit = false;
    this.userIsAdmin = User.isAdmin();
    this.enums = Enums;

    if(this.volunteer.id == User.getUser().id) {
      this.edit = true;
    }

    this.submit = (ang_valid) => {
      let validAvailability = _.every(Validate.availability(this.volunteer.availability), 'isValid');
      this.zipValid = Validate.zip(this.volunteer.contact.zip);
      this.phoneValid = Validate.phoneNumber(this.volunteer.contact.phone_number);
      this.carrierValid = Validate.carrier(this.volunteer.contact.preferred_contact, this.volunteer.contact.carrier);
      this.allValid = ang_valid
                      && this.zipValid
                      && this.phoneValid
                      && this.carrierValid
                      && validAvailability;

      if(this.allValid) {
        updateVolunteer();
      }
    };

    let updateVolunteer = () => {
      $http.patch(api + '/volunteers/' + this.volunteer.id + '/', this.volunteer).then((res) => {
        Alert.add('success', 'Volunteer successfully updated');
      }, (error) => {
        Alert.add('danger', 'Error: Could not update Volunteer');
        console.log(error);
      });
    }

    // modal stuff
    this.openNotificationsModal = function(volunteer) {
      var modalInstance = $uibModal.open({
        animation: true,
        template: NotificationsModalTemplate,
        controller: NotificationsModalController,
        size: 'md',
        resolve: {
          volunteerList: function() {
            return [volunteer];
          }
        }
      });
    };
  };
};

VolunteerController.$inject = ["$http", "Enums", "User", "Alert", "Validate", "$uibModal"];

export default VolunteerController;
