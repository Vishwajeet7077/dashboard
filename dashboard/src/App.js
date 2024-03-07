import React, { useState, useEffect } from 'react';
import CardList from './component/CardList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from './component/Card';

const App = () => {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then(response => response.json())
      .then(data => {
        return fetch(data.dashboard);
      })
      .then(response => response.json())
      .then(data => {
        const dataArray = Array.from(data.entries());
        setDataArray(dataArray);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<CardList dataArray={dataArray} />} />
          <Route path="/details" element={<Card />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
