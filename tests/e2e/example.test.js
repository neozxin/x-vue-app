const { chromium } = require('playwright');
const { expect } = require('chai');

const { getEnv } = require('../../env');

const {
  FSOFE_TEST_E2E_PORT,
} = getEnv();

describe('My example E2E test with Playwright', () => {
  let browser;
  let page;

  before(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto(`http://localhost:${FSOFE_TEST_E2E_PORT}/`);
  });

  after(async () => {
    await page.close();
    await browser.close();
  });

  it('has header', async () => {
    const h1 = await page.$('h1');
    const text = await h1.innerText();
    expect(text).to.equal('Welcome to Your Vue.js + TypeScript App');
  });
});
