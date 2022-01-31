const puppeteer = require("puppeteer")
const fs = require('fs');
async function scrapeUnicode(url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage()
    await page.goto(url);
    const grapMainData = await page.evaluate(function() {
        return Array.from(document.querySelectorAll(".name"))
            .map((name, index) => ({
                name: name.textContent,
                unicode: document.querySelectorAll(".chars")[index].textContent,
            }))
    })
    console.log(grapMainData)
    fs.writeFile('results.json', JSON.stringify(grapMainData), function(err) {
        if (err) throw err;
        console.log('complete');
    });
    browser.close()
}
scrapeUnicode("https://unicode.org/emoji/charts/full-emoji-list.html")