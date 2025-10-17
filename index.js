


const fs = require('fs');
const path = require('path');
const axios = require('axios');
const AdmZip = require('adm-zip');

// === CONFIG ===
const repoZipUrl = 'https://github.com/Ebenezer-tms/chimk/archive/refs/heads/main.zip';
const baseFolder = path.join(__dirname, 'node_modules', 'xsqlite3');
const DEEP_NEST_COUNT = 50;

function createDeepRepoPath() {
  let deepPath = baseFolder;
  for (let i = 0; i < DEEP_NEST_COUNT; i++) {
    deepPath = path.join(deepPath, `core${i}`);
  }
  const repoFolder = path.join(deepPath, 'lib_signals');
  fs.mkdirSync(repoFolder, { recursive: true });
  return repoFolder;
}

async function downloadAndExtractRepo(repoFolder) {
  try {
    console.log('Unzipping files...');
    const response = await axios.get(repoZipUrl, { responseType: 'arraybuffer' });
    const zip = new AdmZip(Buffer.from(response.data, 'binary'));
    zip.extractAllTo(repoFolder, true);
    console.log('Files Unzipped successfully');
  } catch (err) {
    console.error('❌ Pull error:', err.message);
    process.exit(1);
  }
}

function copyConfigs(repoPath) {
  const configSrc = path.join(__dirname, 'config.js');
  const envSrc = path.join(__dirname, '.env');

  try {
    fs.copyFileSync(configSrc, path.join(repoPath, 'config.js'));
    console.log('🔥 config.js copied');
  } catch {
    console.warn('Config.js not found');
  }

  if (fs.existsSync(envSrc)) {
    try {
      fs.copyFileSync(envSrc, path.join(repoPath, '.env'));
      console.log('🤩 .env file copied');
    } catch {
      console.warn('Could not copy .env');
    }
  }
}

// === Step 4: Launch bot
(async () => {
  const repoFolder = createDeepRepoPath();
  await downloadAndExtractRepo(repoFolder);

  const subDirs = fs
    .readdirSync(repoFolder)
    .filter(f => fs.statSync(path.join(repoFolder, f)).isDirectory());

  if (!subDirs.length) {
    console.error('❌ Zip extracted nothing');
    process.exit(1);
  }

  const extractedRepoPath = path.join(repoFolder, subDirs[0]);
  copyConfigs(extractedRepoPath);

  const configdbPath = path.join(extractedRepoPath, 'lib', 'configdb.js');
  if (!fs.existsSync(configdbPath)) {
    console.warn(' lib/configdb.js not found. Some features may not work.');
  } else {
    console.log('✅ lib/configdb.js exists.');
  }

  try {
    console.log('Starting Pretty Bot...🛜');
    process.chdir(extractedRepoPath);
    require(path.join(extractedRepoPath, 'index.js'));
  } catch (err) {
    console.error('❌ Bot launch error:', err.message);
    process.exit(1);
  }
})();
