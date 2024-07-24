import React, { useState } from 'react'
import DailyBarChart from "./barChartsComponents/Daily"
import WeeklyBarChart from "./barChartsComponents/Weekly"
import MonthlyBarChart from "./barChartsComponents/Monthly"

const BarChart = ({id}) => {
    const [showDaily,setShowDaily] = useState(true);
    const [showWeekly,setShowWeekly] = useState(false);
    const [showMonthly,setShowMonthly] = useState(false);

    const handleDisplay = (type) => {
        if (type === 'daily'){
            setShowDaily(true);
            setShowWeekly(false);
            setShowMonthly(false);
        }
        else if (type === 'weekly'){
            setShowDaily(false);
            setShowWeekly(true);
            setShowMonthly(false);
        }
        else{
            setShowDaily(false);
            setShowWeekly(false);
            setShowMonthly(true);
        }      
    }
  return (
    <div>
        <div>
        <button className="w-24 h-8 font-bold bg-rose-600 text-white rounded-lg ml-5" onClick={()=>handleDisplay("daily")}>DAILY</button>
        <button className="w-24 h-8 font-bold bg-blue-500 text-white rounded-lg ml-2" onClick={()=>handleDisplay("weekly")}>WEEKLY</button>
        <button className="w-24 h-8 font-bold bg-yellow-600 text-white rounded-lg ml-2" onClick={()=>handleDisplay("monthly")}>MONTHLY</button>
      </div>
      <div>
        {showMonthly && <MonthlyBarChart id={id}/>}
        {showDaily && <DailyBarChart id={id}/>}
        {showWeekly && <WeeklyBarChart id={id}/>}
      </div>
    </div>
  )
}

export default BarChart