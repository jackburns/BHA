let AssignmentsService = function ($http, $state, $localStorage, Alert) {

  let getUserAssignments = (user_id) => {
    return $http.get(api + '/volunteers/' + user_id + '/assignments/');
  }


  return { getUserAssignments };
};

AssignmentsService.$inject = ['$http', '$state', '$localStorage', 'Alert'];
export default AssignmentsService;
