import { FormPage } from './app.po';

describe('form App', () => {
  let page: FormPage;

  beforeEach(() => {
    page = new FormPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
