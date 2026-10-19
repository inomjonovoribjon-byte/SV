export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const BOT_TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const { latitude, longitude } = req.body;

    const text = `📍 Yangi joylashuv:\nKenglik: ${latitude}\nUzunlik: ${longitude}\nGoogle Maps: https://google.com{latitude},${longitude}`;
    const url = `https://telegram.org{BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: text })
        });

        const data = await response.json();
        return res.status(200).json({ success: data.ok });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
