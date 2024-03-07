import React from "react";
import { useLocation } from 'react-router-dom';

const Card = () => {
  const location = useLocation();
  const { data } = location.state;

  return (
    <div className="max-w-sm mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-4">
          <h2 className="text-lg font-semibold text-gray-800">{data.title}</h2>
          <hr className="my-2 border-t-2 border-gray-300" />

          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <strong>Topic:</strong> {data.topic}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Region:</strong> {data.region}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Published:</strong> {data.published}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Source:</strong> {data.source}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Start Year:</strong> {data.start_year}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Added:</strong> {data.added}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Country:</strong> {data.country}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Pestle:</strong> {data.pestle}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Relevance:</strong> {data.relevance}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Likelihood:</strong> {data.likelihood}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Impact:</strong> {data.impact}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Intensity:</strong> {data.intensity}
            </p>
          </div>

          <div className="mt-4">
            <a href={data.url} className="text-blue-500 hover:text-blue-700 text-sm">Visit</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
