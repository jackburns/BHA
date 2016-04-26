class HomeController {
  constructor($state, $uibModal, $http, User, Requests) {
    this.user = User.getUser();
    Requests.getUserAssignments(this.user.id).then((res) => {
      this.assignments = res.data;
    });
  }
}

HomeController.$inject = ["$state", "$uibModal", "$http", "User", "Requests"];

export default HomeController;
