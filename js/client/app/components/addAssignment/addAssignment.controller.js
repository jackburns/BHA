class AddAssignmentController {
  constructor($http, $filter, Enums, Alert) {
    this.name = 'New Assignment';
    this.selectOptions = Enums;
    
    this.dateOptions = {
      minDate: new Date(),
      initDate: new Date(),
      showWeeks: false
    };
    
    // initial info object
    this.info = {
      name: "",
      language_name: "",
      date: "",
      start_time: new Date(2016, 1, 1, 9, 0, 0, 0), // 9AM
      type: this.selectOptions.assignment_type[0],
      notes: "",
      admin_notes: "",
      duration: "",
      contact: {
        street: "",
        city: "",
        state: "",
        zip: "",
        phone_number: "",
        email: ""
      }
    };
    
    this.submits = function() {
      console.log(this.info);
    };
    
    this.openDatePicker = function() {
      this.datePickerOpen = true;
    };

    // on submit
    this.submit = function() {
      $http.post(api + '/assignments/', this.info).then((res) => {
        Alert.add('success', 'Success: Assignment Created');
        $state.go('assignment');
        }, (error) => {
          Alert.add('danger', 'Error: Assignment Not Created');
        });
    };
  }
}

AddAssignmentController.$inject = ['$http', '$filter', 'Enums', 'Alert'];
export default AddAssignmentController;
