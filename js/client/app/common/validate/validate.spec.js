import ValidateModule from './validate'
import ValidateService from './validate.service';

describe('Validate', () => {
  beforeEach(() => {
    window.module(ValidateModule.name);
    window.module(($provide) => {
      $provide.service('Enums', () => {
        return {
          arrays: {
            availability_times: ['10:00:00', '10:30:00', '11:00:00']
          }
        }
      });
    });
  });

  let validate;
  beforeEach(inject((_Validate_) => {
    validate=_Validate_;
  }));

  describe('ValidateService', () => {
    it('returns an appropriate error for invalid passwords', () => {
      expect(validate.password('t')).to.be.equal('Password needs to be at least 8 characters');
      expect(validate.password('sevench')).to.be.equal('Password needs to be at least 8 characters');
      expect(validate.password('this password is essentially a short novel who could remember this')).to.be.equal(
        'Password need to be less than 50 characters');
      expect(validate.password('nodigits')).to.be.equal('Password needs at least one number');
      expect(validate.password('1234567890')).to.be.equal('Password needs at least one letter');
      expect(validate.password('greatpassword123')).to.be.equal('');
    });

    it('sets the isValid flag for every availability', () => {
      let availability = [{}];
      validate.availability(availability);
      expect(availability[0].isValid).to.be.false;

      availability[0].day = 'Wednesday';
      validate.availability(availability);
      expect(availability[0].isValid).to.be.false;

      availability[0].start_time = '10:00:00';
      validate.availability(availability);
      expect(availability[0].isValid).to.be.false;

      availability[0].end_time = '10:00:00';
      validate.availability(availability);
      expect(availability[0].isValid).to.be.false;

      availability[0].end_time = '11:00:00';
      availability.push({
        day: 'Sunday',
        start_time: '10:00:00',
        end_time: '10:30:00'
      });
      validate.availability(availability);
      expect(availability[0].isValid).to.be.true;
      expect(availability[1].isValid).to.be.true;
    });

    it('determines whether a phone number is valid or not', () => {
      expect(validate.phoneNumber('123456789')).to.be.false;
      expect(validate.phoneNumber('2234567890')).to.be.true;
      expect(validate.phoneNumber('123')).to.be.false;
      expect(validate.phoneNumber('11234567890')).to.be.false;
    });

    it('determines whether a zip code is valid or not', () => {
      expect(validate.zip('123456789')).to.be.false;
      expect(validate.zip('12345')).to.be.true;
      expect(validate.zip('1234')).to.be.false;
      expect(validate.zip('12345-6789')).to.be.true;
      expect(validate.zip('11234567890')).to.be.false;
    });
  });
});
