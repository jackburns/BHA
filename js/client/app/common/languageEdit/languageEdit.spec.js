import LanguageEditModule from './languageEdit'
import LanguageEditController from './languageEdit.controller';
import LanguageEditComponent from './languageEdit.component';
import LanguageEditTemplate from './languageEdit.html';

describe('LanguageEdit', () => {
  let $rootScope, $componentController, makeController, scope;

  beforeEach(window.module(LanguageEditModule.name));
  beforeEach(window.module('ngMock'));

  beforeEach(() => {
    let mockEnums = {};

    window.module(($provide) => {
      $provide.value('Enums', mockEnums);
    });
  });

  beforeEach(inject((_$rootScope_, _$componentController_) => {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $componentController = _$componentController_;
    makeController = () => {
      return $componentController(LanguageEditModule.name, {$scope: scope}, {languages: [{language_name: 'es'}]});
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('adds a new blank language', () => {
      let ctrl = makeController();
      expect(ctrl.languages).to.have.length(1);
      ctrl.addNewLanguage();
      expect(ctrl.languages).to.have.length(2);
      expect(ctrl.languages[1])
    });

    it('removes the last language', () => {
      let ctrl = makeController();
      console.log(ctrl);
      expect(ctrl.languages).to.have.length(1);
      ctrl.removeLastLanguage();
      expect(ctrl.languages).to.have.length(0);
      ctrl.removeLastLanguage();
      expect(ctrl.languages).to.have.length(0);
    });
  });

  describe('Template', () => {
  });

  describe('Component', () => {
      // component/directive specs
      let component = LanguageEditComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(LanguageEditTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(LanguageEditController);
      });
  });
});
