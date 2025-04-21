// components/ModuleLineChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const ModuleLineChart = ({ modules }) => {
  const data = modules.map(mod => ({
    name: mod.module,
    Passed: mod.testCases.filter(tc => tc.status === 'Passed').length,
    Failed: mod.testCases.filter(tc => tc.status === 'Failed').length,
  }));

  return (
    <div style={{ width: 500, height: 400, margin: '20px' }}>
      <h4>Pass/Fail Line Chart</h4>
      <LineChart width={450} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Passed" stroke="#00C49F" />
        <Line type="natural" dataKey="Failed" stroke="#FF8042" />
      </LineChart>
    </div>
  );
};

export default ModuleLineChart;
