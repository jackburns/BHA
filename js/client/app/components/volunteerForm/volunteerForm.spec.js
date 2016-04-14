import VolunteerFormModule from './volunteerForm'
import VolunteerFormController from './volunteerForm.controller';
import VolunteerFormComponent from './volunteerForm.component';
import VolunteerFormTemplate from './volunteerForm.html';
import Enums from '../../common/enums/enums';

describe('VolunteerForm', () => {
  let $rootScope, $http, makeController;

  beforeEach(window.module(VolunteerFormModule.name));
  beforeEach(inject((_$rootScope_, _$http_) => {
    $rootScope = _$rootScope_;
    $http = _$http_;
    makeController = () => {
      return new VolunteerFormController($http, Enums);
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('sets the isValid flag for every availability', () => {
      let ctrl = makeController();
      ctrl.validateAvailabilities();
      expect(ctrl.info.availability[0].isValid).to.be.false;
      ctrl.info.availability[0].day = 'Wednesday';
      ctrl.validateAvailabilities();
      expect(ctrl.info.availability[0].isValid).to.be.false;
      ctrl.info.availability[0].start_time = '10:30AM';
      ctrl.validateAvailabilities();
      expect(ctrl.info.availability[0].isValid).to.be.false;
      ctrl.info.availability[0].end_time = '10:30AM';
      ctrl.validateAvailabilities();
      expect(ctrl.info.availability[0].isValid).to.be.false;
      ctrl.info.availability[0].end_time = '2:30PM';
      ctrl.info.availability.push({day: 'Sunday', start_time: '2:00PM', end_time: '4:00PM'});
      ctrl.validateAvailabilities();
      expect(ctrl.info.availability[0].isValid).to.be.true;
      expect(ctrl.info.availability[1].isValid).to.be.true;
    });

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
      ctrl.validateForm(true);
      expect(ctrl.allValid).to.be.true;
    });

    it('returns an appropriate error for invalid passwords', () => {
      let ctrl = makeController();
      expect(ctrl.getPasswordError('t')).to.be.equal('Password needs to be at least 8 characters');
      expect(ctrl.getPasswordError('sevench')).to.be.equal('Password needs to be at least 8 characters');
      expect(ctrl.getPasswordError('this password is essentially a short novel who could remember this')).to.be.equal(
        'Password need to be less than 50 characters');
      expect(ctrl.getPasswordError('nodigits')).to.be.equal('Password needs at least one number');
      expect(ctrl.getPasswordError('1234567890')).to.be.equal('Password needs at least one letter');
      expect(ctrl.getPasswordError('greatpassword123')).to.be.equal('');
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
