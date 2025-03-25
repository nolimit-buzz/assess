// pages/api/parse-document.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import PDFParser from 'pdf-parse';
import { createWorker } from 'tesseract.js';
import Papa from 'papaparse';

export const dynamic = 'force-dynamic';

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the multipart form data
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = file.filepath;
    const fileExt = path.extname(file.originalFilename).toLowerCase();
    
    let content = '';
    
    // Process different file types
    switch (fileExt) {
      case '.pdf':
        content = await parsePDF(filePath);
        break;
      case '.docx':
        content = await parseWord(filePath);
        break;
      case '.txt':
        content = await parseText(filePath);
        break;
      case '.xlsx':
      case '.xls':
        content = await parseExcel(filePath);
        break;
      case '.csv':
        content = await parseCSV(filePath);
        break;
      case '.png':
      case '.jpg':
      case '.jpeg':
        content = await parseImage(filePath);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported file format' });
    }

    // Clean up the temp file
    fs.unlinkSync(filePath);

    return res.status(200).json({ content }, {
      headers: {
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('Document parsing error:', error);
    return res.status(500).json({ error: 'Failed to parse document', details: error.message }, {
      headers: {
        'Cache-Control': 'no-store'
      }
    });
  }
}

// PDF Parser
async function parsePDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await PDFParser(dataBuffer);
  return data.text;
}

// Word Document Parser
async function parseWord(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
}

// CSV Parser
async function parseCSV(filePath) {
  const csvData = fs.readFileSync(filePath, 'utf8');
  const result = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true
  });
  
  return JSON.stringify(result.data, null, 2);
}

// Image Parser with OCR
async function parseImage(filePath) {
  const worker = await createWorker();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  
  const { data: { text } } = await worker.recognize(filePath);
  await worker.terminate();
  
  return text;
}