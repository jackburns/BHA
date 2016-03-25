import VolunteerModule from './volunteer'
import VolunteerController from './volunteer.controller';
import VolunteerComponent from './volunteer.component';
import VolunteerTemplate from './volunteer.html';

describe('Volunteer', () => {
  let $rootScope, $state, makeController;

  beforeEach(window.module(VolunteerModule.name));
  beforeEach(inject((_$rootScope_, _$state_) => {
    $rootScope = _$rootScope_;
    $state = _$state_;
    $state.params.volunteerId = 0;
    makeController = () => {
      return new VolunteerController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a volunteerId property', () => { 
      let controller = makeController();

      expect(controller.makeVolunteer).toBeDefined();
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(VolunteerTemplate).to.match(/{{\s?vm\.name\s?}}/g);
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
