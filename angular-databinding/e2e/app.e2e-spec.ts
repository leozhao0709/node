import { AngularDatabindingPage } from './app.po';

describe('angular-databinding App', () => {
  let page: AngularDatabindingPage;

  beforeEach(() => {
    page = new AngularDatabindingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
