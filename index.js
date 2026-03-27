import express from "express";
import puppeteer from "puppeteer";

const app = express();

app.get("/", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox"
      ]
    });

    const page = await browser.newPage();
    await page.goto("https://www.olx.pl/uslugi/q-elektryk-dolny-slask/", {
      waitUntil: "networkidle2",
      timeout: 60000
    });

    const html = await page.content();
    await browser.close();

    res.send(html);
  } catch (err) {
    res.send("Błąd: " + err.message);
  }
});

app.listen(3000, () => console.log("Scraper działa na porcie 3000"));
