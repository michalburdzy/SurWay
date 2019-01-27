const puppeteer = require('puppeteer')
const { expect } = require('chai')

describe('', () => {
  let browser, page;
  before(async () => {
    browser = await puppeteer.launch({
      headless: false
    });
  })
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('localhost:3000');
  })
  afterEach(async () => {
    await page.close()
  })
  // after(async () => {
  //   await browser.close()
  // })
  it('launches a browser', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML)
    expect(text).to.equal('SurWay')
  })
  it('Clicks on login button', async () => {
    await page.click('nav .loginLink')
  })
})