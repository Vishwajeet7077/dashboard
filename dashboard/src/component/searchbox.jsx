import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBox = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/data/'); // Replace '/api/data/' with your API endpoint
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Here you can filter the data based on the search query and selected option
    console.log(`Searching for ${searchQuery} in ${selectedOption}`);
    // Example filtering:
    const filteredData = data.filter(item => item[selectedOption] === searchQuery);
    console.log(filteredData);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter search query..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <select onChange={(e) => handleOptionSelect(e.target.value)}>
        <option value="">Select option...</option>
        <option value="sector">Sector</option>
        <option value="region">Region</option>
        <option value="title">Title</option>
      </select>
      <button onClick={handleSearchSubmit}>Search</button>
    </div>
  );
};

export default SearchBox;
