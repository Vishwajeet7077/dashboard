import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BubbleGraphBySector = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const margin = { top: 50, right: 50, bottom: 100, left: 50 };
    const width = 1600 - margin.left - margin.right;
    const height = 900 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Group data by sector
    const groupedData = d3.group(data, d => d[1].sector);

    // Calculate average intensity and relevance for each sector
    const sectorAverages = Array.from(groupedData, ([sector, values]) => ({
      sector,
      intensity: d3.mean(values, d => d[1].intensity),
      relevance: d3.mean(values, d => d[1].relevance)
    }));

    // Scale for bubble size
    const sizeScale = d3.scaleLinear()
      .domain([0, d3.max(sectorAverages, d => d.relevance)])
      .range([5, 50]);

    // X scale for sectors
    const xScale = d3.scaleBand()
      .domain(sectorAverages.map(d => d.sector))
      .range([0, width])
      .padding(0.1);

    // Y scale for average intensity
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(sectorAverages, d => d.intensity)])
      .range([height, 0]);

    // Add bubbles
    svg.selectAll('circle')
      .data(sectorAverages)
      .enter().append('circle')
      .attr('cx', d => xScale(d.sector) + xScale.bandwidth() / 2)
      .attr('cy', d => yScale(d.intensity))
      .attr('r', d => sizeScale(d.relevance))
      .style('fill', 'steelblue')
      .style('cursor', 'pointer') // Add cursor pointer
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-45)');

    // Add y-axis
    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Add x-label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.top + 20)
      .attr('text-anchor', 'middle')
      .text('Sector')
      .attr('class', 'text-gray-800'); // Add text color

    // Add y-label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Intensity')
      .attr('class', 'text-gray-800'); // Add text color

    // Tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    function handleMouseOver(event, d) {
      tooltip.transition()
        .duration(200)
        .style('opacity', .9);
      tooltip.html(`<strong>Sector:</strong> ${d.sector}<br/><strong>Average Intensity:</strong> ${d.intensity}<br/><strong>Average Relevance:</strong> ${d.relevance}`)
        .style('left', `${event.pageX}px`)
        .style('top', `${event.pageY - 28}px`);
    }

    function handleMouseOut() {
      tooltip.transition()
        .duration(500)
        .style('opacity', 0);
    }
  }, [data]);

  return <svg ref={svgRef} className="rounded-lg border border-gray-300"></svg>;
};

export default BubbleGraphBySector;
