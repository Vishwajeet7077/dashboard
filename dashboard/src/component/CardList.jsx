import React from 'react';
import CardComponent from './CardComponent';
import BubbleGraph from './bubblegraph';
import SearchBox from './searchbox';

const CardList = ({ dataArray }) => {

  return (
    <>
      <SearchBox dataArray={dataArray} />
      <BubbleGraph data={dataArray} />
      <div className="flex flex-wrap justify-center">
        {dataArray.map((item, index) => (
          // Ensure item is an object before rendering
          typeof item === 'object' && (
            <CardComponent key={index + 1} data={item} />
          )
        ))}
      </div>
    </>
  );
}

export default CardList;
