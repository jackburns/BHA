class LanguageSelectController {
  constructor(Enums) {
    function sortedLanguages() {
      var sortedLanguageObjects = _.map(_.keys(Enums.languages), (languageKey) => {
        return {
          'key': languageKey,
          'name': Enums.languages[languageKey]
        };
      });
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
