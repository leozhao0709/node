import { AngularAppProjPage } from './app.po';

describe('angular-app-proj App', () => {
  let page: AngularAppProjPage;

  beforeEach(() => {
    page = new AngularAppProjPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
