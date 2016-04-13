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
