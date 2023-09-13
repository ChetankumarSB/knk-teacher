import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';


const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // You can customize the line color
        strokeWidth: 2 // You can set the line thickness
      }
    ]
  };
  
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2 // optional, default 3
  };

