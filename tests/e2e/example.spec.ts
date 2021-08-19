import { chromium } from 'playwright';

import { getEnv } from '../../env';

const {
  FSOFE_TEST_E2E_PORT,
} = getEnv();

describe('My example E2E test with Playwright', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto(`http://localhost:${FSOFE_TEST_E2E_PORT}/`);
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });

  it('has header', async () => {
    const h1 = await page.$('h1');
    const text = await h1.innerText();
    expect(text).toEqual('Welcome to Your Vue.js + TypeScript App');
  });
});
