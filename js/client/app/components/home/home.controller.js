class HomeController {
  constructor(User) {
    this.user = User;
  }
}

HomeController.$inject = ["User"];

export default HomeController;
