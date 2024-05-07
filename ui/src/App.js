import React from 'react';
import StudentList from './components/StudentList';
import SolutionUpload from './components/SolutionUpload';
import RubricUpload from './components/RubricUpload';

function App() {
  return (
    <div className="flex p-6 space-x-4">
      {/* Left side - Student list occupying 3/4th */}
      <div className="w-3/4">
        <StudentList />
      </div>

      {/* Right side - Teacher's solution and rubric upload occupying the remaining 1/4th */}
      <div className="w-1/4 space-y-4 bg-gray-50 p-4 rounded-lg shadow-md">
        {/* Solution Upload */}
        <SolutionUpload />
        
        {/* Rubric Upload */}
        <RubricUpload />
      </div>
    </div>
  );
}

export default App;
