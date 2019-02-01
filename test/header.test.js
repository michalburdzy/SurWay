const puppeteer = require('puppeteer')
const { expect } = require('chai')
const { testUserId, cookieKey } = require('../controllers/config/keys')
const Buffer = require('safe-buffer').Buffer
const Keygrip = require('keygrip')

describe('', () => {
  let browser, page;
  before(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });
  })
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
  })
  afterEach(async () => {
    // await page.close()
  })
  after(async () => {
    // await browser.close()
  })
  it('launches a browser', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML)
    expect(text).to.equal('SurWay')
  })
  it('Clicks on login button', async () => {
    await page.click('nav .loginLink')
    const url = page.url();
    expect(url).to.match(/accounts\.google\.com/)
  })
  it.only('Shows logout button when signed in', async () => {
    const sessionObject = {
      passport: { user: testUserId }
    }
    const session = Buffer.from(
      JSON.stringify(sessionObject)
    ).toString('base64')
    const keygrip = new Keygrip([cookieKey])
    const now = new Date();
    now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
    console.log(now)
    const sig = keygrip.sign('session=' + session)
    await page.setCookie({ 'name': 'session', 'value': session, expires: now.getTime() },
      { 'name': 'sessionsig', 'value': sig, expires: now.getTime() })
    // await page.setCookie({ 'name': 'session.sig', 'value': sig })
    // await page.goto('localhost:3000')
  })
})