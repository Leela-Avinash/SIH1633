import React, { useState } from 'react';
import axios from 'axios';

const DocUpload = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setExtractedText(response.data.text);
    } catch (error) {
      console.error('Error processing the file:', error);
      alert('An error occurred while processing the file.');
    } finally {
      setIsLoading(false); // Hide loader after the request is finished
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Document AI PDF Processor</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? 'Processing...' : 'Upload and Process'}
          </button>
        </form>

        {isLoading && (
          <div className="flex justify-center items-center mt-6">
            <div className="spinner"></div>
          </div>
        )}

        {extractedText && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Extracted Text:</h2>
            <p className="text-gray-800 whitespace-pre-wrap">{extractedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocUpload;