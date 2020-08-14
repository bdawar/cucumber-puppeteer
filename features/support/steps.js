const { When, Then, And, Given, setDefaultTimeout } = require('cucumber');
const { assert } = require('chai');
const puppeteer = require('puppeteer');

setDefaultTimeout(60 * 2000);

Given('The browser is open', async function () {
  this.browser = await puppeteer.launch({headless: false});
  this.page = await this.browser.newPage();
})

When('open Google\'s homepage', async function () {
  await this.page.goto("https://www.google.com");
});

When('search for LinkedIn', async function () {
  const searchBoxSelector = "input[name='q']";
  const searchButtonSelector = "input[name='btnK']";
  const searchTerm = "linkedIn";
  await this.page.waitForSelector(searchBoxSelector);
  await this.page.type(searchBoxSelector, searchTerm);
  // await this.page.keyboard.press('Escape');
  await this.page.evaluate(() => (document.querySelector("input[name='btnK']").click()));
});

Then('display the result count', async function () {
  await this.page.waitForSelector("div[id='result-stats']");
  let resultsText = await this.page.evaluate(() => (document.querySelector("div[id='result-stats']").innerText));
  let regex = /\d+/g;
  let resultsCount = resultsText.match(regex);
  resultsCount = resultsCount.join('');
  assert.isAbove(parseInt(resultsCount), 1);
  console.log(`There were ${resultsCount} search result(s)`);

  // Close the browser?
  await this.browser.close()
});