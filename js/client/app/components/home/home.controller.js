class HomeController {
  constructor($location) {

    let makeVolunteer = function(id, firstName, lastName, languages) {
      return {
        id: id,
        firstName: firstName,
        lastName: lastName,
        languages: languages
      };
    };

    this.ordering = 'lastName';
    this.isReverseOrder = false;
    this.updateOrder = function(ordering) {
      this.isReverseOrder = (this.ordering === ordering) ? !this.isReverseOrder : false;
      this.ordering = ordering;
    };

    this.volunteers = [
      makeVolunteer(0, 'Bill', 'Brown', ['German']),
      makeVolunteer(1, 'Ellie', 'White', ['Portuguese, Spanish']),
      makeVolunteer(2, 'Tom', 'Jones', ['Spanish', 'French'])
    ];

    this.viewVolunteer = function(volunteerId) {
      console.log(volunteerId);
      $location.path('/volunteer/' + volunteerId.toString());
    }
  }
}

HomeController.$inject = ["$location"];

export default HomeController;
