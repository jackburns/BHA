class NavbarController {
  constructor(User) {
    "ngInject";
    this.name = 'navbar';
    this.user = User;
  }
}

NavbarController.$inject = ['User'];
export default NavbarController;
