const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const auth = new google.auth.GoogleAuth({
    credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      projectId: process.env.GOOGLE_PROJECT_ID,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = '1FBFC1Gh-WxnZlcb9R4Iw5smsFxkbw8Yt7A0lRAEE2ak';

app.get('/read', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A1:D10',
    });
    res.json(response.data.values);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/write', async (req, res) => {
  const { values } = req.body; 
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A4',
      valueInputOption: 'RAW',
      requestBody: { values },
    });
    res.send('Data written successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
