import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardList from './component/CardList';
import Card from './component/Card';

const App = () => {
  const [dataArray, setDataArray] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [querySet, setQuerySet] = useState('');
  const [sectorAverages, setSectorAverages] = useState({});

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

      // Group data by sector
      const groupedData = {};
      dataArray.forEach(([index, item]) => {
        const {sector} = item;
        if (!groupedData[sector]) {
          groupedData[sector] = [];
        }
        groupedData[sector].push(item);
      });

      // Calculate average relevance for each sector
      const averages = {};
      Object.entries(groupedData).forEach(([sector, items]) => {
        const sumRelevance = items.reduce((acc, curr) => acc + curr.relevance, 0);
        const averageRelevance = sumRelevance / items.length;
        averages[sector] = averageRelevance;
      });

      // Set sector averages state
      setSectorAverages(averages);

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
          <Route
            path="/"
            element={<CardList dataArray={dataArray} value={filterValue} querySet={querySet} onSearchSubmit={handleFilterChange} sectorAverages={sectorAverages} />}
          />
          <Route path="/details" element={<Card />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
