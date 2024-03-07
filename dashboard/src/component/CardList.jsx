import React from 'react';
import CardComponent from './CardComponent';
import BubbleGraph from './bubblegraph';
import SearchBox from './searchbox';
import { filter } from 'd3';

const CardList = ({ dataArray, filteredData, querySet, onSearchSubmit }) => {
  const filterData = dataArray.filter(([index, item]) => {
    const values = Object.values(item);
    return values.some(value =>
      typeof value === 'string' && value.toLowerCase().includes(filteredData.toLowerCase())
    );
  });
  return (
    <div className="flex flex-col items-center space-y-6 mt-4">
      <BubbleGraph data={dataArray} />

      <div className="w-full md:w-2/3">
        <SearchBox onSearchSubmit={onSearchSubmit} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4">
        {filterData.map((item, index) => (
          typeof item === 'object' && (
            <div key={index + 1} className="border border-gray-300 rounded-lg shadow-md">
              <CardComponent data={item} />
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default CardList;
