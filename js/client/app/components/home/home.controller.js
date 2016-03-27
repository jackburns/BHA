class HomeController {
  constructor($location) {

    //TODO: Delete function once GET /volunteers/ API is set up
    let makeVolunteer = function(id, firstName, lastName, languages) {
      return {
        id: id,
        firstName: firstName,
        lastName: lastName,
        languages: languages
      };
    };

    let getVolunteers = function() {
      //TODO: Replace with API call to GET /volunteers/
      return [
        makeVolunteer(0, 'Bill', 'Brown', ['German']),
        makeVolunteer(1, 'Ellie', 'White', ['Portuguese, Spanish']),
        makeVolunteer(3, 'Tom', 'Jones', ['Spanish', 'French'])
      ];
    };

    let getAllLanguages = function() {
      //TODO: Replace with API call
      return ['Spanish', 'German', 'French', 'Portuguese'];
    };

    let viewVolunteer = function(volunteerId) {
      $location.path('/volunteer/' + volunteerId.toString());
    }

    this.updateOrder = function(ordering) {
      this.isReverseOrder = (this.ordering === ordering) ? !this.isReverseOrder : false;
      this.ordering = ordering;
    };

    this.allLanguages = getAllLanguages();

    this.ordering = 'lastName';
    this.isReverseOrder = false;
    this.volunteers = getVolunteers();
    this.viewVolunteer = viewVolunteer;
  }
}

HomeController.$inject = ["$location"];

export default HomeController;
