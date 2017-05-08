import { Demo360Page } from './app.po';

describe('demo360 App', () => {
  let page: Demo360Page;

  beforeEach(() => {
    page = new Demo360Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
