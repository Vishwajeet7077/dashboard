import React, { useState } from 'react';

const SearchBox = ({ onSearchSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    onSearchSubmit(searchQuery, selectedOption);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2">
      <input
        type="text"
        placeholder="Enter search query..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <select
        onChange={handleOptionSelect}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      >
        <option value="">Select option...</option>
        <option value="sector">Sector</option>
        <option value="region">Region</option>
        <option value="title">Title</option>
      </select>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
