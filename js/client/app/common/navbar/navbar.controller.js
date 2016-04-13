class NavbarController {
  constructor(User) {
    "ngInject";
    this.name = 'navbar';
    this.user = User;
    this.navCollapsed = true;

  }
}

NavbarController.$inject = ['User'];
export default NavbarController;
