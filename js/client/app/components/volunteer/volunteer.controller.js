import _ from 'lodash'

class VolunteerController {
  constructor($state, $http, Enums) {

    console.log(this);
    const vm = this;

    vm.languages = Enums.languages;
  };
};

VolunteerController.$inject = ["$state", "$http", "Enums"];

export default VolunteerController;
