import _ from 'lodash';

class VolunteerFormController {
  constructor($http) {

    this.selectOptions = {
      contactMethods: ["Phone", "Email", "Text"],
      daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      availabilityTimes: ["9:00AM", "9:30AM", "10:00AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM",
        "1:00PM", "1:30PM", "2:00PM", "2:30PM", "3:00PM", "3:30PM", "4:00PM", "4:30PM", "5:00PM"]
    };

    this.name = 'Volunteer Application Form';
    this.allValid = false;
    this.zip_valid = false;
    this.phone_valid = false;
    this.validLanguages = false;
    this.validAvailabilities = false;
    this.submitted = false;

    let createBlankAvailability = function() {
      return {
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        isValid: false
      };
    };

    let createBlankLanguage = function() {
      return {
        name: "",
        willTranslate: false
      }
    };

    // initial info object
    this.info = {
      firstName: "",
      lastName: "",
      middleInitial: "",
      affiliation: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      phone: "",
      contactMethod: "Phone",
      languages: [createBlankLanguage()],
      bha_app_res: false,
      availabilities: [createBlankAvailability()],
      notes: ""
    };

    this.validateAvailabilities = function() {
      _.each(this.info.availabilities, function(av) {
        av.isValid = (av.dayOfWeek !== "" && av.startTime !== "" && av.endTime !== "" &&
          this.selectOptions.availabilityTimes.indexOf(av.startTime) < this.selectOptions.availabilityTimes.indexOf(av.endTime));
      }.bind(this));
    };

    this.validateForm = function(ang_valid) {
      this.allValid = ang_valid && this.zip_valid && this.phone_valid && this.validAvailabilities;
    };

    this.addNewLanguage = function () {
      this.info.languages.push(createBlankLanguage());
    };

    this.removeLastLanguage = function() {
      this.info.languages.pop();
    };

    this.addNewAvailability = function() {
      this.info.availabilities.push(createBlankAvailability());
    };

    this.removeLastAvailability = function() {
      this.info.availabilities.pop();
    };

    // on submit
    this.submit = function(ang_valid) {
      // check custom validations
      this.submitted = true;
      this.zip_valid = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.info.zip);
      this.phone_valid = this.info.phone.length == 10;
      this.validLanguages = _.every(this.info.languages, 'name');
      this.validateAvailabilities();
      this.validAvailabilities = _.every(this.info.availabilities, 'isValid');
      this.validateForm(ang_valid);

      if (this.allValid) {
        return true;
        /*
         $http.post('/volunteerApp', this.info).then(
         //success
         function (response) {
         console.log("good");
         },

         //failure
         function (response) {
         console.log("bad");
         });*/
      } else {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
    };
  }
}

VolunteerFormController.$inject = ['$http'];
export default VolunteerFormController;
