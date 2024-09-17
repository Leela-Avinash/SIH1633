import { promises as fs } from 'fs';
import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import multer from 'multer';
import path from 'path';
import language from '@google-cloud/language';
import Fuse from 'fuse.js';
// Initialize Google Cloud Document AI client
const clientdoc = new DocumentProcessorServiceClient({
  keyFilename: 'D:/Codes/Web_Development/SIH1633/Backend/natural-pipe-435404-f3-3e7d64d566f7.json',
});
const clientlan = new language.LanguageServiceClient({
  keyFilename: 'D:/Codes/Web_Development/SIH1633/Backend/natural-pipe-435404-f3-3e7d64d566f7.json', // Update with the path to your JSON credentials file
});
const name = "J Prema";

let entities = [];

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
    const [result] = await clientdoc.processDocument(request);
    // console.log(result);
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
const analyzeEntities = async (text) => {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Call the API to detect entities
  const [result] = await clientlan.analyzeEntities({ document });
  const resentities = result.entities;
  resentities.forEach(entity => {
    if (entity.type === 'PERSON' || entity.type === 'ORGANIZATION' || entity.type === 'OTHER' || entity.type === 'DATE') {
      entities.push(entity);
    }
  });

  // entities.forEach(entity => {
  //   console.log(`Entity: ${entity.name}`);
  //   console.log(`Type: ${entity.type}`);
  //   console.log(`Salience: ${entity.salience}`);  // Salience gives the importance of the entity in the text
  //   console.log('Metadata:', entity.metadata);  // Additional information like Wikipedia link (if available)
  //   console.log('---');
  // });
}


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
      const role = req.params.role;
      let modelName;
      if (role === "alumni") {
        modelName = Alumni;
      } else if (role === "student") {
        modelName = Student;
      } else {
        return res.status(400).json({ message: "Invalid role" });
      }
      const user = await modelName.findOne({_id: req.params.id});
      // Process the uploaded file using Document AI
      const result = await processDocumentAI(req.file.path);
      let protext = result.text;
      let lines = protext.split('\n');
      for (let i = 0; i < lines.length; i++) {
        await analyzeEntities(lines[i]);
      }
      const fuse = new Fuse(entities, {
        keys: ['name'],  // Search in name field
        includeScore: true,
        threshold: 0.3,  // Adjust the threshold for fuzziness
      });
      const matchedName = fuse.search(user.fname+" "+user.lname);  // Search for the name of the user
      const matchedClg=fuse.search(user.collegeName);
      const matchedDegree=fuse.search(user.degree);
      const matchedYear=fuse.search(user.year);
      const matchedRoll=fuse.search(user.rollnumber);
      console.log(matchedName,matchedClg,matchedClg ,matchedDegree,matchedYear,matchedRoll);

      if (matchedName && matchedClg && matchedDegree && matchedYear && matchedRoll) {
        // Response if match found
        res.json({
          message: 'Alumni Verified Successfully',
          // extractedName: bestMatch,
          // similarityScore: similarityScore,
        });
      } else {
        // Response if no match found
        res.status(400).json({
          message: 'Alumni Verification Failed: No match found.',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error while processing document' });
    }
  });
};

// Function to analyze entities using Natural Language API
export default docAI;
