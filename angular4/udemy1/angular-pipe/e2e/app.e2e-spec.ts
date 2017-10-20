import { AngularPipePage } from './app.po';

describe('angular-pipe App', () => {
  let page: AngularPipePage;

  beforeEach(() => {
    page = new AngularPipePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
