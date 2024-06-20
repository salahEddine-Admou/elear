// src/components/LineChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', progress: 400 },
  { name: 'Feb', progress: 300 },
  { name: 'Mar', progress: 500 },
  { name: 'Apr', progress: 700 },
  { name: 'May', progress: 600 },
  { name: 'Jun', progress: 800 },
];

const CustomLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDashoffset="1 1" stroke="#FF9900" />
        <XAxis dataKey="name" stroke="#00000"/>
        <YAxis stroke="#00000" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="progress" stroke="#FF9900" strokeWidth={4} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
