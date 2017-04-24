import { AngularReactiveFormPage } from './app.po';

describe('angular-reactive-form App', () => {
  let page: AngularReactiveFormPage;

  beforeEach(() => {
    page = new AngularReactiveFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
