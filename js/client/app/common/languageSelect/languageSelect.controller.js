class LanguageSelectController {
  constructor(Enums) {
    function sortedLanguages() {
      var sortedLanguageObjects = Enums.arrays.languages;
      // Sorts language objects by language name
      sortedLanguageObjects.sort((a, b) => { return a.name.toLowerCase().localeCompare(b.name.toLowerCase()); });
      return sortedLanguageObjects;
    }

    this.startsWithComparator = (actual, expected) => {
      return actual.toLowerCase().indexOf(expected.toLowerCase()) === 0;
    };

    this.allLanguages = sortedLanguages();

  }
}

LanguageSelectController.$inject = ['Enums'];
export default LanguageSelectController;
