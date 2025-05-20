import React, { useEffect } from 'react';

const PieChart = () => {
  const data = {
    totalSales: 850,
    totalBookings: 350
  };

  useEffect(() => {
    drawPieChart();
  }, []);

  const drawPieChart = () => {
    const svg = document.getElementById('pieChart');
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    const radius = Math.min(width, height) / 2;
    const centerX = width / 2;
    const centerY = height / 2;

    const total = data.totalSales + data.totalBookings;
    const salesAngle = (data.totalSales / total) * 360;
    const bookingsAngle = (data.totalBookings / total) * 360;

    // Draw sales slice
    const salesSlice = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const salesPath = describeArc(centerX, centerY, radius, 0, salesAngle);
    salesSlice.setAttribute('d', salesPath);
    salesSlice.setAttribute('fill', '#4CAF50');
    svg.appendChild(salesSlice);

    // Draw bookings slice
    const bookingsSlice = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const bookingsPath = describeArc(centerX, centerY, radius, salesAngle, 360);
    bookingsSlice.setAttribute('d', bookingsPath);
    bookingsSlice.setAttribute('fill', '#2196F3');
    svg.appendChild(bookingsSlice);
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", x, y,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="w-full block h-[30%] max-w-3xl bg-white  rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-center text-slate-800 mb-2 ">Annual Sales & Bookings Distribution</h2>
      <div className="relative w-full h-80">
        <svg
          id="pieChart"
          width="100%"
          height="100%"
          viewBox="0 0 300 300"
          style={{ backgroundColor: 'white', borderRadius: '12px' }}
        />
      </div>
      <div className="flex justify-center gap-8">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-[#4CAF50]"></span>
          <span className="text-sm text-slate-700">Total Sales: {data.totalSales}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-[#2196F3]"></span>
          <span className="text-sm text-slate-700">Total Bookings: {data.totalBookings}</span>
        </div>
      </div>
    </div>
  );
};

export default PieChart;