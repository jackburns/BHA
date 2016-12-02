import VolunteersEditModule from './volunteersEdit'
import VolunteersEditController from './volunteersEdit.controller';
import VolunteersEditComponent from './volunteersEdit.component';
import VolunteersEditTemplate from './volunteersEdit.html';

describe('VolunteersEdit', () => {
  let $rootScope, $componentController, mockRequests, makeController;

  beforeEach(window.module(VolunteersEditModule.name));
  beforeEach(inject((_$rootScope_, _$componentController_) => {
    $rootScope = _$rootScope_;
    $componentController = _$componentController_;
    mockRequests = {
      getAssignments: sinon.stub(),
      getVolunteers: sinon.stub()
    };
    makeController = () => {
      return $componentController(VolunteersEditModule.name, {
        $scope: $rootScope,
        Requests: mockRequests
      }, {
        selectedVolunteers: []
      });
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
  });

  describe('Template', () => {
    // template specs
    it('has name in template [REMOVE]', () => {
      expect(VolunteersEditTemplate).to.contain('v.full_name');
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = VolunteersEditComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(VolunteersEditTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(VolunteersEditController);
      });
  });
});
