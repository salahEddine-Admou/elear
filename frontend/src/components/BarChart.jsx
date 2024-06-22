// src/components/BarChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'DevOps', students: 110  },
  { name: 'Cyber', students: 75 },
  { name: 'React', students: 90 },
  { name: 'Scrum', students: 25 },
];

const CustomBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid stroke="#00000" strokeWidth={4} />
        <XAxis stroke="#00000" dataKey="name" />
        <YAxis stroke="#00000"/>
        <Tooltip stroke="#00000" />
        <Legend />
        <Bar dataKey="students" fill="#FF9900" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
