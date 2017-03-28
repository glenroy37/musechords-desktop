import { MusechordsDesktopPage } from './app.po';

describe('musechords-desktop App', function() {
  let page: MusechordsDesktopPage;

  beforeEach(() => {
    page = new MusechordsDesktopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
