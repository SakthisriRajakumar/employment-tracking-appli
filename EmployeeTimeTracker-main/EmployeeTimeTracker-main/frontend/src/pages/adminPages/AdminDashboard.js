import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get(`http://localhost:8083/emp/allEmployees`)
        .then((response) => {
          setEmployeeList(response.data);
        });
    } catch (error) {
      console.error(error.message());
    }
  }, []);

  const handleDelete = (id, name) => {
    try {
      Swal.fire({
        title: "Are you sure to Delete this Employee?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:8083/emp/deleteEmployee/${id}`)
          axios.delete(`http://localhost:8083/emp/deleteAllTask/${name}`)
            .then((res) => {
              if (res.data === "deleted") {
                Swal.fire({
                  title: "Task Deleted Successfully!",
                  icon: "success"
                });
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              } else {
                Swal.fire({
                  title: "Something Went Wrong!",
                  icon: "warning"
                });
              }
            });
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  var i = 1;

  return (
    <div className="w-screen min-h-screen ">
      <p className='text-center text-teal-400 text-4xl font-extrabold py-3'>ADMIN DASHBOARD</p>
      <div className='w-screen flex pb-2 justify-center'>
        <input className='h-10 pl-3 text-white mb-2 w-[80%] outline-none bg-white/20 rounded-lg' placeholder="Search Here...." onChange={(e) => setSearch(e.target.value)} />
        <button className='h-10 px-3 ml-2 bg-teal-500 hover:bg-teal-400 rounded-xl font-bold text-gray-900' onClick={() => navigate("/addEmployee")}>ADD EMPLOYEE+</button>
      </div>
      <div className='w-screen px-10'>
        <table className=" bg-gray-100 table table-bordered table-hover rounded-xl shadow-lg">
          <thead className='bg-gray-700 text-white'>
            <tr className='text-center'>
              <th className="w-12">S.NO</th>
              <th className="w-48">EMPLOYEE_ID</th>
              <th>EMPLOYEE_NAME</th>
              <th>EMPLOYEE_ROLE</th>
              <th colSpan="4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.filter((emp) => (emp.role !== "admin")).filter((emp) => (emp.employeeId.includes(search) || emp.role.includes(search) || emp.name.includes(search))).map((emp) => {
              return (
                <tr key={emp.id}>
                  <td>{i++}</td>
                  <td>{emp.employeeId}</td>
                  <td>{emp.name}</td>
                  <td>{emp.role}</td>
                  <td className='text-center'>
                    <Link to={`/viewSingleEmployeeTask/${emp.employeeId}`}>
                      <button className='h-10 px-3 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-bold text-white'>VIEW_TASKS</button>
                    </Link>
                    <Link to={`/charts/${emp.employeeId}`}>
                      <button className='h-10 px-3 ml-2 bg-lime-500 hover:bg-lime-400 rounded-xl font-bold text-white'>VIEW_STATS</button>
                    </Link>
                    <Link to={`/updateEmployee/${emp.id}`}>
                      <button className='h-10 px-3 bg-yellow-500 hover:bg-yellow-400 rounded-xl font-bold ml-2 text-white'>UPDATE</button>
                    </Link>
                    <button className='h-10 px-3 bg-red-700 hover:bg-red-500 rounded-xl font-bold ml-2 text-white' onClick={() => handleDelete(emp.id, emp.employeeId)}>DELETE</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboard;
