import RequestsModule from './requests';
import AlertsModule from '../alert/alert';

describe('Requests service', function() {
  var $httpBackend, Requests;

  beforeEach(angular.mock.module(AlertsModule.name))
  beforeEach(angular.mock.module(RequestsModule.name));

  beforeEach(inject(function(_$httpBackend_, _Requests_) {
    $httpBackend = _$httpBackend_;
    Requests = _Requests_;
  }));

  let mockResults = {'results': [1, 2, 3]};

  describe('getAssignments', () => {
    it('should get assignments', () => {
      let successCallback = sinon.spy();
      $httpBackend.expectGET(api + '/assignments/').respond(mockResults);
      Requests.getAssignments({}, successCallback);
      $httpBackend.flush();
      expect(successCallback.calledWith(mockResults.results)).to.be.true;
      expect(successCallback.calledOnce).to.be.true;
    });
  });

  describe('getVolunteers', () => {
    it('should get all volunteers when no filters are passed in', () => {
      let callback = sinon.spy();
      $httpBackend.expectGET(api + '/volunteers/').respond(mockResults);

      Requests.getVolunteers({}, callback);
      $httpBackend.flush();
      expect(callback.calledWith(mockResults.results)).to.be.true;
      expect(callback.calledOnce).to.be.true;
    });
    
    it('should send filters up to the volunteers endpoint', () => {
      let callback = sinon.spy();
      let mockParams = {
        first_name: 'Abe',
        last_name: 'Lincoln',
        language: 'es',
        can_write: true
      };

      $httpBackend.expectGET(api + '/volunteers/?can_write=true&first_name=Abe&language=es&last_name=Lincoln').respond(mockResults);
      Requests.getVolunteers(mockParams, callback);
      $httpBackend.flush();
    });
  });

  describe('#sendReferral', () => {
    'use strict';
    it('should make a POST request to /api/refer/', () => {
      $httpBackend.expectPOST(api + '/refer/').respond({status: 'Referral Sent'})
      Requests.sendReferral().then((resp) => {
        expect(resp.data).to.eql({status: 'Referral Sent'})
      })
      $httpBackend.flush()
    })
  })
});
