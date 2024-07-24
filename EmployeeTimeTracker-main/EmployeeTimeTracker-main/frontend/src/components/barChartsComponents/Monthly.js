import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import { format, parseISO } from 'date-fns';

const Monthly = ({id}) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const apiUrl = `http://localhost:8083/emp/task/${id}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || data.length === 0) {
          throw new Error('No data found');
        }
    
      
        const hoursPerMonth = data.reduce((acc, task) => {
          const date = parseISO(task.date);
          const monthYear = format(date, 'yyyy-MM');
          const startTime = new Date(`1970-01-01T${task.startTime}`);
          const endTime = new Date(`1970-01-01T${task.endTime}`);
          const adjustedDiffInMs = (endTime - startTime) >= 0 ? (endTime - startTime) : (endTime - startTime) + 24 * 60 * 60 * 1000;

          const duration = (adjustedDiffInMs) / (1000 * 60 * 60);

          if (!acc[monthYear]) {
            acc[monthYear] = 0;
          }
          acc[monthYear] += duration;

          return acc;
        }, {});

        // Prepare data for the chart
        const labels = Object.keys(hoursPerMonth).sort(); // Sort by month-year
        const dataSet = Object.values(hoursPerMonth);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'HOURS WORKED PER MONTH',
              data: dataSet,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'white',
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
    <div className='mx-auto  flex justify-center' style={{width:'80%', height: '480px' }}>
       <Bar data={chartData} />
    </div>
  );
};

export default Monthly;
