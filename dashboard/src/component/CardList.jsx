import React, { useState, useEffect } from 'react';
import CardComponent from './CardComponent';
import BubbleGraph from './bubblegraph';
import SectorAverageGraph from "./SectorAverageGraph";
import SearchBox from './searchbox';
import RegionGraph from './region';

const CardList = ({ dataArray, value, querySet, onSearchSubmit, sectorAverages }) => {
  const [filterThreshold, setFilterThreshold] = useState('');
  const [filterOperator, setFilterOperator] = useState('');

  const handleFilter = () => {
    // Implement filtering logic here
    const filteredData = dataArray.filter(item => {
      const itemValue = parseInt(item[1][querySet]);
      const threshold = parseInt(filterThreshold);

      if (filterOperator === 'greater') {
        return itemValue > threshold;
      } else if (filterOperator === 'less') {
        return itemValue < threshold;
      }
      return true;
    });
    return filteredData;
  };

  useEffect(() => {
    handleFilter();
  }, [filterThreshold, filterOperator]);

  return (
    <div className="flex flex-col items-center space-y-6 mt-4">
      <h3 className='text-6xl mt-4 bold'>INSIGHTS INTO INDUSTRIAL SECTOR</h3>
      <div className='border-4 rounded-3xl w-[80%]' >
        <BubbleGraph data={dataArray} />
      </div>

      <div className='border-4 rounded-3xl p-5 w-[80%] h-[100%]' >
        <SectorAverageGraph sectorAverages={sectorAverages} />
      </div>
      <div className='border-4 rounded-3xl p-5 w-[80%] h-[100%]' >
        <RegionGraph data={dataArray} />
      </div>

      <SearchBox onSearchSubmit={onSearchSubmit} />

      <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2">
        <select
          onChange={(e) => setFilterOperator(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select operator...</option>
          <option value="greater">Greater than</option>
          <option value="less">Less than</option>
        </select>

        <input
          type="number"
          placeholder="Threshold value"
          value={filterThreshold}
          onChange={(e) => setFilterThreshold(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4">
        {handleFilter().map((item, index) => (
          typeof item === 'object' && (
            <div key={index + 1} className="border border-gray-300 rounded-lg shadow-md">
              <CardComponent data={item} sectorAverages={sectorAverages} />
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default CardList;
