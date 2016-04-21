import AvailabilityEditModule from './availabilityEdit'
import AvailabilityEditController from './availabilityEdit.controller';
import AvailabilityEditComponent from './availabilityEdit.component';
import AvailabilityEditTemplate from './availabilityEdit.html';

describe('AvailabilityEdit', () => {
  let $rootScope, $componentController, makeController, scope;

  beforeEach(window.module(AvailabilityEditModule.name));
  beforeEach(window.module('ngMock'));

  beforeEach(() => {
    let mockEnums = {
      arrays: {
        days: ['Monday', 'Tuesday']
      }
    };
    window.module(($provide) => {
      $provide.value('Enums', mockEnums);
    });
  });

  beforeEach(inject((_$rootScope_, _$componentController_) => {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $componentController = _$componentController_;
    let availability = [{day: 'Monday', start_time: '1:00PM', end_time: '5:00PM', isValid: true}];
    makeController = () => {
      return $componentController(AvailabilityEditModule.name, {$scope: scope}, {availability: availability});
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
      expect(ctrl.availability[1].day).to.equal("0");
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
