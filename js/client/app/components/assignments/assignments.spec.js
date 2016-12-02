import AssignmentsModule from './assignments'
import AssignmentsController from './assignments.controller';
import AssignmentsComponent from './assignments.component';
import AssignmentsTemplate from './assignments.html';

describe('Assignments', () => {
  let $rootScope, $componentController, makeController, mockModals, mockRequests;

  beforeEach(window.module(AssignmentsModule.name));
  beforeEach(inject((_$rootScope_, _$componentController_) => {
    $rootScope = _$rootScope_;
    $componentController = _$componentController_;
    mockModals = {
      openNotifications: sinon.stub()
    };
    mockRequests = {
      getAssignments: sinon.stub(),
      getVolunteers: sinon.stub()
    };
    makeController = () => {
      return $componentController(AssignmentsModule.name, {
        $scope: $rootScope,
        $state: {},
        Modals: mockModals,
        Requests: mockRequests,
        User: {
          isAdmin: sinon.stub().returns(true)
        },
        Enums: {}
      });
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('initializes with futureAssignments fetched from the API', () => {
      mockRequests.getAssignments.callsArgWith(1, [0, 1]);
      let controller = makeController();

      expect(controller).to.have.property('assignments');
      expect(controller.assignments).to.have.length(2);
    });

    it('opens the notifications modal after fetching all volunteers', () => {
      mockRequests.getVolunteers.callsArgWith(1, [55, 82]);
      let controller = makeController();
      controller.openNotificationsModal('es');

      expect(mockRequests.getVolunteers.calledOnce).to.be.true;
      expect(mockModals.openNotifications.calledOnce).to.be.true;
      expect(mockModals.openNotifications.calledWith([55, 82])).to.be.true;
    })
  });

  describe('Component', () => {
      // component/directive specs
      let component = AssignmentsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AssignmentsTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AssignmentsController);
      });
  });
});
