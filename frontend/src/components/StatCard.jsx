import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <Card className={`shadow-lg rounded-lg ${color} text-white`}>
      <CardContent>
        <div className="flex items-center">
          <div className="mr-4">
            {icon}
          </div>
          <div>
            <Typography variant="h6" component="h2" className="font-bold">
              {title}
            </Typography>
            <Typography variant="h3" component="p">
              {value}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;