import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const SectorAverageGraph = ({ sectorAverages }) => {
  const data = Object.entries(sectorAverages).map(([sector, average]) => ({ sector, average }));

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={data}>
        <XAxis dataKey="sector">
          <Label value="SECTOR" position="bottom" style={{ textAnchor: 'middle', marginTop: "10px" }} />
        </XAxis>
        <YAxis>
          <Label value="RELEVANCE" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="average" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SectorAverageGraph;
