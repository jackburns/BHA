class NavbarController {
  constructor(User, $state) {
    "ngInject";
    this.name = 'navbar';
    this.user = User;
    this.navCollapsed = true;
    this.viewProfile = () => {
      let volunteer = this.user.getUser();
      $state.go('volunteer', {
        volunteerId: volunteer.user.id,
        volunteer: volunteer});
    }
  }
}

NavbarController.$inject = ['User', '$state'];
export default NavbarController;
