import React from 'react';
import StudentItem from './StudentItem';

function StudentList() {
  const students = Array.from({ length: 10 }, (_, i) => `Student${i + 1}`);

  return (
    <div className="bg-gray-50 p-6 shadow-md rounded-lg space-y-4">
      {students.map(student => (
        <StudentItem key={student} studentId={student} />
      ))}
    </div>
  );
}

export default StudentList;
