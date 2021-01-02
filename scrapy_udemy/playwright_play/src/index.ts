import { chromium, ChromiumBrowser, devices } from 'playwright';

// (async () => {
//   let browser: ChromiumBrowser | undefined;
//   try {
//     browser = await chromium.launch({
//       headless: false,
//       // devtools: true,
//       timeout: 10000,
//     });

//     const page = await browser.newPage();
//     await page.goto('https://google.com');
//     await page.type('.gLFy', 'Udemy', { delay: 100, timeout: 5000 });
//     await page.keyboard.press('Enter');
//     await page.waitForNavigation(); // wait for navigation complete

//     // take a screenshot and save to 'example.png'
//     await page.screenshot({ path: 'example.png' });
//   } catch (error) {
//     console.log('err:', error);
//   }
//   if (browser) {
//     await browser.close();
//   }
// })();

// (async () => {
//   let browser: ChromiumBrowser | undefined;
//   try {
//     browser = await chromium.launch({
//       headless: true,
//       // devtools: true,
//       timeout: 10000,
//     });

//     const page = await browser.newPage();
//     await page.goto('https://learnscraping.com/');
//     await page.pdf({
//       path: './page.pdf',
//       format: 'A4',
//     });
//   } catch (error) {
//     console.log('err:', error);
//   }
//   if (browser) {
//     await browser.close();
//   }
// })();

// (async () => {
//   let browser: ChromiumBrowser | undefined;
//   try {
//     browser = await chromium.launch({
//       headless: false,
//       // devtools: true,
//       timeout: 10000,
//     });
//     const context = await browser.newContext({
//       ...devices['iPhone 11 Pro'],
//     });

//     const page = await context.newPage();

//     await page.goto('https://learnscraping.com/');
//   } catch (error) {
//     console.log('err:', error);
//   }
//   if (browser) {
//     await browser.close();
//   }
// })();

// (async () => {
//   let browser: ChromiumBrowser | undefined;
//   try {
//     browser = await chromium.launch({
//       headless: false,
//       // devtools: true,
//       timeout: 10000,
//     });

//     const page = await browser.newPage();

//     await page.route('**/*', (route) => {
//       return ['image', 'font', 'stylesheet'].includes(route.request().resourceType())
//         ? route.abort()
//         : route.continue();
//     });

//     await page.goto('https://learnscraping.com/');
//   } catch (error) {
//     console.log('err:', error);
//   }
//   if (browser) {
//     await browser.close();
//   }
// })();

(async () => {
  let browser: ChromiumBrowser | undefined;
  try {
    browser = await chromium.launch({
      headless: false,
      // devtools: true,
      timeout: 10000,
    });

    const context = await browser.newContext({
      httpCredentials: {
        username: 'admin',
        password: '123',
      },
    });

    const page = await context.newPage();
    page.on('console', (message) => {
      console.log(message.text());
    });

    await page.goto('https://httpbin.org/basic-auth/admin/123');

    await page.evaluate(() => {
      const divEl = document.createElement('div');
      divEl.textContent = '12345';
      document.querySelector('body')!.appendChild(divEl);
      console.log('......12345...');
    });
  } catch (error) {
    console.log('err:', error);
  }
  if (browser) {
    await browser.close();
  }
})();
