// components/ModulePieChart.js
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#00C49F', '#FF8042']; // green = pass, orange = fail

const ModulePieChart = ({ module }) => {
    console.log(module, 'testing')
  const passed = module.testCases.filter(tc => tc.status === 'Passed').length;
  const failed = module.testCases.filter(tc => tc.status === 'Failed').length;

  const data = [
    { name: 'Passed', value: passed },
    { name: 'Failed', value: failed },
  ];

  return (
    <div style={{ width: 300, height: 300, margin: '20px' }}>
      <h4>{module.module} Test Summary</h4>
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx={125}
          cy={125}
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={3}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ModulePieChart;
