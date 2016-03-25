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
    this.num_avails = 1;
    this.submitted = false;
    this.sent = false;
    
    // initial info object
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
	av: [{
	    d: "",
	    s: "",
	    e: "",
	    val: false
	}, {
	    d: "",
	    s: "",
	    e: "",
	    val: false
	}, {
	    d: "",
	    s: "",
	    e: "",
	    val: false
	}, {
	    d: "",
	    s: "",
	    e: "",
	    val: false
	}, {
	    d: "",
	    s: "",
	    e: "",
	    val: false
	}],
	notes: ""
    };
    
    // defaults/dropdown values
    this.contacts = ["Phone", "Email", "Text"];
    this.info.contact = "Phone";
    this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.times = ["9:00AM", "9:30AM", "10:00AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM", 
                  "1:00PM", "1:30PM", "2:00PM", "2:30PM", "3:00PM", "4:00PM", "4:30PM", "5:00PM"];
		  
    // check if availability is valid, set availabilities validity
    this.availf = function() {
      var ret = true;
      for (var i = 0; i < 5; i++) {
        var cur = this.info.av[i];
        if ((cur.d == "" || cur.s == "" || cur.e == "" ||
	    this.times.indexOf(cur.s) >= this.times.indexOf(cur.e)) &&
	    i < this.num_avails) {
	  cur.val = false;
          ret = false;	  
	} else {
	  cur.val = true;
	}
      }
      
      return ret;
    }
    
    // given that angular validated the form,
    // is the custom validation in order?
    this.form_valid = function(ang_valid) {
      this.all_valid = ang_valid && this.zip_valid && this.phone_valid && this.avail_valid && !this.no_lang;
      return this.all_valid;
    }

    // on submit
    this.update = function(ang_valid) {
      // check custom validations
      this.zip_valid = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.info.zip);
      this.phone_valid = this.info.phone.length == 10;
      this.no_lang = this.info.lang1.name == "";
      this.avail_valid = this.availf();
      
      this.submitted = true;
      
      // if good to go, send it off
      if (this.form_valid(ang_valid)) {
        this.sent = true;
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
