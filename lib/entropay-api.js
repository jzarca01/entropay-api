const puppeteer = require('puppeteer');
const faker = require('faker');

function entropayApi() {

};

entropayApi.prototype.signup = async function (userName, email, password) {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50
    });
    const page = await browser.newPage();
    await page.goto('https://secure2.entropay.com/consumer/u/registration', {
        waitUntil: 'networkidle2'
    });

    await page.waitForSelector('input[id="firstName"]');

    await page.type('input[id="firstName"]', faker.fake("{{name.firstName}}"));
    await page.type('input[id=lastName]', faker.fake("{{name.lastName}}"));

    await page.type('input[id=email]', email);
    await page.type('input[id=username]', userName);
    await page.type('input[id=password]', password);

    await page.evaluate(() => document.querySelector('button[id="dayDropDown"]').scrollTop = 0);

    await page.click('button[id="dayDropDown"]');
    await page.click(`ul[aria-labelledby="dayDropDown"] li:first-child`)

    await page.click('button[id="monthDropDown"]');
    await page.click(`ul[aria-labelledby="monthDropDown"] li:first-child`)

    await page.click('button[id="yearDropDown"]');
    await page.click(`ul[aria-labelledby="yearDropDown"] li:nth-child(21)`)

    await page.click('input[id="registerBtn"]');

    await page.waitForNavigation({
        waitUntil: 'networkidle2'
    });

    await browser.close();
};

module.exports = new entropayApi();