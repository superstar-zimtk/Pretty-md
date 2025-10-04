/*tenor-modz*/
/*superstar*/
/*2025*/



require('./setting/settings');
const fs = require('fs');
const ffmpeg = require("fluent-ffmpeg");
const axios = require('axios');
const didyoumean = require('didyoumean');
const path = require('path');
const chalk = require("chalk");
const util = require("util");
const moment = require("moment-timezone");
const speed = require('performance-now');
const similarity = require('similarity');
const { spawn, exec, execSync } = require('child_process');

const { downloadContentFromMessage, proto, generateWAMessage, getContentType, prepareWAMessageMedia, generateWAMessageFromContent, GroupSettingChange, jidDecode, WAGroupMetadata, emitGroupParticipantsUpdate, emitGroupUpdate, generateMessageID, jidNormalizedUser, generateForwardMessageContent, WAGroupInviteMessageGroupMetadata, GroupMetadata, Headers, delay, WA_DEFAULT_EPHEMERAL, WADefault, getAggregateVotesInPollMessage, generateWAMessageContent, areJidsSameUser, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, makeWaconnet, makeInMemoryStore, MediaType, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, initInMemoryKeyStore, MiscMessageGenerationOptions, useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WAMediaUpload, mentionedJid, processTime, Browser, MessageType,
Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, DisconnectReason, WAconnet, getStream, WAProto, isBaileys, AnyMessageContent, templateMessage, InteractiveMessage, Header } = require("@whiskeysockets/baileys");

