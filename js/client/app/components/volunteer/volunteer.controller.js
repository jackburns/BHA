import _ from 'lodash'

class VolunteerController {
  constructor($state, $http, Enums, User) {
    this.edit = false;
    this.User = User;
    this.enums = Enums;

    if(this.volunteer.user.id == User.getUser().user.id) {
      this.edit = true;
    }
  };
};

VolunteerController.$inject = ["$state", "$http", "Enums", "User"];

export default VolunteerController;
