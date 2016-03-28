import VolunteerModule from './volunteer'
import VolunteerController from './volunteer.controller';
import VolunteerComponent from './volunteer.component';
import VolunteerTemplate from './volunteer.html';
import _ from 'lodash';

describe('Volunteer', () => {
  let $rootScope, $state, makeController;

  beforeEach(window.module(VolunteerModule.name));
  beforeEach(inject((_$rootScope_, _$state_) => {
    $rootScope = _$rootScope_;
    $state = _$state_;
    makeController = (volunteerId) => {
      $state.params.volunteerId = volunteerId;
      return new VolunteerController($state);
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {

    // controller specs
    it('has a volunteerId property', () => { 
      let controller = makeController(0);
      expect(controller.volunteerId).to.equal(0);

      controller = makeController(1);
      expect(controller.volunteerId).to.equal(1);

      controller = makeController('1234');
      expect(controller.volunteerId).to.equal(1234);
    });

    it('mocks a volunteer', () => {
      let controller = makeController(0);

      expect(controller.volunteer).to.exist;
      expect(controller.volunteer.id).to.equal(0);
      expect(controller.volunteer.firstName).to.equal("Bill");
      expect(controller.volunteer.lastName).to.equal("Brown");
      expect(controller.volunteer.languages).to.eql(["German"]);
    });

    it('generates a volunteer', () => {
      let controller = makeController('19582');

      expect(controller.volunteer).to.exist;

      let volunteerParams = [
        controller.volunteer.id,
        controller.volunteer.firstName,
        controller.volunteer.lastName,
        controller.volunteer.languages,
        controller.volunteer.birthday,
        controller.volunteer.gender,
        controller.volunteer.role,
        controller.volunteer.volunteerLevel,
        controller.volunteer.createdAt,
        controller.volunteer.notes,
        controller.volunteer.contact.street,
        controller.volunteer.contact.city,
        controller.volunteer.contact.state,
        controller.volunteer.contact.zip,
        controller.volunteer.contact.phoneNumber,
        controller.volunteer.contact.email,
        controller.volunteer.contact.preferredContact
      ];

      _(volunteerParams).forEach((param) => {
        expect(param).to.exist;
      });

      expect(controller.volunteer.hours).to.be.within(30,60);
      
    });
  });

  describe('Template', () => {
    it('displays name in template', () => {
      expect(VolunteerTemplate).to.match(/{{\s?vm\.volunteer.firstName\s?}}/g);
      expect(VolunteerTemplate).to.match(/{{\s?vm\.volunteer.middleName\s?}}/g);
      expect(VolunteerTemplate).to.match(/{{\s?vm\.volunteer.lastName\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = VolunteerComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(VolunteerTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(VolunteerController);
      });
  });
});
