import React from "react";
import Navbar from "./components/Navbar";
import StudentList from "./components/StudentList";
import SolutionUpload from "./components/SolutionUpload";
import RubricUpload from "./components/RubricUpload";
import QuestionUpload from "./components/QuestionUpload";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="flex">
          <div className="w-3/4 pr-8">
            <StudentList />
          </div>
          <div className="w-1/4">
            <QuestionUpload />
            <SolutionUpload />
            <RubricUpload />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
