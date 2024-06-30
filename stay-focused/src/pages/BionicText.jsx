import React, { useState } from 'react';
import axios from 'axios';

const BionicText = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleGenerateBionicText = async () => {
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5000/generate-bionic-text',
        data: formData,
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'bionic_text.txt');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error generating bionic text:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-purple-900 text-white p-8 flex flex-col items-center min-h-screen font-sans">
      <h1 className="text-5xl font-bold mt-8 mb-6">Bionic Text Generator</h1>
      <div className="mb-4 flex flex-col items-center">
      <label htmlFor="fileInput" className="bg-gray-800 hover:bg-white text-white hover:text-purple-500 text-lg border-2 hover:border-purple-500 font-bold py-4 px-8 rounded-lg cursor-pointer">
          Choose PDF File
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        {selectedFile && <p className="mt-2">Selected File: {selectedFile.name}</p>}
      </div>
      <button
        className="bg-gray-800 hover:bg-white text-white hover:text-purple-500 border-2 hover:border-purple-500 font-bold text-lg py-4 px-8 rounded-lg cursor-pointer"
        onClick={handleGenerateBionicText}
        disabled={!selectedFile}
      >
        Generate Bionic Text
      </button>
    </div>
  );
};

export default BionicText;
