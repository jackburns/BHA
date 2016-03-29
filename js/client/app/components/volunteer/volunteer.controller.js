import faker from 'faker'
import _ from 'lodash'

class VolunteerController {
  constructor($state, $http) {
    const vm = this;

    vm.volunteerId = parseInt($state.params.volunteerId);

    vm.makeVolunteer = function(id, firstName, middleName, lastName, languages) {
      return {
        id: id,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        languages: languages,
        birthday: faker.date.past(),
        gender: "Other",
        role: "User",
        volunteerLevel: "beenObserved",
        createdAt: faker.date.recent(),
        notes: faker.lorem.paragraphs(),
        contact: {
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.stateAbbr(),
          zip: faker.address.zipCode(),
          phoneNumber: faker.phone.phoneNumber(),
          email: faker.internet.email(),
          preferredContact: "Both"
        },
        hours: Math.floor(30 + Math.random() * 30)
      };
    };

    vm.getVolunteer = function(volunteerId) {
      //$http.get(...)

      switch(volunteerId) {
        case 0:
          return vm.makeVolunteer(0, 'Bill', 'Ungar', 'Brown', ['German']);
        case 1:
          return vm.makeVolunteer(1, 'Ellie', 'Walter', 'White', ['Portuguese, Spanish']);
        case 2:
          return vm.makeVolunteer(2, 'Tom', 'Jerry', 'Jones', ['Spanish', 'French']);
        default:
          return vm.makeVolunteer(vm.volunteerId, faker.name.firstName(), '', faker.name.lastName(), ['Ukranian', 'Swedish', 'Afrikaans']);
      };
    };

    vm.volunteer = vm.getVolunteer(vm.volunteerId);

    vm.generateSchedule = function() {

      let randomTrueFalse = () => {
        return (Math.floor(Math.random() * 2)) == 0 ? false : true;
      }

      let schedule = _.map(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], (day) => {
        var am = randomTrueFalse();
        var pm = randomTrueFalse();
        var ret = {day: day, am: am, pm: pm};
        return ret;
      });

      return schedule;
    }

    vm.schedule = vm.generateSchedule();
    vm.days = _.map(vm.schedule, (day) => { return day.day; });
    vm.ams = _.map(vm.schedule, (day) => { return day.am; });
    vm.pms = _.map(vm.schedule, (day) => { return day.pm; });


  };
};

VolunteerController.$inject = ["$state", "$http"];

export default VolunteerController;
