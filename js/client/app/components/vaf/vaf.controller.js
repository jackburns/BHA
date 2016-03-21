class VafController {
  constructor() {
    this.name = 'Volunteer Application Form';
    this.info = {};
    this.contacts = ["Phone", "Email", "Text"];
    this.info.contact = "Phone";
    this.update = function() { console.log(this.info); };
  }
}

export default VafController;
