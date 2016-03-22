class VafController {
  constructor() {
    this.submitted = false;
    this.name = 'Volunteer Application Form';
    this.info = {};
    this.contacts = ["Phone", "Email", "Text"];
    this.info.contact = "Phone";
    this.update = function() {
      this.submitted = true;
      console.log(this.info);
    };
  }
}

export default VafController;
