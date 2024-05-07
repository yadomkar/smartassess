import React, { useState } from 'react';

function SolutionUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid PDF file.');
      event.target.value = null; // Reset file input field
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('No file selected or the file is not a valid PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8080/solution', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Solution uploaded successfully!');
      } else {
        alert('Failed to upload the solution.');
      }
    } catch (error) {
      console.error('Error uploading solution:', error);
      alert('An error occurred during the upload.');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Solution</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file:mr-2"
        />
        <button
          onClick={handleFileUpload}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default SolutionUpload;
