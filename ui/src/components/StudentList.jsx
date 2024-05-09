import React, { useEffect, useState } from 'react';
import StudentItem from './StudentItem';

function StudentList() {
  const [students, setStudents] = useState([]);

  const fetchStudentData = async () => {
    try {
      const response = await fetch('http://localhost:8000/homeworks/status/');
      if (response.ok) {
        const data = await response.json();
        setStudents(data); // Assuming data is an array of objects
      } else {
        console.error('Failed to fetch students data');
      }
    } catch (error) {
      console.error('Error fetching students data:', error);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchStudentData();

    // Periodic polling every 30 seconds
    const intervalId = setInterval(fetchStudentData, 30000);
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="bg-gray-50 p-6 shadow-md rounded-lg space-y-4">
      {students.length > 0 ? (
        students.map((student, index) => (
          <StudentItem key={index} studentId={student.student} status={student.status} studentName={student.student_name}/>
        ))
      ) : (
        <p className="text-center text-gray-600">No student data available.</p>
      )}
    </div>
  );
}

export default StudentList;
