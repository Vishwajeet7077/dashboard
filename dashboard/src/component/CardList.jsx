import React from 'react';
import CardComponent from './CardComponent';
import BubbleGraph from './bubblegraph';
import SectorAverageGraph from "./SectorAverageGraph";
import SearchBox from './searchbox';
import RegionGraph from './region';
const CardList = ({ dataArray, value, querySet, onSearchSubmit, sectorAverages }) => {
  // console.log("Type of dataArray :",typeof(dataArray));
  // console.log("type of dataArray[0] :", typeof(dataArray[0]));
  // console.log("Values in dataArray[0] :", dataArray[0]);

  const filteredData = dataArray.filter(item => {
    // Check if the item has the 'queryset' attribute and if its value matches the desired 'value'
    // console.log(typeof(item), item)
    // console.log(typeof(item[1][querySet]))
    return typeof item[1][querySet] === 'string' && item[1][querySet].includes(value);
  });

  // console.log(filteredData);
  const bubbledata = [
    { region: 'Region 1', intensity: 50, likelihood: 3 },
    { region: 'Region 2', intensity: 70, likelihood: 4 },
    { region: 'Region 3', intensity: 40, likelihood: 2 },
    // Add more data points as needed
  ];
  console.log("Bubble Data :", bubbledata)
  console.log("dataArray :", dataArray)
  const data = (querySet) ? filteredData : dataArray;
  return (
    <div className="flex flex-col items-center space-y-6 mt-4">
      <h3 className='text-6xl bold'>Insights into Industrial Sector</h3>
      <div className='border-4 rounded-3xl' >
        <BubbleGraph data={dataArray} />
      </div>

      <div className='border-4 rounded-3xl p-5 w-[80%] h-[100%]' >
        <SectorAverageGraph sectorAverages={sectorAverages} /> {/* Render the SectorAverageGraph component */}
      </div>
      <div className='border-4 rounded-3xl p-5 w-[80%] h-[100%]' >
        <RegionGraph data={dataArray} />
      </div>

      <SearchBox onSearchSubmit={onSearchSubmit} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4">
        {data.map((item, index) => (
          typeof item === 'object' && (
            <div key={index + 1} className="border border-gray-300 rounded-lg shadow-md">
              <CardComponent data={item} sectorAverages={sectorAverages} />
            </div>
          )
        ))}
      </div>
    </div>
  )
}

export default CardList;
