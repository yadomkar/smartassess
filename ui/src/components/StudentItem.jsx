import React, { useState } from 'react';

function StudentItem({ studentId, status, studentName }) {
  const [file, setFile] = useState(null);
  const [grades, setGrades] = useState(null);
  const [isGradesPopupOpen, setIsGradesPopupOpen] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid PDF file.');
      event.target.value = null; // Reset the file input field
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('No file selected or the file is not a valid PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', studentId);

    try {
      const response = await fetch(`http://localhost:8000/homeworks/upload/?student_id=${studentId}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully!');
      } else {
        alert('Failed to upload the file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred during the upload.');
    }
  };

  const viewGrades = async () => {
    try {
      const response = await fetch(`http://localhost:8000/homeworks/detail/?student_id=${studentId}`);

      if (response.ok) {
        const data = await response.json();
        setGrades(data);
        setIsGradesPopupOpen(true);
      } else {
        alert('Failed to fetch the grade.');
      }
    } catch (error) {
      console.error('Error fetching grade:', error);
      alert('An error occurred while fetching the grade.');
    }
  };

  const closePopup = () => setIsGradesPopupOpen(false);

  const statusColor = status === 'graded' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className="flex items-center justify-between bg-white shadow-lg rounded-lg p-6 border border-gray-200 mb-4">
      <div className="flex items-center space-x-4">
        <span className="text-2xl font-bold text-gray-800">{studentName}</span>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file:mr-2"
        />
        <button
          onClick={handleFileUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Submit
        </button>
        <button
          onClick={viewGrades}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          View Grades
        </button>
        <div className={`h-6 w-6 rounded-full ${statusColor}`}></div>
      </div>

      {/* Grades Popup */}
      {isGradesPopupOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
            <h3 className="text-2xl font-bold">Grades for {studentName}</h3>
            <p><strong>Grade:</strong> {grades?.grade ?? 'N/A'}</p>
            {/* <p><strong>Comments:</strong> {grades?.comments ?? 'N/A'}</p> */}
            <p><strong>Feedback:</strong> {grades?.feedback ?? 'N/A'}</p>
            <button
              onClick={closePopup}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentItem;