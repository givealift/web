import { AppPage } from './app.po';

describe('give-a-lift App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    //you wont tell me what to do - delete after master deploy
    expect(page.getParagraphText()).toEqual('Witaj w Give-a-lift!');
  });
});
