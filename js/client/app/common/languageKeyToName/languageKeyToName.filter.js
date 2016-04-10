let LanguageToKeyNameFilter = (Enums) => {
  return (input) => {
    return Enums.languages[input];
  };
};

LanguageToKeyNameFilter.$inject = ['Enums'];
export default LanguageToKeyNameFilter;
