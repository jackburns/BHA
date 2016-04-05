import _ from 'lodash';

class AssignmentController {
  constructor(Enums) {

    let makeAssignment = (name, status, language, startDate, volunteers) => {
      return {
        name: name,
        status: status,
        language: language,
        startDate: startDate,
        volunteers: volunteers
      }
    };

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

    this.futureAssignments = [
      makeAssignment('assn1', 'valid', 'es', '4/4/16', []),
      makeAssignment('assn2', 'valid', 'fr', '4/6/16', [2, 3]),
      makeAssignment('assn3', 'valid', 'ja', '5/1/16', [1]),
      makeAssignment('assignment in the far future', 'valid', 'ca', '6/8/17', []),
      makeAssignment('assignment in the very far future', 'valid', 'ja', '9/3/19', [6])
    ];

  }
}

AssignmentController.$inject = ['Enums'];
export default AssignmentController;
