import _ from 'lodash';

class VafController {
  constructor($http) {
    // initial validation settings
    this.name = 'Volunteer Application Form';
    this.all_valid = false;
    this.zip_valid = false;
    this.phone_valid = false;
    this.avail_valid = false;
    this.no_lang = true;
    this.num_langs = 1;
    this.submitted = false;

    let create_blank_availability = function() {
      return {
        dayOfWeek: "",
          startTime: "",
        endTime: "",
        val: false
      };
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
      contact: "Phone",
      lang1: {
        name: "",
        sp_prof: 1,
        wr: false
      },
      lang2: {
        name: "",
        sp_prof: 1,
        wr: false
      },
      lang3: {
        name: "",
        sp_prof: 1,
        wr: false
      },
      lang4: {
        name: "",
        sp_prof: 1,
        wr: false
      },
      lang5: {
        name: "",
        sp_prof: 1,
        wr: false
      },
      bha_app_res: false,
      availabilities: [create_blank_availability()],
      notes: ""
    };

    // defaults/dropdown values
    this.contacts = ["Phone", "Email", "Text"];
    this.info.contact = "Phone";
    this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.times = ["9:00AM", "9:30AM", "10:00AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM",
      "1:00PM", "1:30PM", "2:00PM", "2:30PM", "3:00PM", "3:30PM", "4:00PM", "4:30PM", "5:00PM"];

    this.setValidities = function() {
      _.each(this.info.availabilities, function(av) {
        av.val = (av.dayOfWeek !== "" && av.startTime !== "" && av.endTime !== "" &&
          this.times.indexOf(av.startTime) < this.times.indexOf(av.endTime));
      }, this);
    };

    // given that angular validated the form,
    // is the custom validation in order?
    this.setFormValidity = function(ang_valid) {
      this.all_valid = ang_valid && this.zip_valid && this.phone_valid && this.avail_valid && !this.no_lang;
    };

    this.removeLastAvailability = function() {
      if (this.info.availabilities.length > 0) {
        this.info.availabilities.pop();
      }
    };

    this.addNewAvailability = function() {
      this.info.availabilities.push(create_blank_availability());
    };

    // on submit
    this.update = function(ang_valid) {
      // check custom validations
      this.zip_valid = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.info.zip);
      this.phone_valid = this.info.phone.length == 10;
      this.no_lang = this.info.lang1.name == "";

      this.submitted = true;
      this.setValidities();
      this.avail_valid = _.every(this.info.availabilities, 'val');
      this.setFormValidity(ang_valid);

      if (this.all_valid) {
        console.log(this.info);
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

VafController.$inject = ['$http'];
export default VafController;
