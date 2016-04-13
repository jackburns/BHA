import ResetPasswordModule from './resetPassword'
import ResetPasswordController from './resetPassword.controller';
import ResetPasswordComponent from './resetPassword.component';
import ResetPasswordTemplate from './resetPassword.html';

describe('ResetPassword', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ResetPasswordModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ResetPasswordController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Component', () => {
      // component/directive specs
      let component = ResetPasswordComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ResetPasswordTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ResetPasswordController);
      });
  });
});
