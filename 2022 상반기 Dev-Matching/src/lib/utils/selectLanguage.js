const selectLanguage = (
  tempSelectedLanguages,
  originalSelectedLanguages,
  target,
  render
) => {
  console.log(tempSelectedLanguages, originalSelectedLanguages, target);
  if (tempSelectedLanguages.includes(target)) {
    const idx = tempSelectedLanguages.indexOf(target);

    tempSelectedLanguages.splice(idx, 1);
    tempSelectedLanguages.push(target);

    originalSelectedLanguages = selectLanguage;
    render(tempSelectedLanguages);
    return;
  }

  if (tempSelectedLanguages.length > 4) {
    tempSelectedLanguages.splice(0, 1);
    tempSelectedLanguages.push(target);

    originalSelectedLanguages = selectLanguage;
    render(tempSelectedLanguages);
    return;
  }

  tempSelectedLanguages.push(target);
  originalSelectedLanguages = selectLanguage;
  render(tempSelectedLanguages);
};

export default selectLanguage;
