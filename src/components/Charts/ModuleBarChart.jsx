// components/ModuleBarChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const ModuleBarChart = ({ modules }) => {
  const data = modules.map(mod => ({
    name: mod.module,
    Passed: mod.testCases.filter(tc => tc.status === 'Passed').length,
    Failed: mod.testCases.filter(tc => tc.status === 'Failed').length,
  }));

  return (
    <div style={{ width: 500, height: 400, margin: '20px' }}>
      <h4>Pass/Fail Bar Chart</h4>
      <BarChart width={450} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Passed" fill="#00C49F" />
        <Bar dataKey="Failed" fill="#FF8042" />
      </BarChart>
    </div>
  );
};

export default ModuleBarChart;
