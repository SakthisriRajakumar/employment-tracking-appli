import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import { format, parseISO, getISOWeek, getYear } from 'date-fns';

const WeeklyLineChart = ({id}) => {
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

        const hoursPerWeek = data?.reduce((acc, task) => {
          const date = parseISO(task.date);
          const week = getISOWeek(date);
          const year = getYear(date);
          const weekYear = `${year}-W${week}`;
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
        const labels = Object.keys(hoursPerWeek).sort(); // Sort by week-year
        const dataSet = Object.values(hoursPerWeek);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'HOURS WORKED PER WEEK',
              data: dataSet,
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1,
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
    <div className='mx-auto' style={{width:'80%', height: '480px' }}>
      <Line options={{
            maintainAspectRatio: false,
          }}data={chartData} />
    </div>
  );
};

export default WeeklyLineChart;
