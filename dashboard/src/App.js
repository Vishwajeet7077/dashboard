// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardList from './component/CardList';
import Card from './component/Card';
import SearchBox from './component/searchbox'; // Correct import path

const App = () => {
  const [dataArray, setDataArray] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [querySet, setQuerySet] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/');
      const data = await response.json();
      const dashboardResponse = await fetch(data.dashboard);
      const dashboardData = await dashboardResponse.json();
      const dataArray = Array.from(dashboardData.entries());
      setDataArray(dataArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilterChange = (value, queryset) => {
    setFilterValue(value);
    setQuerySet(queryset);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<CardList dataArray={dataArray} filteredData={filterValue} querySet={querySet} onSearchSubmit={handleFilterChange}/>} />
          <Route path="/details" element={<Card />} />
        </Routes>
      </Router>
      {/* Pass handleFilterChange as a prop to SearchBox */}
    </div>
  );
}

export default App;
