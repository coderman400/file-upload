const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const app = express();
const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

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

app.get('/', (req, res) => {
  res.send('Backend is working');
});
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.post('/write', (req, res) => {
  console.log('POST /write route accessed');
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);

  res.send('POST /write route is working');
});



// app.post('/write', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded');
//     }

//     const pdfPath = path.join(__dirname, 'uploads', req.file.filename);
//     const dataBuffer = fs.readFileSync(pdfPath);
//     const pdfData = await pdfParse(dataBuffer);
//     const text = pdfData.text; 

//     const response = await sheets.spreadsheets.values.get({
//         spreadsheetId: SPREADSHEET_ID,
//         range: 'Sheet1!A:A',  
//       });
  
//       const numRows = response.data.values ? response.data.values.length : 0;
//       const nextRow = numRows + 1; 

//     const values = [
//       [req.body.title, text], 
//     ];

//     await sheets.spreadsheets.values.update({
//       spreadsheetId: SPREADSHEET_ID,
//       range: `Sheet1!A${nextRow}`,
//       valueInputOption: 'RAW',
//       requestBody: { values },
//     });
//     //cleanup
//     fs.unlinkSync(pdfPath);

//     res.send('File uploaded and text written to Sheets successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error processing the file');
//   }
// });

app.listen(3000, () => console.log('Server running on port 3000'));
