import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

const Card = ({ dataArray }) => {
  const location = useLocation();
  const { data } = location.state;

  const [hoveredIntensity, setHoveredIntensity] = useState(null);

  const handleMouseEnter = (intensity) => {
    setHoveredIntensity(intensity);
  };

  const handleMouseLeave = () => {
    setHoveredIntensity(null);
  };

  const renderLikelihoodStars = (likelihood) => {
    const maxStars = 5;
    const filledStars = likelihood;
    const emptyStars = maxStars - filledStars;
    const stars = [];

    // Add filled stars
    for (let i = 0; i < filledStars; i++) {
      stars.push(<span key={i} className="text-2xl text-yellow-400">&#9733;</span>);
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={filledStars + i} className="text-2xl text-gray-400">&#9734;</span>);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-4">
          <h2 className="text-3xl font-semibold text-gray-800">{data.title}</h2>
          <hr className="my-2 border-t-2 border-gray-300" />
          <div className="mt-4">
            <p className="text-lg text-gray-600">
              <strong>Topic:</strong> {data.topic}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Region:</strong> {data.region}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Published:</strong> {data.published}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Source:</strong> {data.source}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Start Year:</strong> {data.start_year}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Added:</strong> {data.added}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Country:</strong> {data.country}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Pestle:</strong> {data.pestle}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Relevance:</strong> {data.relevance}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Likelihood:</strong> {renderLikelihoodStars(data.likelihood)}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Impact:</strong> {data.impact}
            </p>
            <div className="relative">
              <div
                className="bg-blue-500 h-4 rounded-lg"
                style={{ width: `${data.intensity / 2}%` }}
                onMouseEnter={() => handleMouseEnter(data.intensity)}
                onMouseLeave={handleMouseLeave}
              />
              {hoveredIntensity !== null && (
                <div className="absolute top-0 left-0 mt-3 ml-1 text-base text-gray-600">
                  {hoveredIntensity}
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <a href={data.url} className="text-blue-500 hover:text-blue-700 text-lg">Visit</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
