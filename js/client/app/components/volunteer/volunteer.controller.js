import _ from 'lodash'

class VolunteerController {
  constructor($state, $http, Enums, User) {
    this.edit = false;
    this.User = User;
    this.user = User.getUser();

    if(this.volunteer.user.id == User.getUser().user.id) {
      this.edit = true;
    }

    console.log(this);
    const vm = this;

    vm.languages = Enums.languages;
  };
};

VolunteerController.$inject = ["$state", "$http", "Enums", "User"];

export default VolunteerController;
