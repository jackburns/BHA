class HomeController {
  constructor($state, $uibModal, $http, User, AssignmentsAPI) {
    this.user = User.getUser();
    AssignmentsAPI.getUserAssignments(this.user.id).then((res) => {
      this.assignments = res.data;
    });
  }
}

HomeController.$inject = ["$state", "$uibModal", "$http", "User", "AssignmentsAPI"];

export default HomeController;
