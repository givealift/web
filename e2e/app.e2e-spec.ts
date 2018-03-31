import { AppPage } from './app.po';

describe('give-a-lift App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Witaj w Give-a-lift!');
  });
});
