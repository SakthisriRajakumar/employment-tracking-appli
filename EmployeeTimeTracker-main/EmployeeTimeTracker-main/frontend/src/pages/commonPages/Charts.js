import React, { useState } from 'react'
import { useParams } from 'react-router'
import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';
import { CgDarkMode } from "react-icons/cg";
import { FaChartLine, FaChartBar, FaChartPie } from "react-icons/fa";

const Charts = () => {
  const { id } = useParams();

  const [showLineChart, setShowLineChart] = useState(false);
  const [showBarChart, setShowBarChart] = useState(true);
  const [showPieChart, setShowPieChart] = useState(false);
  const [dark, setDark] = useState(false);

  const handleDisplay = (type) => {
    if (type === 'pie') {
      setShowLineChart(false);
      setShowBarChart(false);
      setShowPieChart(true);
    } else if (type === 'bar') {
      setShowLineChart(false);
      setShowBarChart(true);
      setShowPieChart(false);
    } else if (type === "line") {
      setShowBarChart(false);
      setShowPieChart(false);
      setShowLineChart(true);
    }
  }

  return (
    <div className={`max-w-screen ${dark && "bg-white"} h-screen`}>
      <div className='flex justify-between'>
        <h3 className='ml-5 mt-2 font-bold text-teal-500 text-2xl'><span>Employee ID:</span> {id}</h3>
        <div className='mt-4 flex'>
          <button className='text-teal-400 focus:outline-none border-none text-3xl mr-2' onClick={() => setDark(!dark)}><CgDarkMode /></button>
          <button className='px-3 h-10 bg-teal-500 font-bold p-2 text-gray-900 rounded-xl mr-3 hover:bg-teal-400 flex items-center justify-center' onClick={() => handleDisplay("line")}>
            <FaChartLine className="mr-2" /> LINE CHART
          </button>
          <button className=' px-3 h-10 bg-teal-500 font-bold p-2 text-gray-900 rounded-xl mr-3 hover:bg-teal-400 flex items-center justify-center' onClick={() => handleDisplay("pie")}>
            <FaChartPie className="mr-2" /> PIE CHART
          </button>
          <button className='h-10 px-3 bg-teal-500 font-bold p-2 text-gray-900 rounded-xl mr-6 hover:bg-teal-400 flex items-center justify-center' onClick={() => handleDisplay("bar")}>
            <FaChartBar className="mr-2" /> BAR CHART
          </button>
        </div>
      </div>
      <div>
        {showLineChart && <LineChart id={id} />}
        {showPieChart && <PieChart id={id} />}
        {showBarChart && <BarChart id={id} />}
      </div>
    </div>
  )
}

export default Charts
