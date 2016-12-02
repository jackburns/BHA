import VolunteerFormModule from './volunteerForm'
import VolunteerFormController from './volunteerForm.controller';
import VolunteerFormComponent from './volunteerForm.component';
import VolunteerFormTemplate from './volunteerForm.html';
import Validate from '../../common/validate/validate.service'
import Enums from '../../common/enums/enums.service'

describe('VolunteerForm', () => {
  let $rootScope, $componentController, $http, makeController, scope, mockValidate;

  beforeEach(window.module(VolunteerFormModule.name));
  beforeEach(window.module('ngMock'));

  beforeEach(() => {
    let mockEnums = {};
    let mockAlert = {};
    mockValidate = Validate(Enums());
    window.module(($provide) => {
      $provide.value('Enums', mockEnums);
      $provide.value('Validate', mockValidate);
      $provide.value('Alert', mockAlert);
    });
  });

  beforeEach(inject((_$rootScope_, _$http_, _$componentController_) => {
    $rootScope = _$rootScope_;
    $http = _$http_;
    scope = $rootScope.$new();
    $componentController = _$componentController_;
    makeController = () => {
      return $componentController(VolunteerFormModule.name, {$scope: scope, Validate: mockValidate}, $http);
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('sets allValid according to if all form entries are valid', () => {
      let ctrl = makeController();
      ctrl.validateForm(false);
      expect(ctrl.allValid).to.be.false;
      ctrl.zip_valid = true;
      ctrl.validateForm(false);
      expect(ctrl.allValid).to.be.false;
      ctrl.phone_valid = true;
      ctrl.validateForm(false);
      expect(ctrl.allValid).to.be.false;
      ctrl.validAvailabilities = true;
      ctrl.validateForm(false);
      expect(ctrl.allValid).to.be.false;
      ctrl.carrierValid = true;
      ctrl.ageValid = false;
      expect(ctrl.allValid).to.be.false;
      ctrl.ageValid = true;
      ctrl.validateForm(true);
      expect(ctrl.allValid).to.be.true;
    });

    it('should test for valid form entries', () => {
      let ctrl = makeController();
      ctrl.validateForm(false);
      expect(ctrl.allValid).to.be.false;

      // zip
      ctrl.info.zip = 0;
      ctrl.zip_valid = false;
      ctrl.validateForm(false)
      expect(ctrl.allValid).to.be.false;

      // phone
      ctrl.info.contact.phone_number = 092309233;
      ctrl.phone_valid = false;
      ctrl.validateForm(false);
      expect(ctrl.allValid).to.be.false;
      
      // avaliablity
      ctrl.info.avaliablity = [];
      ctrl.validAvailabilities = false;
      ctrl.validateForm(false);
      expect(ctrl.allValid).to.be.false;
    });


    it('contact select is initially set to 0 for email', () => {
      let ctrl = makeController();
      expect(ctrl.info.contact.preferred_contact).to.equal('0');
    });

    it('click submit -> API call', () => {
      let ctrl = makeController();
      expect(ctrl.submitted).to.be.false;
      ctrl.submit();
      expect(ctrl.submitted).to.be.true;
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = VolunteerFormComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(VolunteerFormTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(VolunteerFormController);
      });
  });
});
