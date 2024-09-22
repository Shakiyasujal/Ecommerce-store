import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* Optional logo icon */}
      <div className="rounded-full bg-indigo-800 p-1">
        <span className="text-white text-lg font-bold">S</span>
      </div>

      <h1 className="text-2xl font-bold text-indigo-800 tracking-wide">
        SHK <span className="text-gray-800">STORE</span>
      </h1>
    </div>
  );
}

export default Logo;
