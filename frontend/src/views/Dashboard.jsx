<<<<<<< HEAD
﻿import React from 'react'

const Dashboard = () => {
  return (
    <div>
     dashbord 
    </div>
  )
}

export default Dashboard
=======

import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import CustomLineChart from '../components/LineChart';
import CustomBarChart from '../components/BarChart';
import CustomPieChart from '../components/PieChart';
import StatCard from '../components/StatCard';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import EventNoteIcon from '@mui/icons-material/EventNote';


const Dashboard = () => {
  return (
    <Container maxWidth="lg" className="mt-8 mb-8">
      <Typography variant="h4" className="mb-6 text-black-500">Dashboard</Typography>
      <Grid container spacing={3}>
        {/* Statistic Cards */}
        <Grid item xs={10} md={4}>
          <StatCard title="Students" value="200" icon={<GroupIcon />} color="border-2	border-solid border-orange-500" />
        </Grid>
        <Grid item xs={10} md={4}>
          <StatCard title="Instructors" value="10" icon={<SchoolIcon />} color="border-2	border-solid border-orange-500" />
        </Grid>
        <Grid item xs={10} md={4}>
          <StatCard title="Enrollments" value="300" icon={<EventNoteIcon />} color="border-2	border-solid border-orange-500" />
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} md={8}>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <Typography variant="h6" className="mb-4 text-black-500">Course Progress</Typography>
            <div className="h-64">
              <CustomLineChart />
            </div>
          </div>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={4}>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <Typography variant="h6" className="mb-4 text-black-500">Student Enrollment</Typography>
            <div className="h-64">
              <CustomBarChart />
            </div>
          </div>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12}>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <Typography variant="h6" className="mb-4 text-black-500">Course Status</Typography>
            <div className="h-80">
              <CustomPieChart />
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;

>>>>>>> aa17e615cf6c958c94d848f0888ba0a740b7c2f7