module.exports = superstar = async (superstar, m, chatUpdate, store) => {
try {
// Message type handlers
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const sender = m.key.fromMe
? superstar.user.id.split(":")[0] || superstar.user.id
: m.key.participant || m.key.remoteJid;

const senderNumber = sender.split('@')[0];
const budy = (typeof m.text === 'string' ? m.text : '');
const prefa = ["", "!", ".", ",", "🐤", "🗿"];
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '/';

// Buat Grup
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

// Database And Lain"
const botNumber = await superstar.decodeJid(superstar.user.id);
const isBot = botNumber.includes(senderNumber);
const newOwner = fs.readFileSync("./lib/owner.json")
const isOwner = newOwner.includes(m.sender);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);
const isMedia = /image|video|sticker|audio/.test(mime);

// function Group
const groupMetadata = isGroup ? await superstar.groupMetadata(m.chat).catch((e) => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

// My Func
const { 
smsg, 
sendGmail, 
formatSize, 
isUrl, 
generateMessageTag, 
getBuffer, 
getSizeMedia, 
runtime, 
fetchJson, 
sleep } = require('./lib/myfunc');

// fungsi waktu real time
const time = moment.tz("Asia/Jakarta").format("HH:mm:ss");

// Cmd in Console
if (m.message) {
console.log('\x1b[30m--------------------\x1b[0m');
console.log(chalk.bgHex("#e74c3c").bold(`➤ New Messages`));
console.log(
chalk.bgHex("#00FF00").black(
` ⭔ Time: ${new Date().toLocaleString()} \n` +
` ⭔ Message: ${m.body || m.mtype} \n` +
` ⭔ Body: ${m.pushname} \n` +
` ⭔ JID: ${senderNumber}`
)
);
if (m.isGroup) {
console.log(
chalk.bgHex("#00FF00").black(
` ⭔ Grup: ${groupName} \n` +
` ⭔ GroupJid: ${m.chat}`
)
);
}
console.log();
} 


const qkontak = {
key: {
participant: `0@s.whatsapp.net`,
...(botNumber ? {
remoteJid: `status@broadcast`
} : {})
},
message: {
'contactMessage': {
'displayName': `${global.namaown}`,
'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=263715305976:+263773023860\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
sendEphemeral: true
}}
}

const reply = (teks) => {
superstar.sendMessage(from, { text : teks }, { quoted : m })
}

const reaction = async (jidss, emoji) => {
superstar.sendMessage(jidss, { react: { text: emoji, key: m.key }})}

if (autoread) {
  superstar.readMessages([m.key]);
}

if (global.autoTyping) {
  superstar.sendPresenceUpdate("composing", from);
}

if (global.autoRecording) {
  superstar.sendPresenceUpdate("recording", from);
}

superstar.sendPresenceUpdate("unavailable", from);

if (global.autorecordtype) {
  let xeonRecordTypes = ["recording", "composing"];
  let selectedRecordType = xeonRecordTypes[Math.floor(Math.random() * xeonRecordTypes.length)];
  superstar.sendPresenceUpdate(selectedRecordType, from);
}

if (autobio) {
  superstar.updateProfileStatus(`pretty 𝙼𝙳 𝙱𝙾𝚃 is Online✅ | |Runtime ${runtime(process.uptime())}`)
    .catch(err => console.error("Error updating status:", err));
}

if (m.sender.startsWith("92") && global.anti92 === true) {
  return superstar.updateBlockStatus(m.sender, "block");
}

if (m.message.extendedTextMessage?.contextInfo?.mentionedJid?.includes(global.owner + "@s.whatsapp.net")) {
  if (!m.quoted) {
    reply("Owner is currently offline, please wait for a response");
    setTimeout(() => {
      superstar.sendMessage(m.key.remoteJid, { delete: m.key });
    }, 2000);
  }
}


 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
switch (command) {        
case "public": { 
if (!isBot) return reply(`Feature for owner only`)
superstar.public = true
reply(`Successfully✅ Changed Bot Mode To Public`)
}
break;


//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
case "self":
case "private": { 
if (!isBot) return reply(`Feature for owner only`)
superstar.public = false
reply(`Successfully✅ Changed Bot Mode To Private`)
}
break;

        
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
        case 'autotyping':
                if (!isBot) return reply(mess.owner)
        
                if (args.length < 1) return reply(`Example ${prefix + command} on/off`)
        
                if (q === 'on') {

                    autoTyping = true

                    reply(`Successfully ✅changed auto-typing to ${q}`)

                } else if (q === 'off') {

                    autoTyping = false

                    reply(`Successfully ✅changed auto-typing to ${q}`)

                }

                break;
                
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
        case 'autorecording':
                
                if (!isBot) return reply(mess.owner)
                if (args.length < 1) return reply(`Example ${prefix + command} on/off`)
                if (q === 'on') {
                    autoRecording = true

                    reply(`Successfully ✅changed auto-recording to ${q}`)

                } else if (q === 'off') {

                    autoRecording = false

                    reply(`Successfully changed auto-recording to ${q} `)

                }

                break;
                
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
        case 'autoread': 

  if (!isBot) return reply(mess.owner)
  if (args.length < 1) return reply(`Example ${prefix + command} on/off`)
  if (q === 'on') {
    autoread = true
    reply(`Successfully✅ changed auto-read to ${q}`)
  } else if (q === 'off') {
    autoread = false
    reply(`Successfully✅ changed auto-read to ${q}`)
  }
  break;


//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
    case 'gitclone': {

		      if (!text) return m.reply(`provide  a github link.\n *Example:* .gitclone https://github.com/superstar-zimtk/Pretty-Md`)

if (!text.includes('github.com')) return reply(`Is that a GitHub repo link ?!`)

let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i

    let [, user3, repo] = text.match(regex1) || []

    repo = repo.replace(/.git$/, '')

    let url = `https://api.github.com/repos/${user3}/${repo}/zipball`

    let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]

    await superstar.sendMessage(m.chat, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: m }).catch((err) => reply("error"))

		    }
	      break; 
	      
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//	           
    case 'uptime':
    case 'runtime': {
      m.reply(`🔸 *${runtime(process.uptime())}*`)
    }
    break;
   
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//       
     

 case 'autobio':
  if (!isBot) return reply(mess.owner)
  if (args.length < 1) return reply(`Example ${prefix + command} on/off`)
  if (q === 'on') {
    autobio = true
    reply(`Auto-bio Successfully✅ changed to ${q}`)
  } else if (q === 'off') {
    autobio = false
    reply(`Auto-bio Successfully✅ changed to ${q} `)
  }
  break;  
           
        
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//    
   case 'setprefix':
                if (!isBot) return reply (mess.owner)
                if (!text) return reply(`Example : ${prefix + command} desired prefix`)
                global.prefix = text
                reply(`Prefix successfully changed to ${text}`)
                break;
        
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//      

 /*  case 'chanelid': case 'idch': {
if (!text) return reply("example : link channel")
if (!text.includes("https://whatsapp.com/channel/")) return reply("Link is not valid bro ")
let result = text.split('https://whatsapp.com/channel/')[1]
let res = await superstar.newsletterMetadata("invite", result)
let teks = `
* *ID :* ${res.id}
* *Name :* ${res.name}
* *Follower:* ${res.subscribers}
* *Status :* ${res.state}
* *Verified :* ${res.verification == "VERIFIED" ? "Verified" : "No"}
`
return reply(teks)
}
break;     */
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
  
  
        
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//       
        
        
case 'play':{
const axios = require('axios');
const yts = require("yt-search");
const fs = require("fs");
const path = require("path");

  try {
    if (!text) return m.reply("What song do you want to download?");

    let search = await yts(text);
    let link = search.all[0].url;

    const apis = [
      `https://xploader-api.vercel.app/ytmp3?url=${link}`,
      `https://apis.davidcyriltech.my.id/youtube/mp3?url=${link}`,
      `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${link}`,
      `https://api.dreaded.site/api/ytdl/audio?url=${link}`
       ];

    for (const api of apis) {
      try {
        let data = await fetchJson(api);

        // Checking if the API response is successful
        if (data.status === 200 || data.success) {
          let videoUrl = data.result?.downloadUrl || data.url;
          let outputFileName = `${search.all[0].title.replace(/[^a-zA-Z0-9 ]/g, "")}.mp3`;
          let outputPath = path.join(__dirname, outputFileName);

          const response = await axios({
            url: videoUrl,
            method: "GET",
            responseType: "stream"
          });

          if (response.status !== 200) {
            m.reply("sorry but the API endpoint didn't respond correctly. Try again later.");
            continue;
          }
		ffmpeg(response.data)
            .toFormat("mp3")
            .save(outputPath)
            .on("end", async () => {
              await superstar.sendMessage(
                m.chat,
                {
                  document: { url: outputPath },
                  mimetype: "audio/mp3",
		  caption: "",
                  fileName: outputFileName,
                },
                { quoted: m }
              );
              fs.unlinkSync(outputPath);
            })
            .on("error", (err) => {
              m.reply("Download failed\n" + err.message);
            });

          return;
        }
      } catch (e) {
        // Continue to the next API if one fails
        continue;
      }
   }

    // If no APIs succeeded
    m.reply("An error occurred. All APIs might be down or unable to process the request.");
  } catch (error) {
    m.reply("Download failed\n" + error.message);
  }
}
	  break;
	  
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
case "gcjid":
case "idgc": {
if (!isBot) return m.reply(msg.owner)
if (!isGroup) return m.reply(msg.group)
m.reply(`${m.chat}`)
}
break;
        
        
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
        
case 'profilegc':
case 'gcpp':      
case  'getppgc':
if (!isGroup) return 
reply(mess.wait)
try {
var ppimg = await superstar.profilePictureUrl(m.chat, 'image')
} catch (err) {
console.log(err)
var ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
await superstar.sendMessage(m.chat, { image: { url: ppimg }}, { quoted: m })
break;

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
        
 case 'grouplink': case 'linkgc':{
if (!isBot && !isAdmins) return reply(` The command is for group only`)
if (!m.isGroup) return reply(mess.only.group)
if (!isBotAdmins) return reply(`Bot must Be Admin to eliminate the command`)
let response = await superstar.groupInviteCode(m.chat)
superstar.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`, m, { detectLink: true })
}
break;
        
  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//      
        
         
        case 'poll': {
	if (!isBot) return m.reply(mess.owner)
            let [poll, opt] = text.split("|")
            if (text.split("|") < 2)
                return await reply(
                    `Mention question and atleast 2 options\nExample: ${prefix}poll Who is best admin?|Xeon,Cheems,Doge...`
                )
            let options = []
            for (let i of opt.split(',')) {
                options.push(i)
            }
            await superstar.sendMessage(m.chat, {
                poll: {
                    name: poll,
                    values: options
                }
            })
        }
        break;
        
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//        
        
case 'add':
                if (!m.isGroup) return m.reply(mess.group)
                if(!isBot) return m.reply(mess.owner)
                if (!isBotAdmins) return reply(mess.admin)
                let blockwwww = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await superstar.groupParticipantsUpdate(m.chat, [blockwwww], 'add')
                m.reply(mess.done)
                break; 
        
        
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
        
 case 'infogc': {
if(!isGroup) return reply("The command for groups only")
let _meta = await superstar.groupMetadata(m.chat)
console.log(_meta)
let _img = await superstar.profilePictureUrl(_meta.id, 'image') 
let caption = `${_meta.subject} - Created on ${moment(_meta.creation * 1000).format('ll')}\n\n` +
`*${_meta.participants.length}* Total Members\n*${_meta.participants.filter(x => x.admin === 'admin').length}* Admin\n*${_meta.participants.filter(x => x.admin === null).length}* Not Admin\n\n` +
`Group ID : ${_meta.id}`
await superstar.sendMessage(m.chat,{
caption,
image: await getBuffer(_img)
},
{ quoted: m }
)
}
break;
        
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//  
        
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
        
     case 'setnamegc':
     case 'setgroupname':
     case 'setsubject':
                if (!m.isGroup) return m.reply(mess.group)
                if (!isAdmins && !isGroupAdmins && !isBot) return reply(mess.admin)
                if (!isBotAdmins) return m.reply(mess.admin)
                if (!text) return reply('Text ?')
                await superstar.groupUpdateSubject(m.chat, text)
                m.reply(mess.done)
                break;

 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//       
        
 case "leave": case "leavegc": {
if (!isBot) return m.reply("Owner Command dude 🙃")
if (!isGroup) return m.reply("The command is for Group only.")
await m.reply("Successfully left the group by Pretty MD\nMessage : _Superstar Adios..._")
await sleep(2000)
await superstar.groupLeave(m.chat)
}
break;
        
 //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//      
        
 case 'restart':
if (!isBot) return m.reply(mess.owner)
if (text) return
m.reply(`🔄restarting  pretty 𝙼𝙳...`)
m.reply(mess.sucess)
await sleep(1500)
process.exit()
break;
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
        
 case "toroundvideo":      
 case "toptv": {
if (/video/.test(qmsg.mimetype)) {
if ((qmsg).seconds > 30) return reply("maximum video duration 30 seconds!")
let ptv = await generateWAMessageFromContent(m.chat, proto.Message.fromObject({ ptvMessage: qmsg }), { userJid: m.chat, quoted: m })
superstar.relayMessage(m.chat, ptv.message, { messageId: ptv.key.id })
} else { 
return reply("Reply to a video content.")
}
}
break;
  
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━// 
        
case 'listblock':{
if (!isBot) return m.reply(mess.owner)
let block = await superstar.fetchBlocklist()
reply('List Block :\n\n' + `Total : ${block == undefined ? '*0* BLOCKED NUMBERS' : '*' + block.length + '* Blocked Contacts'}\n` + block.map(v => '🔸 ' + v.replace(/@.+/, '')).join`\n`)
}
break;



//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//     
default:
if (budy.startsWith('>')) {
if (!isBot) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await m.reply(evaled);
} catch (err) {
m.reply(String(err));
}
}

if (budy.startsWith('<')) {
if (!isBot) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}

}
} catch (err) {
console.log(require("util").format(err));
}
};

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
});
