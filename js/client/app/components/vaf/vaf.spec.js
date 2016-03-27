import VafModule from './vaf'
import VafController from './vaf.controller';
import VafComponent from './vaf.component';
import VafTemplate from './vaf.html';

describe('Vaf', () => {
  let $rootScope, makeController;

  beforeEach(window.module(VafModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new VafController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('contact select is initially set to Phone', () => {
      let controller = makeController();
      expect(controller.info.contact).to.equal("Phone");
    });
    
    it('click submit -> API call', () => {
      let controller = makeController();
      expect(controller.submitted).to.equal(false);
      controller.update();
      expect(controller.submitted).to.equal(true);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = VafComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(VafTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(VafController);
      });
  });
});
