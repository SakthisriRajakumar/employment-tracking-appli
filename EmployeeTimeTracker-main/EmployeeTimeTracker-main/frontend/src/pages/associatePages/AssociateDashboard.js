import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTasks, FaChartBar, FaSearch, FaPlus } from "react-icons/fa";

const AssociateDashboard = () => {
  const [taskList, setTaskList] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState(localStorage.getItem('id'));

  useEffect(() => {
    try {
      axios.get(`http://localhost:8083/emp/myEmployee/${employeeId}`)
        .then((response) => {
          console.log(response.data);
          setTaskList(response.data);
        });
    } catch (error) {
      console.error(error.message());
    }
  }, [employeeId]);

  const uniqueEmployees = {};

  taskList.forEach(task => {
    if (!uniqueEmployees[task.employeeId]) {
      uniqueEmployees[task.employeeId] = {
        employeeId: task.employeeId,
        employeeName: task.employeeName,
        project: task.project
      };
    }
  });

  const uniqueEmployeeList = Object.values(uniqueEmployees);
  var i = 1;

  return (
    <div className="w-screen min-h-[200vh] flex flex-col items-center bg-gray-900 text-white">
      <h1 className="text-4xl mt-2 font-extrabold text-teal-400">ASSOCIATE DASHBOARD</h1>
      <div className="mt-4 w-screen flex justify-center gap-4">
        <input 
          className="w-[36rem] pl-2 rounded-lg border-2 border-gray-700 bg-gray-700 text-white outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Search Here....."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button 
          className="h-10 w-32 flex items-center justify-center rounded-xl font-bold text-gray-900 bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-0"
          onClick={() => navigate(`/viewMyTask/${employeeId}`)}
        >
          <FaTasks className="mr-2" /> MY TASKS
        </button>
        <button 
          className="h-10 w-32 flex items-center justify-center rounded-xl font-bold text-gray-900 bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-0"
          onClick={() => navigate(`/addTask`)}
        >
          <FaPlus className="mr-2" /> ADD TASK
        </button>
      </div>
      <div className="w-screen mt-3">
        <table className="w-4/6 bg-gray-100 text-gray-900 mx-auto table table-bordered border-2 table-hover">
          <thead className="bg-zinc-800 text-white font-bold text-center">
            <tr>
              <td className="w-12">S.NO</td>
              <td className="w-48">EMPLOYEE_ID</td>
              <td>EMPLOYEE_NAME</td>
              <td colSpan="2" className="w-52">ACTIONS</td>
            </tr>
          </thead>
          <tbody>
            {uniqueEmployeeList.filter((d) => (d.employeeName.includes(search) || d.employeeId.includes(search))).map((task) => {
              return (
                <tr key={task.employeeId} className="font-semibold text-gray-900">
                  <td>{i++}</td>
                  <td>{task.employeeId}</td>
                  <td>{task.employeeName}</td>
                  <td className="flex justify-center gap-4">
                    <Link to={`/viewSingleEmployeeTask/${task.employeeId}`}>
                      <button className="h-10 w-32 flex items-center justify-center rounded-xl font-bold text-gray-900 bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-0">
                        <FaTasks className="mr-2" /> TASKS
                      </button>
                    </Link>
                    <Link to={`/charts/${task.employeeId}`}>
                      <button className="h-10 w-32 flex items-center justify-center rounded-xl font-bold text-gray-900 bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-0">
                        <FaChartBar className="mr-2" /> STATISTICS
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssociateDashboard;
