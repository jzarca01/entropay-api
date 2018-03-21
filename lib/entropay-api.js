const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const faker = require('faker');

function entropayApi() {

};

entropayApi.prototype.signup = async function (userName, email, password, {birthDay, birthMonth, birthYear}) {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50
    });
    const page = await browser.newPage();
    await page.emulate(iPhone);
    await page.goto('https://secure2.entropay.com/consumer/u/registration', {
        waitUntil: ['networkidle2']
    });

    await page.waitForSelector('input[id="firstName"]');

    await page.type('input[id="firstName"]', faker.fake("{{name.firstName}}"));
    await page.type('input[id=lastName]', faker.fake("{{name.lastName}}"));

    await page.type('input[id=email]', email);
    await page.type('input[id=username]', userName);
    await page.type('input[id=password]', password);

    await page.click('button[id="dayDropDown"]');
    await page.click(`ul[aria-labelledby="dayDropDown"] li a[value="${birthDay}"]`)

    await page.click('button[id="monthDropDown"]');
    await page.click(`ul[aria-labelledby="monthDropDown"] li a[value="${birthDay}"]`)

    await page.click('button[id="yearDropDown"]');
    await page.click(`ul[aria-labelledby="yearDropDown"] li a[value="${birthDay}"]`)

    await page.click('input[type="submit"]');

    await page.waitForNavigation({
        waitUntil: 'load'
    });

    await browser.close();
};

module.exports = new entropayApi();