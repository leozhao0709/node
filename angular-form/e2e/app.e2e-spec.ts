import { AngularFormPage } from './app.po';

describe('angular-form App', () => {
  let page: AngularFormPage;

  beforeEach(() => {
    page = new AngularFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
