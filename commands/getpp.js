const axios = require('axios');

async function getppCommand(sock, chatId, message) {
    try {
        // Check if user is owner
        const isOwner = message.key.fromMe; // Fixed variable name from 'msg' to 'message'
        if (!isOwner) {
            await sock.sendMessage(chatId, { 
                text: '😡Command only for the owner.' 
            });
            return;
        }

        let userToAnalyze;
        
        // Check for mentioned users
        if (message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
            userToAnalyze = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }
        // Check for replied message
        else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            userToAnalyze = message.message.extendedTextMessage.contextInfo.participant;
        }
        
        if (!userToAnalyze) {
            await sock.sendMessage(chatId, { 
                text: 'Please mention someone or reply to their message to get their profile picture🫴'
                });
            return;
        }

        try {
            // Get user's profile picture
            let profilePic;
            try {
                profilePic = await sock.profilePictureUrl(userToAnalyze, 'image');
            } catch {
                profilePic = 'https://files.catbox.moe/lvcwnf.jpg'; // Default image
            }

            // Send the profile picture to the chat
            await sock.sendMessage(chatId, {
                image: { url: profilePic },
                caption: `\n\n _🔸 hey 👋 Sucess in getting profile of: @${userToAnalyze.split('@')[0]} ✅._`,
                mentions: [userToAnalyze]
            });

        } catch (error) {
            console.error('⚠️Error in getpp command:', error);
            await sock.sendMessage(chatId, {
                text: '🉐Failed to retrieve profile picture. The user might not have one set.'
            });
        }
    } catch (error) {
        console.error('⚠️Unexpected error in getppCommand:', error);
    }
}

module.exports = getppCommand; // Moved outside the function
