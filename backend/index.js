const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

app.post('/write', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const pdfPath = path.join(__dirname, 'uploads', req.file.filename);
    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text; 

    const values = [
      [text], 
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      requestBody: { values },
    });
    //cleanup
    fs.unlinkSync(pdfPath);

    res.send('File uploaded and text written to Sheets successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the file');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
