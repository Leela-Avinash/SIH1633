import React, { useState } from "react";

const AlumniDocumentVerification = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
      setIsUploading(true);
      // Simulate file upload logic here
      setTimeout(() => {
        alert("File uploaded successfully!");
        setIsUploading(false);
        setFile(null);
      }, 2000);
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-bgcol1 via-bgcol2 to-bgcol3 h-screen w-full">
      <div className="w-5/12 h-12/11 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Alumni Document Verification using AI
        </h1>
        <p className="text-gray-600 mb-6">
          Upload your document for secure and AI-powered verification.
        </p>
        <div className="border-2 border-dashed border-gray-300 py-10 px-6 rounded-lg mb-4">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="mt-2 text-blue-600 font-semibold">
              {file ? file.name : "Drop your file here to start uploading"}
            </span>
            <span className="text-sm text-gray-400">
              For reliable results, keep your file under 1GB.
            </span>
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <button
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={handleSubmit}
          disabled={isUploading}
        >
          {isUploading
            ? "Uploading..."
            : file
            ? "Upload Document"
            : "Select a file to upload"}
        </button>
      </div>
    </div>
  );
};

export default AlumniDocumentVerification;
