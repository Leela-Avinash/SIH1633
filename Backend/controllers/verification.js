// Import the Google Cloud client library
// const language = require('@google-cloud/language');
import language from '@google-cloud/language';
// import path from 'path';

// Load the credentials JSON file
const client = new language.LanguageServiceClient({
    keyFilename: 'D:/AVIATOR CODESPACE/Unknown2.0/Backend/natural-pipe-435404-f3-3e7d64d566f7.json', // Update with the path to your JSON credentials file
});

// Function to analyze entities using Natural Language API
const analyzeEntities=async (text) =>{
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Call the API to detect entities
  const [result] = await client.analyzeEntities({ document });
  // console.log(result);
  const entities = result.entities;
  return entities; 

  // entities.forEach(entity => {
  //   console.log(`Entity: ${entity.name}`);
  //   console.log(`Type: ${entity.type}`);
  //   console.log(`Salience: ${entity.salience}`);  // Salience gives the importance of the entity in the text
  //   console.log('Metadata:', entity.metadata);  // Additional information like Wikipedia link (if available)
  //   console.log('---');
  // });
}

// Example usage
// const extractedText = "John Doe graduated from ABC University in 2015.";
// analyzeEntities(extractedText);

// analyzeEntities("name: J. Prema Sagar");

export default analyzeEntities;