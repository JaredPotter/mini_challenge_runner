const functions = require('firebase-functions');
const puppeteer = require('puppeteer');

// CREDENTIALS - DO NOT COMMIT TO PUBLIC REPO.
const username = 'USERNAME';
const password = 'PASSWORD';
const assetHealthEmployer = 'EMPLOYER';

console.log('Mini Challenge Function Deployed Successfully!');

const runtimeOpts = {
    timeoutSeconds: 300,
    memory: '2GB'
};

exports.executeMiniChallengeRunner = functions.runWith(runtimeOpts).pubsub.schedule('0 9 * * *').onRun(async (context) => {
    console.log('Executing Mini Challenge Runner!');

    if(!username || !password) {
        throw 'Username or Password not set';
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    const pageUrl = `https://www.assethealth.com/${assetHealthEmployer}`;

    await page.goto(pageUrl, {
        waitUntil: 'networkidle0' // 'networkidle0' is very useful for SPAs.
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };    

    // Set the username and password fields.
    await page.evaluate((username, password) => {
        const usernameField = document.querySelector('#login_un > input');
        usernameField.value = username;
        const passwordField = document.querySelector('#login_pw > input');
        passwordField.value = password; 
    }, username, password);

    await sleep(1000);

    // Click 'login' button.
    await page.evaluate(() => {
        const loginButton = document.querySelector('#login_submit > a');

        loginButton.click();
    });

    await sleep(5000);

    // Click the daily challenge button.
    await page.evaluate(() => {
        const miniChallengeButton = document.querySelector('#home_widget_AHXDynamicLayout_renderWidget_miniChallengesTile_4 > div.tile-body > div > div > div > div.btn.btn-info.text-uppercase');

        if(miniChallengeButton) {
            miniChallengeButton.click();
        }
    });

    await sleep(5000);

    // Close browser once complete.
    await browser.close();
});