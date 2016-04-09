import angular from 'angular';
import LanguageKeyToNameFilter from './languageKeyToName.filter';

let languageKeyToNameModule = angular.module('languageKey', [])
  .filter('languageKeyToName', LanguageKeyToNameFilter);

export default languageKeyToNameModule;