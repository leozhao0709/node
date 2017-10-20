import { AngularAnimationPage } from './app.po';

describe('angular-animation App', () => {
  let page: AngularAnimationPage;

  beforeEach(() => {
    page = new AngularAnimationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
