var { downloadContentFromMessage } = require('@whiskeysockets/baileys');
var { exec } = require('child_process');
var fs = require('fs');
const ffmpeg = require('ffmpeg-static');

async function simageCommand(sock, quotedMessage, chatId) {
    try {
        if (!quotedMessage?.stickerMessage) {
            await sock.sendMessage(chatId, { text: 'Please reply to a sticker!' });
            return;
        }

        const stream = await downloadContentFromMessage(quotedMessage.stickerMessage, 'sticker');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        const tempSticker = `/app/temp/temp_${Date.now()}.webp`;
        const tempOutput = `/app/temp/image_${Date.now()}.png`;
        
        fs.writeFileSync(tempSticker, buffer);

        // Convert webp to png using ffmpeg
        await new Promise((resolve, reject) => {
            exec(`${ffmpeg} -i ${tempSticker} ${tempOutput}`, (error) => {
                if (error) reject(error);
                else resolve();
            });
        });

        await sock.sendMessage(chatId, { 
            image: fs.readFileSync(tempOutput),
            caption: '✨ Here\'s your image!' 
        });

        // Cleanup
        fs.unlinkSync(tempSticker);
        fs.unlinkSync(tempOutput);

    } catch (error) {
        console.error('Error in simage command:', error);
        await sock.sendMessage(chatId, { text: 'Failed to convert sticker to image!' });
    }
}

module.exports = simageCommand; 