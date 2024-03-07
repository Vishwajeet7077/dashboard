import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SectorAverageGraph = ({ sectorAverages }) => {
  const data = Object.entries(sectorAverages).map(([sector, average]) => ({ sector, average }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="sector" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="average" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SectorAverageGraph;
