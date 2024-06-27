const express = require('express');
const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const LINE_NOTIFY_TOKEN = process.env.LINE_NOTIFY_TOKEN;

app.use(express.json());

async function sendLineNotification(message) {
    try {
        const headers = {
            'Authorization': `Bearer ${LINE_NOTIFY_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        const body = qs.stringify({ message });

        const response = await axios.post('https://notify-api.line.me/api/notify', body, { headers });

        console.log('Notification sent:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending Line notification:', error.message);
        throw error;
    }
}

app.post('/send-line-notification', async (req, res) => {
    const { message } = req.body;
    console.log({message});

    try {
        const result = await sendLineNotification(message);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send Line notification' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// PORT=3000
// NODE_ENV=development
// LINE_NOTIFY_TOKEN=2gWb1cbc9PzO7sWgEtHT50UUHyFf2kh3HZA8PlqzeiF