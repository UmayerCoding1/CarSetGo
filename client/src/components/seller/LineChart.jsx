import React, { useEffect, useState } from 'react';
const chartData =[
    {
      name: 'Total Sales',
      color: '#4CAF50',
      values: [4, 6, 8, 5, 7, 9, 6,0]
    },
    {
      name: 'Total Bookings',
      color: '#2196F3',
      values: [3, 5, 7, 4, 6, 8, 5,1]
    }
  ]
// Static data for one month
const data = {
  days: [1, 5, 10, 15, 20, 25, 30,31],
  datasets: chartData
};

const config = {
  padding: { top: 20, right: 30, bottom: 30, left: 40 },
  gridLines: 5
};

const LineChart = () => {
    const [selectedMonth,setSelectedMonth] =useState(new Date().toLocaleString('default', { month: 'long' }));
   
   
  useEffect(() => {
    initChart();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    const svg = document.getElementById('lineChart');
    svg.innerHTML = '<g class="grid-lines"></g><g class="lines"></g><g class="points"></g><g class="labels"></g>';
    initChart();
  };

  const initChart = () => {
    const svg = document.getElementById('lineChart');
    const width = svg.clientWidth;
    const height = svg.clientHeight;

    const xScale = (width - config.padding.left - config.padding.right) / (data.days.length - 1 || 1);
    const yMax = Math.max(...data.datasets.flatMap(d => d.values));
    const yScale = (height - config.padding.top - config.padding.bottom) / yMax;

    drawGridLines(svg, width, height, yMax, yScale);
    data.datasets.forEach((dataset, index) => {
      drawLine(svg, dataset, xScale, yScale, index);
      drawPoints(svg, dataset, xScale, yScale, index);
    });
    drawLabels(svg, width, height);
    addInteractivity(svg, xScale, yScale);
  };

  const drawGridLines = (svg, width, height, yMax, yScale) => {
    const gridLines = svg.querySelector('.grid-lines');
    const step = yMax / config.gridLines;
    for (let i = 0; i <= config.gridLines; i++) {
      const y = height - config.padding.bottom - (i * step * yScale);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', config.padding.left);
      line.setAttribute('y1', y);
      line.setAttribute('x2', width - config.padding.right);
      line.setAttribute('y2', y);
      line.setAttribute('class', 'grid-line');
      line.setAttribute('stroke', '#E5E7EB');
      gridLines.appendChild(line);
    }
  };

  const drawLine = (svg, dataset, xScale, yScale, index) => {
    const lines = svg.querySelector('.lines');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let d = `M ${config.padding.left} ${svg.clientHeight - config.padding.bottom - dataset.values[0] * yScale}`;
    dataset.values.forEach((value, i) => {
      const x = config.padding.left + (i * xScale);
      const y = svg.clientHeight - config.padding.bottom - (value * yScale);
      d += ` L ${x} ${y}`;
    });
    path.setAttribute('d', d);
    path.setAttribute('class', 'line');
    path.setAttribute('stroke', dataset.color);
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none'); // Prevent black fill
    path.setAttribute('data-index', index);
    lines.appendChild(path);
  };
  

  const drawPoints = (svg, dataset, xScale, yScale, index) => {
    const points = svg.querySelector('.points');
    dataset.values.forEach((value, i) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const x = config.padding.left + (i * xScale);
      const y = svg.clientHeight - config.padding.bottom - (value * yScale);
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', 4);
      circle.setAttribute('class', 'point');
      circle.setAttribute('fill', dataset.color);
      circle.setAttribute('data-value', value);
      circle.setAttribute('data-day', data.days[i]);
      circle.setAttribute('data-dataset', dataset.name);
      points.appendChild(circle);
    });
  };

  const drawLabels = (svg, width, height) => {
    const labels = svg.querySelector('.labels');
    data.days.forEach((day, i) => {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      const x = config.padding.left + (i * (width - config.padding.left - config.padding.right) / (data.days.length - 1 || 1));
      const y = height - config.padding.bottom + 20;
      text.setAttribute('x', x);
      text.setAttribute('y', y);
      text.setAttribute('class', 'label');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', '#6B7280');
      text.textContent = day;
      labels.appendChild(text);
    });
  };

  const addInteractivity = (svg, xScale, yScale) => {
    const tooltip = document.getElementById('tooltip');
    const points = svg.querySelectorAll('.point');
    const lines = svg.querySelectorAll('.line');
    const legendItems = document.querySelectorAll('.legend-item');

    points.forEach(point => {
      point.addEventListener('mouseover', e => {
        const value = e.target.getAttribute('data-value');
        const day = e.target.getAttribute('data-day');
        const dataset = e.target.getAttribute('data-dataset');
        tooltip.style.opacity = '1';
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
        tooltip.textContent = `${dataset}: ${value} (Day ${day})`;
        e.target.setAttribute('r', '6');
      });
      point.addEventListener('mouseout', (e) => {
        tooltip.style.opacity = '0';
        e.target.setAttribute('r', '4');
      });
    });

    legendItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        const line = lines[index];
        const points = svg.querySelectorAll(`.point[data-dataset="${data.datasets[index].name}"]`);
        const isVisible = line.style.opacity !== '0';
        line.style.opacity = isVisible ? '0' : '1';
        points.forEach(point => (point.style.opacity = isVisible ? '0' : '1'));
        item.style.opacity = isVisible ? '0.5' : '1';
      });
    });
  };

  return (
    <div className="w-full block max-w-5xl bg-gradient-to-br from-white via-gray-50 to-gray-100 p-8 rounded-2xl shadow-2xl border border-gray-200 relative">
      <div className='flex flex-col sm:flex-row items-center justify-between mb-2'>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2 sm:mb-0 tracking-tight">Monthly Sales & Bookings</h1>
        <div className="flex justify-end">
         
        </div>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-blue-400/30 via-gray-300/30 to-transparent mb-6"></div>
      <div className="relative w-full mb-5 bg-white rounded-xl shadow-lg border border-gray-100 p-2">
        <svg
          id="lineChart"
          width="100%"
          height="100%"
          style={{ backgroundColor: 'white', borderRadius: '12px' }}
        >
          <g className="grid-lines"></g>
          <g className="lines"></g>
          <g className="points"></g>
          <g className="labels"></g>
        </svg>
      </div>
      <div className="flex justify-center flex-wrap gap-6 mt-6">
        {data.datasets.map((d, i) => (
          <div
            key={i}
            className="legend-item flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full bg-white shadow border border-gray-200 hover:bg-blue-50 transition-all duration-200"
          >
            <span
              className="w-4 h-4 rounded-full border border-gray-300 shadow"
              style={{ backgroundColor: d.color }}
            ></span>
            <span className="text-sm font-semibold text-slate-700">{d.name}</span>
          </div>
        ))}
      </div>
      <div
        id="tooltip"
        className="tooltip absolute bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold pointer-events-none opacity-0 transition-opacity z-50 shadow-lg border border-blue-400"
        style={{ minWidth: '120px', textAlign: 'center' }}
      ></div>
    </div>
  );
};

export default LineChart;
