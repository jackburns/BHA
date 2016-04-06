import _ from 'lodash';

class AssignmentController {
  constructor() {

    let makeAssignment = (name, status, language, startDate, volunteers) => {
      return {
        name: name,
        status: status,
        language: language,
        startDate: startDate,
        volunteers: volunteers
      }
    };

    this.futureAssignments = [
      makeAssignment('assn1', 'valid', 'es', '4/4/16', []),
      makeAssignment('assn2', 'valid', 'fr', '4/6/16', [2, 3]),
      makeAssignment('assn3', 'valid', 'ja', '5/1/16', [1]),
      makeAssignment('assignment in the far future', 'valid', 'ca', '6/8/17', []),
      makeAssignment('assignment in the very far future', 'valid', 'ja', '9/3/19', [6])
    ];

  }
}

export default AssignmentController;
