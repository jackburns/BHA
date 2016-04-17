class LanguageEditController {
  constructor(Enums) {

    this.selectOptions = Enums;

    let createBlankLanguage = function() {
      return {
        language_name: "",
        can_written_translate: false
      }
    };

    this.addNewLanguage = function () {
      this.languages.push(createBlankLanguage());
    };

    this.removeLastLanguage = function() {
      this.languages.pop();
    };

    if(this.languages.length === 0) {
      this.addNewLanguage();
    }
  }
}

LanguageEditController.$inject = ['Enums'];
export default LanguageEditController;
