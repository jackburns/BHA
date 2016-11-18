import HomeModule from './home'
import HomeController from './home.controller';
import HomeComponent from './home.component';
import HomeTemplate from './home.html';
import _ from 'lodash';

describe('Home', () => {
  let $rootScope, $componentController, makeController, mockRequests, mockUser;
  let $scope = {};

  beforeEach(window.module(HomeModule.name));
  beforeEach(inject((_$rootScope_, _$componentController_) => {
    $rootScope = _$rootScope_;
    $componentController = _$componentController_;
    mockRequests = {
      sendReferral: sinon.stub(),
      getUserAssignments: sinon.stub().returns({then: (cb) => {}})
    };
    mockUser = {
      getUser: sinon.stub().returns({id: false})
    };
    makeController = () => {
      return $componentController(HomeModule.name, {
        $scope: $scope,
        $state: {},
        $uibModal: {},
        User: mockUser,
        Requests: mockRequests
      })
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    'use strict';
    describe("#sendReferral", () => {
      describe("when no email address has been entered", () => {
        it("will not send a post request", () => {
          let controller = makeController()
          $scope.friendEmail = ''
          controller.sendReferral()

          expect(mockRequests.sendReferral.called).to.be.false
        })
      })
      describe("when an invalid email address has been entered", () => {
        it("will not send a post request", () => {
          let controller = makeController()
          $scope.friendEmail = "not a real email address"
          $scope.referral = {$valid: false}
          controller.sendReferral()

          expect(mockRequests.sendReferral.called).to.be.false
        })
      })
      describe("when a valid email address has been entered", () => {
        it("makes a post request to the api endpoint", () => {
          let controller = makeController()
          $scope.friendEmail = "real@example.com"
          $scope.referral = {$valid: true}
          controller.sendReferral()

          expect(mockRequests.sendReferral.calledOnce).to.be.true
          expect(mockRequests.sendReferral.calledWith("real@example.com")).to.be.true
        })
      })
    })
  });

  describe('Template', () => {
  });

  describe('Component', () => {
    // component/directive specs
    let component = HomeComponent;

    it('includes the intended template',() => {
      expect(component.template).to.equal(HomeTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(HomeController);
    });
  });
});
