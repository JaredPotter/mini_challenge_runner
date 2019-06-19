const puppeteer = require('puppeteer');

(async () => {
    const username = process.argv[2];
    const password = process.argv[3];
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    const pageUrl = 'https://www.assethealth.com/amadeuswellness';

    await page.goto(pageUrl, {
        waitUntil: 'networkidle0' // 'networkidle0' is very useful for SPAs.
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };    

    await page.evaluate((username, password) => {
        const usernameField = document.querySelector('#login_un > input');
        usernameField.value = username;
        const passwordField = document.querySelector('#login_pw > input');
        passwordField.value = password; 
    }, username, password);

    await sleep(1000);

    await page.evaluate(() => {
        const loginButton = document.querySelector('#login_submit > a');
        loginButton.click();
    });

    await sleep(5000);

    await page.evaluate(() => {
        const miniChallengeButton = document.querySelector('#home_widget_AHXDynamicLayout_renderWidget_miniChallengesTile_4 > div.tile-body > div > div > div > div.btn.btn-info.text-uppercase');

        if(miniChallengeButton) {
            miniChallengeButton.click();
        }
    });

    await sleep(5000);

  await browser.close();
})();