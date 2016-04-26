import LanguageSelectModule from './languageSelect'
import LanguageSelectController from './languageSelect.controller';
import LanguageSelectComponent from './languageSelect.component';
import LanguageSelectTemplate from './languageSelect.html';

describe('LanguageSelect', () => {
  let $rootScope, $componentController, makeController, scope;

  beforeEach(window.module(LanguageSelectModule.name));
  beforeEach(window.module('ngMock'));

  beforeEach(() => {
    let mockEnums = {
      arrays: {
        languages: [{key: 'es', name: 'English'}, {key: 'es', name:'Spanish'}]
      }
    };
    window.module(($provide) => {
      $provide.value('Enums', mockEnums);
    });
  });

  beforeEach(inject((_$rootScope_, _$componentController_) => {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $componentController = _$componentController_;
    let availability = [{day: 'Monday', start_time: '1:00PM', end_time: '5:00PM', isValid: true}];
    makeController = () => {
      return $componentController(LanguageSelectModule.name, {$scope: scope}, {availability: availability});
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('compares strings upon if it starts with expected case-insensitive substring', () => {
      let controller = makeController();
      expect(controller.startsWithComparator('awef', '')).to.be.true;
      expect(controller.startsWithComparator('', '')).to.be.true;
      expect(controller.startsWithComparator('abcdefg', 'abcdefg')).to.be.true;
      expect(controller.startsWithComparator('abcdefg', 'ABCDEFG')).to.be.true;
      expect(controller.startsWithComparator('abcdefg', 'a')).to.be.true;
      expect(controller.startsWithComparator('abcdefg', 'b')).to.be.false;
      expect(controller.startsWithComparator('abcdefg', 'abcdefz')).to.be.false;
    });
  });

  describe('Template', () => {
  });

  describe('Component', () => {
      // component/directive specs
      let component = LanguageSelectComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(LanguageSelectTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(LanguageSelectController);
      });
  });
});
