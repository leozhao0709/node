import { AngularStyleAnimationPage } from './app.po';

describe('angular-style-animation App', () => {
  let page: AngularStyleAnimationPage;

  beforeEach(() => {
    page = new AngularStyleAnimationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
