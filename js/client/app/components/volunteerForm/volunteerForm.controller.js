import _ from 'lodash';

class VolunteerFormController {
  constructor($http, Enums, $uibModal, $scope) {

    this.selectOptions = Enums;
    this.selectOptions.availabilityTimes = ["9:00AM", "9:30AM", "10:00AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM",
        "1:00PM", "1:30PM", "2:00PM", "2:30PM", "3:00PM", "3:30PM", "4:00PM", "4:30PM", "5:00PM"];

    this.name = 'Volunteer Application Form';
    this.allValid = false;
    this.zip_valid = false;
    this.phone_valid = false;
    this.validLanguages = false;
    this.validAvailabilities = false;
    this.submitted = false;
    this.passwordError = "";

    this.something = {
  "user": {
    "password": "amarantos202",
    "username": "something@something.com"
  },
  "first_name": "Jack",
  "last_name": "Burns",
  "middle_name": "D",
  "affiliation": "",
  "contact": {
    "street": "something",
    "city": "something",
    "state": "ca",
    "zip": "02115",
    "email": "something@something.com",
    "phone_number": "7608462863",
    "carrier": "18",
    "preferred_contact": "0"
  },
  "languages": [
    {
      "language_name": "ar",
      "can_written_translate": true
    }
  ],
  "bha_app_res": false,
  "availability": [
    {
      "day": "1",
      "start_time": "10:00AM",
      "end_time": "11:30AM",
      "isValid": true
    }
  ],
  "notes": ""
}

$http.post(api + '/volunteers/', this.something).then((res) =>{
  console.log(res);
});



    let createBlankAvailability = function() {
      return {
        day: "",
        start_time: "",
        end_time: "",
        isValid: false
      };
    };

    let createBlankLanguage = function() {
      return {
        language_name: "",
        can_written_translate: false
      }
    };

    // initial info object
    this.info = {
      user: {
        password: "",
      },
      first_name: "",
      last_name: "",
      middle_name: "",
      affiliation: "",
      contact: {
        street: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        phone_number: "",
        carrier: "18",
        preferred_contact: "0"
      },
      languages: [createBlankLanguage()],
      bha_app_res: false,
      availability: [createBlankAvailability()],
      notes: ""
    };

    this.validateAvailabilities = function() {
      _.each(this.info.availability, function(av) {
        av.isValid = (av.day !== "" && av.start_time !== "" && av.end_time !== "" &&
          this.selectOptions.availabilityTimes.indexOf(av.start_time) < this.selectOptions.availabilityTimes.indexOf(av.end_time));
      }.bind(this));
    };

    this.validateForm = function(ang_valid) {
      this.allValid = ang_valid && this.zip_valid && this.phone_valid && this.validAvailabilities && this.passwordError.length == 0;
    };

    this.addNewLanguage = function () {
      this.info.languages.push(createBlankLanguage());
    };

    this.removeLastLanguage = function() {
      this.info.languages.pop();
    };

    this.addNewAvailability = function() {
      this.info.availability.push(createBlankAvailability());
    };

    this.removeLastAvailability = function() {
      this.info.availability.pop();
    };

    this.validatePassword = function(password) {
      if (password.length < 8) {
        this.passwordError = "Password needs to be at least 8 characters";
      } else if (password.length > 50) {
        this.passwordError = "Password need to be less than 50 characters";
      } else if (password.search(/\d/) == -1) {
        this.passwordError = "Password needs at least one number"
      } else if (password.search(/[a-zA-Z]/) == -1) {
        this.passwordError = "Password needs at least one letter"
      }
    }

    // on submit
    this.submit = function(ang_valid) {
      // check custom validations
      this.submitted = true;
      this.zip_valid = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.info.contact.zip);
      this.phone_valid = this.info.contact.phone_number.length == 10;
      this.validLanguages = this.info.languages[0].language_name.length > 0
      this.validateAvailabilities();
      this.validAvailabilities = _.every(this.info.availability, 'isValid');
      this.validatePassword(this.info.user.password);
      this.validateForm(ang_valid);
      if (this.passwordError.length > 0) {

      }

      if (this.allValid) {
        // brilliant
        this.info.user.username = this.info.email;
        console.log(this.info);
        $http.post(api + '/volunteers/', this.info).then((res) =>{
          console.log(res);
        });
      } else {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
    };
  }
}

VolunteerFormController.$inject = ['$http', 'Enums', '$uibModal', '$scope'];
export default VolunteerFormController;
