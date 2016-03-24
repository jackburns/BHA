class VafController {
  constructor($http) {
    this.zip_valid = false;
    this.no_avail = true;
    this.submitted = false;
    this.name = 'Volunteer Application Form';
    this.info = {
        fname: "",
	lname: "",
	mi: "",
	affl: "",
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
	avails: {
	    av_sun_am: false,
	    av_mon_am: false,
	    av_tue_am: false,
	    av_wed_am: false,
	    av_thu_am: false,
	    av_fri_am: false,
	    av_sat_am: false,
	    av_sun_pm: false,
	    av_mon_pm: false,
	    av_tue_pm: false,
	    av_wed_pm: false,
	    av_thu_pm: false,
	    av_fri_pm: false,
	    av_sat_pm: false,
	},
	notes: ""
    };
    
    this.contacts = ["Phone", "Email", "Text"];
    this.profs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.info.contact = "Phone";
    
    this.form_valid = function() {
      return false;
    }
    
    this.no_availf = function() {
      for (var property in this.info.avails) {
        if (this.info.avails.hasOwnProperty(property) && this.info.avails[property]) {
	  return false;
	}
      }
      
      return true;
    }
 
    this.update = function(ang_valid) {
      this.zip_valid = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.info.zip);
      this.no_lang = this.info.lang1.name == "";
      this.no_avail = this.no_availf();
      console.log(this.no_avail);
      console.log(ang_valid);
      this.submitted = true;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      console.log(this.info.lang1.name);
      if (ang_valid && this.form_valid()) {
        $http.post('/volunteerApp', this.info).then(
	  //success
	  function (response) {
	    console.log("good");
	  },
	  
	  //failure
	  function (response) {
	    console.log("bad");
	  });
      }
    };
  }
}

VafController.$inject = ['$http'];
export default VafController;
