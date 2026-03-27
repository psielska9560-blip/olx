import express from "express";
import puppeteer from "puppeteer";

const app = express();

app.get("/", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-software-rasterizer",
        "--disable-background-networking",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-breakpad",
        "--disable-component-extensions-with-background-pages",
        "--disable-default-apps",
        "--disable-extensions",
        "--disable-features=TranslateUI",
        "--disable-ipc-flooding-protection",
        "--disable-renderer-backgrounding",
        "--memory-pressure-off",
        "--single-process",
        "--no-zygote",
        "--no-first-run",
        "--no-default-browser-check"
      ]
    });

    const page = await browser.newPage();

    await page.goto("https://www.olx.pl/uslugi/q-elektryk-dolny-slask/", {
      waitUntil: "domcontentloaded",
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
