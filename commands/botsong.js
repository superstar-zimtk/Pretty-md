
const fs = require('fs');
const path = require('path');

async function botsongCommand(sock, chatId) {
    try {
        const audioPath = path.join(__dirname, '../assets/botsong.mp3');
        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');

        // Check if audio and image exist
        if (!fs.existsSync(audioPath)) {
            return await sock.sendMessage(chatId, { text: '⚠️ botsong.mp3 not found in assets folder.' });
        }

        const audioBuffer = fs.readFileSync(audioPath);
        const imageBuffer = fs.existsSync(imagePath) ? fs.readFileSync(imagePath) : null;

        await sock.sendMessage(chatId, {
            audio: audioBuffer,
            mimetype: 'audio/mp4',
            ptt: false,
            contextInfo: {
                externalAdReply: {
                    title: "BEN 10 MD Theme Song",
                    body: "🔥 Powered by Superstar",
                    thumbnail: imageBuffer,
                    mediaType: 2,
                    mediaUrl: "https://whatsapp.com/channel/0029Vb9qprVJuyAJxcTO252t",
                    sourceUrl: "https://whatsapp.com/channel/0029Vb9qprVJuyAJxcTO252t"
                }
            }
        });
    } catch (error) {
        console.error("Error in botsong command:", error);
        await sock.sendMessage(chatId, { text: '❌ Error sending bot song.' });
    }
}

module.exports = botsongCommand;
