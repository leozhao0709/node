const programmingLanguages: any = ['Go', 'Java', 'Python', 'C', 'PHP'];
programmingLanguages.blabla;
programmingLanguages();
programmingLanguages.indexOf('Go');

function randomLanguage(suggestions: string[]) {
  return suggestions[Math.floor(Math.random() * suggestions.length)];
}

randomLanguage(programmingLanguages);
