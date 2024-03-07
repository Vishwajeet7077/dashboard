import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BubbleGraph = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    // Group data by sector
    const groupedData = d3.group(data, d => d.sector);

    // Calculate average relevance for each sector
    const sectorAverages = Array.from(groupedData, ([sector, values]) => ({
      sector,
      averageRelevance: d3.mean(values, d => d.relevance)
    }));

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const xScale = d3.scaleBand()
      .domain(sectorAverages.map(d => d.sector))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(sectorAverages, d => d.averageRelevance)])
      .range([height - margin.bottom, margin.top]);

    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(sectorAverages, d => d.averageRelevance)]);

    svg.selectAll('circle')
      .data(sectorAverages)
      .enter().append('circle')
      .attr('cx', d => xScale(d.sector) + xScale.bandwidth() / 2)
      .attr('cy', d => yScale(d.averageRelevance))
      .attr('r', d => d.averageRelevance * 5) // Adjust radius scale
      .attr('fill', d => colorScale(d.averageRelevance));

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Add y-axis
    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Add x-axis label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - margin.bottom / 2)
      .attr('text-anchor', 'middle')
      .text('Sector');

    // Add y-axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', margin.left / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Average Relevance');
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BubbleGraph;
