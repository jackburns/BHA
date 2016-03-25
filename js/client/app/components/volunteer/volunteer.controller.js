import faker from 'faker'

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
          return vm.makeVolunteer(3, faker.name.firstName(), '', faker.name.lastName(), ['Ukranian', 'Swedish', 'Afrikaans']);
      };
    };

    vm.volunteer = vm.getVolunteer(vm.volunteerId);
  };
};

VolunteerController.$inject = ["$state", "$http"];

export default VolunteerController;
