class HomeController {
  constructor($state, $uibModal, $http, User, Requests) {
    this.userService = User;
    Requests.getUserAssignments(this.userService.getUser().id).then((res) => {
      this.assignments = res.data;
    });
  }
}

HomeController.$inject = ["$state", "$uibModal", "$http", "User", "Requests"];

export default HomeController;
