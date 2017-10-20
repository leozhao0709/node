import { AngularHttpPage } from './app.po';

describe('angular-http App', () => {
  let page: AngularHttpPage;

  beforeEach(() => {
    page = new AngularHttpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
