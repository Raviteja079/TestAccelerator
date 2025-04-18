// components/ModuleStackedBarChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const ModuleStackedBarChart = ({ modules }) => {
  const data = modules.map(mod => ({
    name: mod.module,
    Passed: mod.testCases.filter(tc => tc.status === 'Passed').length,
    Failed: mod.testCases.filter(tc => tc.status === 'Failed').length,
  }));

  return (
    <div style={{ width: 500, height: 400, margin: '20px' }}>
      <h4>Stacked Bar Chart (Pass + Fail)</h4>
      <BarChart width={450} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Passed" stackId="a" fill="#00C49F" />
        <Bar dataKey="Failed" stackId="a" fill="#FF8042" />
      </BarChart>
    </div>
  );
};

export default ModuleStackedBarChart;
