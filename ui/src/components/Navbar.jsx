// components/Navbar.js
import React from 'react';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-sky-200 via-sky-300 to-sky-400 py-8">
      <div className="container mx-auto flex justify-center">
        <h1 className="text-blue-900 text-4xl lg:text-5xl font-extrabold font-serif tracking-wider">
          SmartAssess.ai
        </h1>
      </div>
    </nav>
  );
}

export default Navbar;

