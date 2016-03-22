class HomeController {
  constructor() {
    const vm = this;

    let makeVolunteer = function(id, firstName, lastName, languages) {
      return {
        id: id,
        firstName: firstName,
        lastName: lastName,
        languages: languages
      };
    };

    vm.ordering = 'lastName';
    vm.isReverseOrder = false;
    vm.updateOrder = function(ordering) {
      vm.isReverseOrder = (vm.ordering === ordering) ? !vm.isReverseOrder : false;
      vm.ordering = ordering;
    };

    vm.volunteers = [
      makeVolunteer(0, 'Bill', 'Brown', ['German']),
      makeVolunteer(1, 'Ellie', 'White', ['Portuguese, Spanish']),
      makeVolunteer(2, 'Tom', 'Jones', ['Spanish', 'French'])
    ];
  }
}

export default HomeController;
