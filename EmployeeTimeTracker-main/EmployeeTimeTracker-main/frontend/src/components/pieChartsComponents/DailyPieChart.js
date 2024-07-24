import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import { format, parseISO } from 'date-fns';
import { CgDarkMode } from "react-icons/cg";

const DailyPieChart = ({id}) => {
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

        const hoursPerDay = data.reduce((acc, task) => {
          const date = parseISO(task.date);
          const day = format(date, 'yyyy-MM-dd'); // Format as YYYY-MM-DD for day

          const startTime = new Date(`1970-01-01T${task.startTime}`);
          const endTime = new Date(`1970-01-01T${task.endTime}`);
          const adjustedDiffInMs = (endTime - startTime) >= 0 ? (endTime - startTime) : (endTime - startTime) + 24 * 60 * 60 * 1000;

          const duration = (adjustedDiffInMs) / (1000 * 60 * 60); // Convert milliseconds to hours

          if (!acc[day]) {
            acc[day] = 0;
          }
          acc[day] += duration;

          return acc;
        }, {});

        // Prepare data for the chart
        const labels = Object.keys(hoursPerDay);
        const dataSet = Object.values(hoursPerDay);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'HOURS WORKED PER DAY',
              data: dataSet,
              backgroundColor: [
               
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
              ],
              borderWidth: 1,
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
    <div className='mx-auto pt-3 flex flex-col  items-center' style={{width:'80%', height: '480px' }}>
      <h1 className='text-lg text-zinc-600 text-center'>Employee Hours Worked per Day</h1>
      <Pie options={{
            maintainAspectRatio: false,
          }}data={chartData} />
    </div>
    
  );
};

export default DailyPieChart 
  ;
