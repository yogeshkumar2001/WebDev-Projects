const puppeteer = require("puppeteer");
const excel4node = require("excel4node");
const fs = require("fs");

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    //   console.log("code run");
    let topGainer = [];
    let topLosers = [];
    let todayMarket = [];
    let infoObj = {
      companyName: "",
      marketPrice: "",
      Percentage: "",
    };
    let market = {
      name: "",
      exchangeName:"",
      exhangeValue:"",
      value: "",
    };
    const pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://groww.in/");
    await tab.waitForSelector("#homeBox2 > div");
    await tab.click("#homeBox2 > div");
    // await tab.waitFor(5000);
    const page2 = await browser.newPage(); // open new tab
    await page2.goto("https://groww.in/stocks/top-gainers"); // go to github.com
    await page2.bringToFront();
    const page3 = await browser.newPage(); // open new tab
    await page3.goto("https://groww.in/stocks/top-losers"); // go to github.com
    await page3.bringToFront();

    await fetchdata(page2, infoObj, topGainer, "topGainers.json");
    await fetchdata(page3, infoObj, topLosers, "topLoser.json");

    const page4 = await browser.newPage();
    await page4.goto("https://groww.in/market-news/stocks"); // go to github.com
    await page4.bringToFront();
    await page4.waitForSelector("div.ic23Title");
    // let names = await page4.$$("div.ic23Title");
    const names = await page4.evaluate(() => {
      const tds = Array.from(document.querySelectorAll("div.ic23Title"));
      return tds.map((td) => td.innerText);
    });
    await page4.waitForSelector("div.ic23Exhange");
    const Exchangenames = await page4.evaluate(() => {
      const tds = Array.from(document.querySelectorAll("div.ic23Exhange"));
      return tds.map((td) => td.innerText);
    });
    await page4.waitForSelector("div.ic23DayChange");
    const Changevalues = await page4.evaluate(() => {
      const tds = Array.from(document.querySelectorAll("div.ic23DayChange"));
      return tds.map((td) => td.innerText);
    });    
    await page4.waitForSelector("div.ic23CurrVal");
    const values = await page4.evaluate(() => {
      const tds = Array.from(document.querySelectorAll("div.ic23CurrVal"));
      return tds.map((td) => td.innerText);
    });
    for (let i = 0; i < names.length; i++) {
      market = {
        name: names[i],
        exchangeName:Exchangenames[i],
        exhangeValue:Changevalues[i],
        value: values[i],
      };
      todayMarket.push(market);
    }
    fs.writeFileSync("TodayMarket.json", JSON.stringify(todayMarket), "utf-8");
    await browser.close();
    prepareExcel(topGainer, topLosers, todayMarket, "StockData.csv");
  } catch (error) {
    console.log(error);
  }
})();

async function fetchdata(page, infoObj, arr, fileName) {
  await page.waitForSelector(`div.tgal438CompanyName`);
  const companyName = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll("div.tgal438CompanyName"));
    return tds.map((td) => td.innerText);
  });
  // console.log(companyName.length);
  // console.log(companyName);
  const mPrice = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll("td.fs14"));
    return tds.map((td) => td.innerText);
  });
  // console.log(mPrice.length);
  // console.log(mPrice);
  const mPercentage = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll("div.fs12"));
    return tds.map((td) => td.innerText);
  });
  // console.log(mPercentage.length);
  // console.log(mPercentage);
  for (let i = 0; i < companyName.length; i++) {
    infoObj = {
      companyName: companyName[i],
      marketPrice: mPrice[i],
      Percentage: mPercentage[i],
    };
    arr.push(infoObj);
  }
  fs.writeFileSync(fileName, JSON.stringify(arr), "utf-8");
  // console.log(arr.length);
  // console.log(arr);
}
async function prepareExcel(topGainer, topLoser, todayMarket, excelFileName) {
  let wb = new excel4node.Workbook();
  let tsheet = wb.addWorksheet("top Gainers");
  tsheet.cell(1, 1).string("Company Name ");
  tsheet.cell(1, 2).string("Market Value ");
  tsheet.cell(1, 3).string("Gain");
  for (let i = 0; i < topGainer.length; i++) {
    tsheet.cell(2 + i, 1).string(topGainer[i].companyName);
    tsheet.cell(2 + i, 2).string(topGainer[i].marketPrice);
    tsheet.cell(2 + i, 3).string(topGainer[i].Percentage);
  }
  let tsheet2 = wb.addWorksheet("top Losers");
  tsheet2.cell(1, 1).string("Company Name");
  tsheet2.cell(1, 2).string("Market Value");
  tsheet2.cell(1, 3).string("Loss");
  for (let i = 0; i < topLoser.length; i++) {
    tsheet2.cell(2 + i, 1).string(topLoser[i].companyName);
    tsheet2.cell(2 + i, 2).string(topLoser[i].marketPrice);
    tsheet2.cell(2 + i, 3).string(topLoser[i].Percentage);
  }
  let tsheet3 = wb.addWorksheet("Today market");
  tsheet3.cell(1, 1).string("market Name");
  tsheet3.cell(1, 2).string("Market Value ");
  tsheet3.cell(1, 3).string("Exchange Name ");
  tsheet3.cell(1, 4).string("Exchange Value ");
  for (let i = 0; i < todayMarket.length; i++) {
    tsheet3.cell(2 + i, 1).string(todayMarket[i].name);
    tsheet3.cell(2 + i, 2).string(todayMarket[i].value);
    tsheet3.cell(2 + i, 3).string(todayMarket[i].exchangeName);
    tsheet3.cell(2 + i, 4).string(todayMarket[i].exhangeValue);
  }
  wb.write(excelFileName);
}

// function prepareExcel(teams, excelFileName) {
//   let wb = new excel4node.Workbook();
//   for (let i = 0; i < teams.length; i++) {
//     let tsheet = wb.addWorksheet(teams[i].name);
//     tsheet.cell(1, 1).string("Vs");
//     tsheet.cell(1, 2).string("Self Score");
//     tsheet.cell(1, 3).string("Opp Score");
//     tsheet.cell(1, 4).string("Result");
//     for (let j = 0; j < teams[i].matches.length; j++) {
//       tsheet.cell(2 + j, 1).string(teams[i].matches[j].vs);
//       tsheet.cell(2 + j, 2).string(teams[i].matches[j].selfScore);
//       tsheet.cell(2 + j, 3).string(teams[i].matches[j].oppScore);
//       tsheet.cell(2 + j, 4).string(teams[i].matches[j].result);
//     }
//   }
//   wb.write(excelFileName);
// }
