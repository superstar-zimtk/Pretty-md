const fs = require('fs')
if (fs.existsSync('.env')) require('dotenv').config({ path: __dirname+'/.env' })


global.SESSION_ID = process.env.SESSION_ID || '' 
//~~~~~~~~~~~ Settings Owner ~~~~~~~~~~~//
global.owner = "263715305976"
global.developer = "263715305976"
global.bot = ""
global.devname = "Superstar"
global.ownername = process.env.OWNER_NAME ||'Superstar'
global.botname = "Pretty Md"
global.versisc = "2"
global.packname = "⎋Pretty Md"
//~~~~~~~~~~~ Settings Sosmed ~~~~~~~~~~~//
global.linkwa = "https://wa.me/superstars"
global.linkyt = "https://www.youtube.com/superstars"
global.linktt = "https://tiktok.com"
global.linktele = "https://t.me"

//~~~~~~~~~~~ Settings Bot ~~~~~~~~~~~//
global.prefix = process.env.BOT_PREFIX ||'.'
global.autoRecording = false
global.autoTyping = false
global.autorecordtype = false
global.autoread = process.env.AUTO_READ || false
global.autobio = false
global.anti92 = false
global.owneroff = false
global.statusview = process.env.AUTO_STATUS || true
global.autoreact = process.env.AUTO_REACT || 'false'
//~~~~~~~~~~~ Settings Thumbnail ~~~~~~~~~~~//
global.thumbbot = "https://url.bwmxmd.online/Adams.poh4tuhs.jpg"
global.thumbown = "https://url.bwmxmd.online/Adams.poh4tuhs.jpg"

//~~~~~~~~~~~ Settings Channel ~~~~~~~~~~~//
global.idchannel = "120363402785346228@newsletter*"
global.channelname = "ーPRETTY MD UPDATES"
global.channel = "https://whatsapp.com/channel/0029Vb9qprVJuyAJxcTO252t"

//~~~~~~~~~~~ Settings Message ~~~~~~~~~~~//
global.mess = {
  developer: "This feature is for developers only!!",
  owner: " feature is for owners only!",
  group: "This feature is for group chats only!!",
  private: "This feature is for private chats only!",
  admin: "This feature is for admins only!!",
  botadmin: "This feature is for bot admins only!!",
  wait: "Please wait, loading...",
  error: "An error occurred!",
  done: "Process completed!"
}

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
