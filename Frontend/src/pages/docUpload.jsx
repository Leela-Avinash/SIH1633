import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function DocUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // To manage loading state
  const navigate=useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please upload a file!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setIsLoading(true); // Show loader while processing

    try {
      const response = await axios.post('http://localhost:5000/api/users/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Send cookies along with the request
      });

      setExtractedText(response.data.message);
      navigate('/dashboard');
      
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
          <div className="loader"></div>
        </div>
        )}

        {extractedText && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Extracted Text:</h2>
            <textarea
              rows="10"
              cols="100"
              value={extractedText}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DocUpload;
