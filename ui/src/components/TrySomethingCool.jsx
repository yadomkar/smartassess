// components/TrySomethingCool.js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import 'tailwindcss/tailwind.css';
import '../App.css';

function TrySomethingCool() {
  const [coolMessage, setCoolMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setIsPopupOpen(true); // Show the popup with a loading state

    try {
      const response = await fetch('http://localhost:8000/somethingcool/');

      if (response.ok) {
        const data = await response.json();
        setCoolMessage(data.result || 'No content found.');
      } else {
        setCoolMessage('Error: Failed to get something cool!');
      }
    } catch (error) {
      console.error('Error fetching something cool:', error);
      setCoolMessage('Error: An error occurred while fetching something cool.');
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCoolMessage('');
  };

  return (
    <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-semibold text-white mb-4">Try Something Cool</h2>
      <button
        onClick={handleClick}
        className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg shadow hover:bg-blue-50 hover:scale-105 transform transition-transform"
      >
        Click Me!
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-5xl space-y-4 overflow-y-auto">
            <h3 className="text-2xl font-semibold">Response from API</h3>
            {isLoading ? (
              <div className="text-center mt-6">
                <p>Loading...</p>
                <div className="loader mx-auto mb-4"></div> {/* Add the loading spinner */}
                {/* Add a spinner or loader for better feedback */}
              </div>
            ) : (
              <div className="prose max-w-none mt-6">
                <ReactMarkdown>{coolMessage}</ReactMarkdown>
              </div>
            )}
            <button
              onClick={closePopup}
              className="bg-red-600 text-white font-semibold py-2 px-4 mt-6 rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrySomethingCool;
