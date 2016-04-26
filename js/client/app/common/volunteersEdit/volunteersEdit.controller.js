import _ from 'lodash';

class VolunteersEditController {
  constructor(Requests) {
    let createBlankVolunteer = function() {
      return {
        name: '',
        volunteer_level: 0
      }
    };

    this.allVolunteers = [];
    Requests.getVolunteers({}, (volunteers) => {
      this.allVolunteers = volunteers;
    });

    this.addNewVolunteer = function() {
      this.selectedVolunteers.push(createBlankVolunteer());
    };

    this.removeLastVolunteer = function() {
      this.selectedVolunteers.pop();
    };

    if (this.selectedVolunteers.length === 0) {
      this.addNewVolunteer();
    }
  }
}

VolunteersEditController.$inject = ['Requests'];
export default VolunteersEditController;
