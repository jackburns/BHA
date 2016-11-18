class HomeController {
  constructor($scope, $state, $uibModal, $http, User, Requests) {
    $scope.friendEmail = ''

    this.userService = User;
    Requests.getUserAssignments(this.userService.getUser().id).then((res) => {
      this.assignments = res.data;
    });

    this.sendReferral = () => {
      let friendEmail = $scope.friendEmail

      if (friendEmail !== '' && $scope.referral.$valid) {
        Requests.sendReferral(friendEmail)
      }
    }
  }
}

HomeController.$inject = ["$scope", "$state", "$uibModal", "$http", "User", "Requests"];

export default HomeController;
