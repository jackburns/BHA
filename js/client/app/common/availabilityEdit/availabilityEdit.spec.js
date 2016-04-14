import AvailabilityEditModule from './availabilityEdit'
import AvailabilityEditController from './availabilityEdit.controller';
import AvailabilityEditComponent from './availabilityEdit.component';
import AvailabilityEditTemplate from './availabilityEdit.html';
import Enums from '../enums/enums';

describe('AvailabilityEdit', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AvailabilityEditModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AvailabilityEditController(Enums);
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('adds a new blank availability', () => {
      let ctrl = makeController();
      expect(ctrl.availability).to.have.length(1);
      ctrl.addNewAvailability();
      expect(ctrl.availability).to.have.length(2);
      expect(ctrl.availability[1].day).to.equal("");
      expect(ctrl.availability[1].start_time).to.equal("");
      expect(ctrl.availability[1].end_time).to.equal("");
      expect(ctrl.availability[1].isValid).to.be.false;
    });

    it('removes the last availability', () => {
      let ctrl = makeController();
      expect(ctrl.availability).to.have.length(1);
      ctrl.removeLastAvailability()
      expect(ctrl.availability).to.have.length(0);
      ctrl.removeLastAvailability()
      expect(ctrl.availability).to.have.length(0);
    });
  });

  describe('Template', () => {
  });

  describe('Component', () => {
      // component/directive specs
      let component = AvailabilityEditComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AvailabilityEditTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AvailabilityEditController);
      });
  });
});
