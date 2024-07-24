import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import { format, parseISO } from 'date-fns';

const MonthlyPieChart = ({id}) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API URL
    const apiUrl = `http://localhost:8083/emp/task/${id}`;

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || data.length === 0) {
          throw new Error('No data found');
        }

        const hoursPerMonth = data?.reduce((acc, task) => {
          const date = parseISO(task.date);
          const month = format(date, 'MMMM yyyy'); // Format as full month name and year
          const startTime = new Date(`1970-01-01T${task.startTime}`);
          const endTime = new Date(`1970-01-01T${task.endTime}`);
          const adjustedDiffInMs = (endTime - startTime) >= 0 ? (endTime - startTime) : (endTime - startTime) + 24 * 60 * 60 * 1000;

          const duration = (adjustedDiffInMs) / (1000 * 60 * 60); // Convert milliseconds to hours

          if (!acc[month]) {
            acc[month] = 0;
          }
          acc[month] += duration;

          return acc;
        }, {});

        // Prepare data for the chart
        const labels = Object.keys(hoursPerMonth);
        const dataSet = Object.values(hoursPerMonth);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'HOURS WORKED PER MONTH',
              data: dataSet,
              backgroundColor: [
                 '#3cba9f',
                '#e8c3b9',
                '#c45850',
                '#F9A825',
                '#9C27B0',
                '#EF5350',
                '#FFC107',
                '#607D8B' ,
                 '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#8e5ea2',
                
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#8e5ea2',
                '#3cba9f',
                '#e8c3b9',
                '#c45850',
                '#F9A825',
                '#9C27B0',
                '#EF5350',
                '#FFC107',
                '#607D8B'
              ]
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='mx-auto pt-3 flex flex-col items-center' style={{width:'80%', height: '480px' }}>
      <h1 className='text-lg text-zinc-600 text-center'>Employee Hours Worked per Day</h1>
      <Pie data={chartData} />
    </div>
  );
};

export default MonthlyPieChart;
