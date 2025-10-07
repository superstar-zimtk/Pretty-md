const fs = require('fs')
const chalk = require('chalk')
if (fs.existsSync('.env')) require('dotenv').config({ path: __dirname+'/.env' })


global.SESSION_ID = process.env.SESSION_ID || 'JUNE-MD:~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU5yMk1aaGFzL252Z1ltVkp5VUlaYmJDb2xaM0diT2NhRjB0SWFJMStsZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU1rMjdrWE8xZmNFNk0zMVpxTEd3MlNwdVFuS3BEUk5HM1hGNmJsWTRnND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpSUdvbnpUSTJRbkl4U0t0YkdVSkpYeUJTbXZEQWVtM3JLbGwyV1hsWVhnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNK1AvSzd1RXhPN0hXZUhzK3ZWS2VDWnV2N2JwTXZYa0VidlcwWWpnT1dFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRDZzRMYUFySlhvTUc1QVRMNlBpZHZuWU0rUGl1VTNBKzgxb3JnRGVybFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtYck54Q2tULzhVSUI2MG9XR2toT2NvVS9mUTgrdnRWemNOY0VGNjg0d0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUY1a2N0cURlZzMyMEF5ZnBaOWRsRVc1UGF1NHh1ZGxDZ0YzVGlhRGozdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYlhPSkZOVWR6SlllcU5HM0hYRE1CK0RuZXlvM2FUOGpmbTBwN3owc3MyQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlllbFpsUHYya3hCLzhNTmticFZzdDYzUWhnTXBvL1Q0L3RwRkRqZ2JmNERkU3dCK3ZxN2kwaWhhamJQOTRYNDVoaEM0eWhsaWM1amFTMFR4Wm9HSERnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA3LCJhZHZTZWNyZXRLZXkiOiIxeEdKMG5ORkFBN25lbnVxYmk2L0tIUXRtWUVPNGxTSnFwODE1N0hDOHJzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJxODJwN0YxVlJOS3Y1MUJyVkhnYXBnIiwicGhvbmVJZCI6ImVmZTk2ZjRkLTdkYzAtNDdiYi1hYTIwLTkxYWY1MDZjZjljNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsZUJJMWl4OGZxKzlxcHlVOUc4WWRpNE45ODQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUFNQk9IeFo5YWxSMlFUWFJ3UkFhNzNqaDQ0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRSQVNIQk9UIiwibWUiOnsiaWQiOiIyNjM3MTk0NTg0OTU6NkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjU0Nzg3MjA2ODU2Nzk4OjZAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQeTkwUFFHRUpIbGs4Y0dHQVlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJkT2JQMlhJblVNeWorRzR1cm4vN3NCNW5SUlBqTDNHNnFuSEVGL0lqUWlNPSIsImFjY291bnRTaWduYXR1cmUiOiJ1L2I1VDZIazNTVTFTMXhOSEE1cWkvcEVGT01rb2dwV25EN00rWmt4N3lBRitKbjVjMjNDUHMvRDNiWW93UnVsQ1UyQkQwNTQ0Ry9ENWlGVVhVNk9Cdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiK25kQTZSaVVNeGRiZDhaaWRsRXRFaHRMQlFvTXF1ZnJ5eW04VTY1WGNjaUd2KzZhdzg0ZzJnMFZNeGp2TjQ1eHhReGpMMXI4dWVxUHBvejZyN0J3Q2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTk0NTg0OTU6NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYVG16OWx5SjFETW8vaHVMcTUvKzdBZVowVVQ0eTl4dXFweHhCZnlJMElqIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTk4MzQ3ODIsImxhc3RQcm9wSGFzaCI6IjJHNEFtdSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSTJ2In0=' 
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
