const fetch = require('node-fetch');
const yts = require('yt-search');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function videoCommand(sock, chatId, message) {
    try {
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text;
        const searchQuery = text.split(' ').slice(1).join(' ').trim();
        
        if (!searchQuery) {
            await sock.sendMessage(chatId, { text: 'What video do you want to download?' }, { quoted: message });
            return;
        }

        // Determine if input is a YouTube link
        let videoUrl = '';
        if (searchQuery.startsWith('http://') || searchQuery.startsWith('https://')) {
            videoUrl = searchQuery;
        } else {
            // Search YouTube for the video
            const { videos } = await yts(searchQuery);
            if (!videos || videos.length === 0) {
                await sock.sendMessage(chatId, { text: 'No videos found!' }, { quoted: message });
                return;
            }
            videoUrl = videos[0].url;
        }


        // Validate YouTube URL
        let urls = videoUrl.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/|playlist\?list=)?)([a-zA-Z0-9_-]{11})/gi);
        if (!urls) {
            await sock.sendMessage(chatId, { text: 'This is not a valid YouTube link!' }, { quoted: message });
            return;
        }

        const apiUrl = `https://api.dreaded.site/api/ytdl/video?url=${encodeURIComponent(videoUrl)}`;
        
        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            await sock.sendMessage(chatId, { text: 'Failed to fetch video from the API.' }, { quoted: message });
            return;
        }

        const data = await response.json();

        if (!data || !data.result || !data.result.download || !data.result.download.url) {
            await sock.sendMessage(chatId, { text: 'Failed to get a valid download link from the API.' }, { quoted: message });
            return;
        }

        const videoDownloadUrl = data.result.download.url;
        const title = data.result.download.filename || 'video.mp4';
        const filename = title;


        // Download the video file first
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
        const tempFile = path.join(tempDir, `${Date.now()}.mp4`);
        const convertedFile = path.join(tempDir, `converted_${Date.now()}.mp4`);
        
        const videoRes = await fetch(videoDownloadUrl);
        if (!videoRes.ok) {
            await sock.sendMessage(chatId, { text: 'Failed to download the video file.' }, { quoted: message });
            return;
        }
        
        const buffer = await videoRes.buffer();
        if (!buffer || buffer.length < 1024) {
            await sock.sendMessage(chatId, { text: 'Downloaded file is empty or too small.' }, { quoted: message });
            return;
        }
        
        fs.writeFileSync(tempFile, buffer);

        try {
            await execPromise(`ffmpeg -i "${tempFile}" -c:v libx264 -c:a aac -preset fast -crf 23 -movflags +faststart "${convertedFile}"`);
            
            // Check if conversion was successful
            const stats = fs.statSync(convertedFile);
            if (stats.size < 1024) {
                throw new Error('Conversion failed - file too small');
            }
            
            // Send the converted video
            await sock.sendMessage(chatId, {
                video: { url: convertedFile },
                mimetype: 'video/mp4',
                fileName: filename,
                caption: `*${title}*\n\n*_Download by 𝐉ᴜɴᴇ 𝐌ᴅ_*`
            }, { quoted: message });
            
        } catch (conversionError) {
            console.log('📹 Conversion failed, trying original file:', conversionError.message);
            // If conversion fails, try sending original file
            await sock.sendMessage(chatId, {
                video: { url: tempFile },
                mimetype: 'video/mp4',
                fileName: filename,
                caption: `*${title}*\n\n*_Download by 𝐉ᴜɴᴇ 𝐌ᴅ_*`
            }, { quoted: message });
        }

        // Clean up temp files
        setTimeout(() => {
            try {
                if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
                if (fs.existsSync(convertedFile)) fs.unlinkSync(convertedFile);
            } catch {}
        }, 5000);


    } catch (error) {
        console.log('📹 Video Command Error:', error.message);
        await sock.sendMessage(chatId, { text: 'Download failed: ' + error.message }, { quoted: message });
    }
}

module.exports = videoCommand; 