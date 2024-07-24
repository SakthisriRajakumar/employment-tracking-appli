
import { useState } from "react";
import DailyPieChart from "./pieChartsComponents/DailyPieChart"
import MonthlyPieChart from "./pieChartsComponents/MonthlyPieChart"
import WeeklyPieChart from "./pieChartsComponents/WeeklyPieChart"

const PieChart = ({id}) => {
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
    < div>
      <div>
        <button className="w-24 h-8 font-bold bg-rose-600 text-white rounded-lg ml-5" onClick={()=>handleDisplay("daily")}>DAILY</button>
        <button className="w-24 h-8 font-bold bg-blue-500 text-white rounded-lg ml-2" onClick={()=>handleDisplay("weekly")}>WEEKLY</button>
        <button className="w-24 h-8 font-bold bg-yellow-600 text-white rounded-lg ml-2" onClick={()=>handleDisplay("monthly")}>MONTHLY</button>
      </div>
      <div className="mt-[-20px]">
        {showMonthly && <MonthlyPieChart id={id}/>}
        {showDaily && <DailyPieChart id={id}/>}
        {showWeekly && <WeeklyPieChart id={id}/>}
      </div>
    </div>
  )
}

export default PieChart