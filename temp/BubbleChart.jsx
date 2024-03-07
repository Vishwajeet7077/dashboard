import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BubbleChart = ({ data, width, height }) => {
  useEffect(() => {
    data.forEach((item, index) => {
      const svg = d3.select(`#bubble-chart-${index}`);
      
      // Define margins
      const margin = { top: 20, right: 20, bottom: 50, left: 50 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // Define scales
      const xScale = d3.scaleLinear()
        .domain([0, 10]) // assuming the likelihood range from 0 to 10
        .range([0, innerWidth]);

      const yScale = d3.scaleLinear()
        .domain([0, 10]) // assuming the relevance range from 0 to 10
        .range([innerHeight, 0]);

      const rScale = d3.scaleLinear()
        .domain([0, 10]) // assuming the relevance range from 0 to 10
        .range([5, 25]); // Set the range of bubble sizes

      // Create a group for the chart content
      const chart = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Draw bubbles
      chart.append('circle')
        .attr('cx', xScale(item.likelihood))
        .attr('cy', yScale(item.relevance))
        .attr('r', rScale(item.relevance))
        .attr('fill', 'steelblue')
        .attr('opacity', 0.7)
        .attr('stroke', 'white')
        .attr('stroke-width', 2);

      // Add labels
      chart.append('text')
        .text(item.topic)
        .attr('x', xScale(item.likelihood))
        .attr('y', yScale(item.relevance))
        .attr('text-anchor', 'middle')
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12px')
        .attr('fill', 'black')
        .attr('dy', '0.35em');

      // Draw X-axis
      chart.append('g')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .attr('font-size', '10px');

      // Draw Y-axis
      chart.append('g')
        .call(d3.axisLeft(yScale))
        .attr('font-size', '10px');
    });
  }, [data, width, height]);

  return (
    <div>
      {data.map((item, index) => (
        <svg key={index} id={`bubble-chart-${index}`} width={width} height={height}></svg>
      ))}
    </div>
  );
};

export default BubbleChart;
