import ValidateModule from './validate'
import ValidateService from './validate.service';
import Enums from '../enums/enums.service'
let enums = Enums();

describe('Validate', () => {
  let $rootScope, $componentController, makeService, scope;

  beforeEach(window.module(ValidateModule.name));
  beforeEach(window.module('ngMock'));

  beforeEach(() => {
    let mockEnums = {};

    window.module(($provide) => {
      $provide.value('Enums', mockEnums);
    });
  });

  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    makeService = () => {
      return ValidateService(ValidateModule.name, {$scope: scope});
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('returns an appropriate error for invalid passwords', () => {
      let ctrl = makeService();
      expect(ctrl.password('t')).to.be.equal('Password needs to be at least 8 characters');
      expect(ctrl.password('sevench')).to.be.equal('Password needs to be at least 8 characters');
      expect(ctrl.password('this password is essentially a short novel who could remember this')).to.be.equal(
        'Password need to be less than 50 characters');
      expect(ctrl.password('nodigits')).to.be.equal('Password needs at least one number');
      expect(ctrl.password('1234567890')).to.be.equal('Password needs at least one letter');
      expect(ctrl.password('greatpassword123')).to.be.equal('');
    });

    it('sets the isValid flag for every availability', () => {
      let ctrl = makeService();
      let availability = [{}];
      ctrl.availability(availability)
      expect(availabilities.isValid).to.be.false;

      availability[0].day = 'Wednesday';
      ctrl.availability(availability);
      expect(availability[0].isValid).to.be.false;

      availability[0].start_time = '10:30AM';
      ctrl.availability(availability);
      expect(availability[0].isValid).to.be.false;

      availability[0].end_time = '10:30AM';
      ctrl.availability(availability);
      expect(availability[0].isValid).to.be.false;

      availability[0].end_time = '2:30PM';
      availability.push({day: 'Sunday', start_time: '2:00PM', end_time: '4:00PM'});
      ctrl.availability(availability);
      expect(availability[0].isValid).to.be.true;
      expect(availability[1].isValid).to.be.true;
    });

    it('determines whether a phone number is valid or not', () => {
      let ctrl = makeService();
      expect(ctrl.phoneNumber('123456789')).to.be.false;
      expect(ctrl.phoneNumber('1234567890')).to.be.true;
      expect(ctrl.phoneNumber('123')).to.be.false;
      expect(ctrl.phoneNumber('11234567890')).to.be.false;
    });

    it('determines whether a zip code is valid or not', () => {
      let ctrl = makeService();
      expect(ctrl.zip('123456789')).to.be.false;
      expect(ctrl.zip('12345')).to.be.true;
      expect(ctrl.zip('1234')).to.be.false;
      expect(ctrl.zip('12345-6789')).to.be.true;
      expect(ctrl.zip('11234567890')).to.be.false;
    });
  });
});
