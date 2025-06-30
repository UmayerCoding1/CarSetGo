import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({revenueData}) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col items-center">
                  <h2 className="text-lg font-semibold mb-4 text-blue-800">Total Revenue (Last 6 Months)</h2>
                  <Bar data={revenueData} options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } }
                  }} height={220} />
                </div>
    );
};

export default BarChart;