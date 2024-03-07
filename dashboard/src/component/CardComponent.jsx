import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardComponent = ({ data }) => {
  // Ensure that data is an array and has at least two elements before accessing the second element
  const dataObject = Array.isArray(data) && data.length >= 2 ? data[1] : null;

  const navigate = useNavigate();

  const handleMoreInfo = () => {
    // Redirect to details page and pass dataObject
    navigate('/details', { state: { data: dataObject } });
  };

  return (dataObject && dataObject.topic) && (
    <div className="w-full md:w-72 lg:w-80 xl:w-96 mx-auto shadow-xl rounded-lg overflow-hidden mb-4">
      <div className="flex flex-col h-full">
        <div className="px-6 py-4 flex-grow">
          <p className="font-bold text-xl mb-2 whitespace-nowrap overflow-hidden overflow-ellipsis" title={dataObject.title}>{dataObject.title}</p>
          <hr className="border-black border-1 mb-4" />
          <p className="text-purple-600">
            <strong>Insight:</strong> {dataObject.insight}
          </p>
          <p className="text-purple-600">
            <strong>Source:</strong> {dataObject.source}
          </p>
          <p className="text-purple-600">
            <strong>Region:</strong> {dataObject.region}
          </p>
          <p className="text-purple-600">
            <strong>Sector:</strong> {dataObject.sector}
          </p>
          <p className="text-purple-600">
            <strong>Relevance:</strong> {dataObject.relevance}
          </p>
          <p className="text-purple-600">
            <strong>Likelihood:</strong> {dataObject.likelihood}
          </p>
        </div>
        <button
          className="block text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={handleMoreInfo}
        >
          More Info
        </button>
      </div>
    </div>
  );
}

export default CardComponent;
