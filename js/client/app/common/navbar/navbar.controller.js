class NavbarController {
  constructor(User, Restangular) {
    "ngInject";
    this.name = 'navbar';
    this.user = User;
    this.navCollapsed = true;
    let volunteers = Restangular.all('volunteers');
    console.log(volunteers.getList());
  }
}

NavbarController.$inject = ['User', 'Restangular'];
export default NavbarController;
