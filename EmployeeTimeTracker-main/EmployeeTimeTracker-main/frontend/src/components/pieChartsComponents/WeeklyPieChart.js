import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import { format, parseISO, getISOWeek, getYear } from 'date-fns';

const WeeklyPieChart = ({id}) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API URL
    const apiUrl = `http://localhost:8083/emp/task/${id}`;
 // Replace with the actual employee ID

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || data.length === 0) {
          throw new Error('No data found');
        }


        const hoursPerWeek = data?.reduce((acc, task) => {
          const date = parseISO(task.date);
          const week = getISOWeek(date);
          const year = getYear(date);
          const weekYear = `Week ${week}, ${year}`;
          const startTime = new Date(`1970-01-01T${task.startTime}`);
          const endTime = new Date(`1970-01-01T${task.endTime}`);
          const adjustedDiffInMs = (endTime - startTime) >= 0 ? (endTime - startTime) : (endTime - startTime) + 24 * 60 * 60 * 1000;

          const duration = (adjustedDiffInMs) / (1000 * 60 * 60); // Convert milliseconds to hours

          if (!acc[weekYear]) {
            acc[weekYear] = 0;
          }
          acc[weekYear] += duration;

          return acc;
        }, {});

        // Prepare data for the chart
        const labels = Object.keys(hoursPerWeek);
        const dataSet = Object.values(hoursPerWeek);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'HOURS WORKED PER WEEK',
              data: dataSet,
              backgroundColor: [
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
<h1 className='text-lg text-zinc-600 text-center'>Employee Hours Worked per Day</h1>       <Pie data={chartData} />
    </div>
  );
};

export default WeeklyPieChart;
