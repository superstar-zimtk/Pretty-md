const axios = require('axios');

const ANIMU_BASE = 'https://api.some-random-api.com/animu';

function normalizeType(input) {
    const lower = (input || '').toLowerCase();
    if (lower === 'facepalm' || lower === 'face_palm') return 'face-palm';
    if (lower === 'quote' || lower === 'animu-quote' || lower === 'animuquote') return 'quote';
    return lower;
}

async function sendAnimu(sock, chatId, message, type) {
    const endpoint = `${ANIMU_BASE}/${type}`;
    const res = await axios.get(endpoint);
    const data = res.data || {};

    // Prefer link (gif/image). Fallback to text quote if available
    if (data.link) {
        await sock.sendMessage(
            chatId,
            { image: { url: data.link }, caption: `anime: ${type}` },
            { quoted: message }
        );
        return;
    }
    if (data.quote) {
        await sock.sendMessage(
            chatId,
            { text: data.quote },
            { quoted: message }
        );
        return;
    }

    await sock.sendMessage(
        chatId,
        { text: '❌ Failed to fetch animu.' },
        { quoted: message }
    );
}

async function animeCommand(sock, chatId, message, args) {
    const subArg = args && args[0] ? args[0] : '';
    const sub = normalizeType(subArg);

    const supported = [
        'nom', 'poke', 'cry', 'kiss', 'pat', 'hug', 'wink', 'face-palm', 'quote'
    ];

    try {
        if (!sub) {
            // Fetch supported types from API for dynamic help
            try {
                const res = await axios.get(ANIMU_BASE);
                const apiTypes = res.data && res.data.types ? res.data.types.map(s => s.replace('/animu/', '')).join(', ') : supported.join(', ');
                await sock.sendMessage(chatId, { text: `Usage: .animu <type>\nTypes: ${apiTypes}` }, { quoted: message });
            } catch {
                await sock.sendMessage(chatId, { text: `Usage: .animu <type>\nTypes: ${supported.join(', ')}` }, { quoted: message });
            }
            return;
        }

        if (!supported.includes(sub)) {
            await sock.sendMessage(chatId, { text: `❌ Unsupported type: ${sub}. Try one of: ${supported.join(', ')}` }, { quoted: message });
            return;
        }

        await sendAnimu(sock, chatId, message, sub);
    } catch (err) {
        console.error('Error in animu command:', err);
        await sock.sendMessage(chatId, { text: '❌ An error occurred while fetching animu.' }, { quoted: message });
    }
}

module.exports = { animeCommand };


