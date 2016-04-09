import LanguageKeyToNameModule from './languageKeyToName';
import languageKeyToNameFilter from './languageKeyToName.filter';
import Enums from '../enums/enums.service'
let enums = Enums();

describe('LanguageSelect', () => {
  let makeFilter;

  beforeEach(() => {
    window.module(LanguageKeyToNameModule.name);
    makeFilter = () => {
      return languageKeyToNameFilter(enums);
    }
  });

  describe('languageKeyToName filter tests', () => {
    it('Converts a languageKey to the name of the language', () => {
      let filter = makeFilter();
      expect(filter('es')).to.equal('Spanish');
    });
  });
});
