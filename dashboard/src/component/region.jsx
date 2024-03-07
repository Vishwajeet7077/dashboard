import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RegionGraph = ({ data }) => {
    const regionColors = {
        'Northern America': '#ff0000', // Red
        'Central America': '#00ff00', // Green
        'World': '#0000ff', // Blue
        'Western Africa': '#ffa500', // Orange
        'Western Asia': '#800080', // Purple
        'Eastern Europe': '#00ffff', // Cyan
        'Central Africa': '#ffff00', // Yellow
        'Northern Africa': '#ff1493', // Pink
        'Southern Africa': '#8a2be2', // BlueViolet
        'Southern Asia': '#32cd32', // LimeGreen
        'Central Asia': '#ff4500', // OrangeRed
        'Eastern Asia': '#20b2aa', // LightSeaGreen
        'South America': '#ff6347', // Tomato
        'South-Eastern Asia': '#4682b4', // SteelBlue
        'Eastern Africa': '#7fff00', // Chartreuse
        'Europe': '#6a5acd', // SlateBlue
        'Western Europe': '#cd5c5c', // IndianRed
        'Northern Europe': '#2e8b57', // SeaGreen
        'Southern Europe': '#ff7f50', // Coral
        'Oceania': '#00ff7f', // SpringGreen
        'Africa': '#1e90ff', // DodgerBlue
        'Asia': '#8b008b', // DarkMagenta
        'world': '#808080', // Gray
    };

    const convertedData = data.map(([index, obj]) => ({
        region: obj.region,
        intensity: obj.intensity,
        likelihood: obj.likelihood
    }));

    return (
        <ScatterChart
            width={1600}
            height={800}
            data={convertedData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
            <XAxis dataKey="region" />
            <YAxis dataKey="intensity" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            {/* Increase bubble size and assign unique color to each bubble */}
            <Scatter dataKey="likelihood" fill={(data) => regionColors[data.region]} size={50} />
        </ScatterChart>
    );
}

export default RegionGraph;
