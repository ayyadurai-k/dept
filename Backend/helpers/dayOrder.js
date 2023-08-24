const puppeteer = require('puppeteer');


exports.getDayOrder = async () => {
   let dayOrder;
   try {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://www.maduracollege.edu.in/", { waitUntil: "domcontentloaded" })
      const result = await page.evaluate(() => {
         return document.querySelector('.day-order-part span').textContent;
      })
      browser.close();
     dayOrder = result.trim();

   }
   catch(error){
      console.log("called");
      dayOrder = null
   }
   console.log(dayOrder);
   return dayOrder
}