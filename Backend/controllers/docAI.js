import { promises as fs } from 'fs';
import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import multer from 'multer';
import path from 'path';

// Initialize Google Cloud Document AI client
const client = new DocumentProcessorServiceClient({
  keyFilename: 'D:/AVIATOR CODESPACE/Unknown2.0/Backend/natural-pipe-435404-f3-3e7d64d566f7.json',
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
    },
  });

// Configure Multer for file uploads
const upload = multer({ storage: storage }).single('file');

// Function to process document using Document AI
const processDocumentAI = async (filePath) => {
  try {
    const projectId = 'natural-pipe-435404-f3';
    const location = 'us';
    const processorId = '94b8703632708e60';

    // Read file and encode it
    const fileData = await fs.readFile(filePath);
    const encodedFile = Buffer.from(fileData).toString('base64');

    // Setup request for Document AI API
    const request = {
      name: `projects/${projectId}/locations/${location}/processors/${processorId}`,
      rawDocument: {
        content: encodedFile,
        mimeType: 'application/pdf', // Change if file is not PDF
      },
    };

    // Process document using Document AI
    const [result] = await client.processDocument(request);
    const { document } = result;
    const { text } = document;

    // Clean up the uploaded file after processing
    await fs.unlink(filePath);
    return { success: true, text };
  } catch (error) {
    console.error('Error processing document:', error);
    return { success: false, error: 'Failed to process the document' };
  }
};

// Controller for handling the file upload and Document AI processing
const docAI = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'File upload failed' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      // Process the uploaded file using Document AI
      const result = await processDocumentAI(req.file.path);
      
      if (result.success) {
        res.json({ text: result.text });
      } else {
        res.status(500).json({ error: result.error });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error while processing document' });
    }
  });
};  

export default docAI;
