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
    it('sets the isValid flag for every availability', () => {
      let ctrl = makeController();
      ctrl.validateAvailabilities();
      expect(ctrl.info.availabilities[0].isValid).to.be.false;
      ctrl.info.availabilities[0].dayOfWeek = 'Wednesday';
      ctrl.validateAvailabilities();
      expect(ctrl.info.availabilities[0].isValid).to.be.false;
      ctrl.info.availabilities[0].startTime = '10:30AM';
      ctrl.validateAvailabilities();
      expect(ctrl.info.availabilities[0].isValid).to.be.false;
      ctrl.info.availabilities[0].endTime = '10:30AM';
      ctrl.validateAvailabilities();
      expect(ctrl.info.availabilities[0].isValid).to.be.false;
      ctrl.info.availabilities[0].endTime = '2:30PM';
      ctrl.info.availabilities.push({dayOfWeek: 'Sunday', startTime: '2:00PM', endTime: '4:00PM'});
      ctrl.validateAvailabilities();
      expect(ctrl.info.availabilities[0].isValid).to.be.true;
      expect(ctrl.info.availabilities[1].isValid).to.be.true;
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

    it('adds a new blank language', () => {
      let ctrl = makeController();
      expect(ctrl.info.languages).to.have.length(1);
      ctrl.addNewLanguage();
      expect(ctrl.info.languages).to.have.length(2);
      expect(ctrl.info.languages[1])
    });

    it('removes the last language', () => {
      let ctrl = makeController();
      expect(ctrl.info.languages).to.have.length(1);
      ctrl.removeLastLanguage();
      expect(ctrl.info.languages).to.have.length(0);
      ctrl.removeLastLanguage();
      expect(ctrl.info.languages).to.have.length(0);
    });

    it('adds a new blank availability', () => {
      let ctrl = makeController();
      expect(ctrl.info.languages).to.have.length(1);
      ctrl.addNewAvailability();
      expect(ctrl.info.availabilities).to.have.length(2);
      expect(ctrl.info.availabilities[1].dayOfWeek).to.equal("");
      expect(ctrl.info.availabilities[1].startTime).to.equal("");
      expect(ctrl.info.availabilities[1].endTime).to.equal("");
      expect(ctrl.info.availabilities[1].isValid).to.be.false;
    });

    it('removes the last availability', () => {
      let ctrl = makeController();
      expect(ctrl.info.availabilities).to.have.length(1);
      ctrl.removeLastAvailability()
      expect(ctrl.info.availabilities).to.have.length(0);
      ctrl.removeLastAvailability()
      expect(ctrl.info.availabilities).to.have.length(0);
    });

    it('contact select is initially set to Phone', () => {
      let ctrl = makeController();
      expect(ctrl.info.contactMethod).to.equal("Phone");
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
