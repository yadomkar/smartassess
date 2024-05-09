// App.js
import React from 'react';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import SolutionUpload from './components/SolutionUpload';
import RubricUpload from './components/RubricUpload';
import QuestionUpload from './components/QuestionUpload';
import TrySomethingCool from './components/TrySomethingCool';

function App() {
  return (
    <div className="bg-gradient-to-r from-sky-200 via-sky-300 to-sky-400 min-h-screen text-gray-900 font-sans">
      <Navbar />
      <div className="container mx-auto py-12 px-6">
        <div className="flex">
          <div className="w-3/4 pr-8 space-y-6">
            <StudentList />
          </div>
          <div className="w-1/4 space-y-6">
            <QuestionUpload />
            <SolutionUpload />
            <RubricUpload />
            <TrySomethingCool />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
