class AddAssignmentController {
  constructor($http, $filter, Enums, Alert, User) {
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
    
    // generate the object to post
    this.getPostObj = function() {
      return {
        name: this.info.name,
        language_name: this.info.language_name,
        date: $filter('date')(this.info.date, 'MM/dd/yyyy'),
        start_time: $filter('date')(this.info.start_time, 'HH:mm'),
        type: this.info.type,
        notes: this.info.notes,
        admin_notes: this.info.admin_notes,
        duration: this.info.duration,
        contact: this.info.contact,
        submitter_id: User.getUser().id
      };
    };
    
    this.submits = function() {
      console.log(this.getPostObj());
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

AddAssignmentController.$inject = ['$http', '$filter', 'Enums', 'Alert', 'User'];
export default AddAssignmentController;
