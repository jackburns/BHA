import _ from 'lodash';

class VolunteerFormController {
  constructor($http, Enums, $state, Alert, Validate) {

    this.selectOptions = Enums;

    this.name = 'Volunteer Application Form';
    this.allValid = false;
    this.zip_valid = false;
    this.phone_valid = false;
    this.validLanguages = false;
    this.validAvailabilities = false;
    this.submitted = false;
    this.passwordError = "";

    // initial info object
    this.info = {
      password: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      organization: "",
      age: "",
      contact: {
        street: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        phone_number: "",
        carrier: "0",
        preferred_contact: "0"
      },
      languages: [],
      bha_app_res: false,
      availability: [],
      notes: ""
    };

    this.validateForm = function(ang_valid) {
      this.allValid = ang_valid
      && this.zip_valid
      && this.phone_valid
      && this.validAvailabilities
      && this.ageValid
      && this.carrierValid
      && this.passwordError.length == 0;
    };

    // on submit
    this.submit = function(ang_valid) {
      // check custom validations
      this.submitted = true;
      this.zip_valid = Validate.zip(this.info.contact.zip);
      this.phone_valid = Validate.phoneNumber(this.info.contact.phone_number);
      this.validLanguages = this.info.languages[0].language_name.length > 0;
      this.info.availability = Validate.availability(this.info.availability);
      this.validAvailabilities = _.every(this.info.availability, 'isValid');
      this.passwordError = Validate.password(this.info.password);
      this.carrierValid = Validate.carrier(this.info.contact.preferred_contact, this.info.contact.carrier);
      this.ageValid = _.isInteger(this.info.age) && this.info.age > 0;
      this.validateForm(ang_valid);

      if (this.allValid) {
        $http.post(api + '/volunteers/', this.info).then((res) => {
          Alert.add('success', 'Account successfully created');
          $state.go('login');
          }, (error) => {
            Alert.add('danger', 'Could not create your account');
          }
        );
      } else {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
    };
  }
}

VolunteerFormController.$inject = ['$http', 'Enums', '$state', 'Alert', 'Validate'];
export default VolunteerFormController;
