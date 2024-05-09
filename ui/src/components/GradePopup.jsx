import React from 'react';

function GradePopup({ gradeData, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-lg">Grades and Feedback</h2>
        <p>Grade: {gradeData.grade}</p>
        <p>Feedback: {gradeData.feedback}</p>
        <button onClick={onClose} className="bg-red-500 text-white px-2 py-1 rounded">Close</button>
      </div>
    </div>
  );
}

export default GradePopup;
