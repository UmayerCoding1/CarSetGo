import React from "react";
import { Pie } from "react-chartjs-2";

const PeiChart = ({userPieData}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4 text-blue-800">
        User Distribution
      </h2>
      <Pie
        data={userPieData}
        options={{
          responsive: true,
          plugins: { legend: { position: "bottom" } },
        }}
        height={220}
      />
    </div>
  );
};

export default PeiChart;
