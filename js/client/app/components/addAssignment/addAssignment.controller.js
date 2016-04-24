class AddAssignmentController {
  constructor($http, $filter, Enums, Alert, User) {
    this.name = 'New Assignment';
    this.selectOptions = Enums;
    this.error = false;

    var startingDate = new Date();
    startingDate.setHours("9");
    startingDate.setMinutes("0");
    this.dateOptions = {
      minDate: startingDate,
      initDate: startingDate,
      showWeeks: false
    };

    // initial info object
    this.info = {
      name: "",
      language_name: "",
      start_date: startingDate,
      type: "0",
      notes: "",
      admin_notes: "",
      contact: {
        street: "",
        city: "",
        state: "",
        zip: "",
        phone_number: "",
        email: ""
      },
      posted_by_id: User.getUser().id,
      volunteers: [],
      status: "0"
    };

    // on submit
    this.submit = function(ang_valid) {
      if (ang_valid && this.info.language_name != "") {
        this.error = false;
        $http.post(api + '/assignments/', this.info).then((res) => {
            Alert.add('success', 'Success: Assignment Created');
            $state.go('assignment');
          }, (error) => {
            Alert.add('danger', 'Error: Assignment Not Created');
          });
      } else {
        this.error = true;
      }
    };
  }
}

AddAssignmentController.$inject = ['$http', '$filter', 'Enums', 'Alert', 'User'];
export default AddAssignmentController;
