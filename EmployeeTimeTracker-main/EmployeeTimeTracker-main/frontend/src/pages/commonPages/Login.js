import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from "sweetalert2";

const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8083/emp/login", { employeeId, password: window.btoa(password) })
      .then((res) => {
        if (res.data === "employee") {
          localStorage.setItem("id", employeeId);
          navigate('/employeeDashboard');
        } else if (res.data === "associate") {
          localStorage.setItem("id", employeeId);
          navigate('/associateDashboard');
        } else if (res.data === "admin") {
          localStorage.setItem("id", employeeId);
          navigate('/adminDashboard');
        } else {
          Swal.fire({
            title: "Invalid Credentials!",
            icon: "warning"
          });
        }
      });
  };

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center bg-gray-900'>
      <div className='text-center mb-8'>
        <p className='text-5xl font-bold text-teal-400 mb-2'>EMPLOYEE TIME TRACKER</p>
      </div>
      <form
        className='flex flex-col w-[30%] p-8 text-zinc-200 bg-gray-800 rounded-2xl'
        onSubmit={handleSubmit}
        style={{ boxShadow: " 10px 10px 25px black" }}
        >
        <label className='font-medium mb-2 text-gray-400'>
          Employee ID:
        </label>
        <input
          className='h-12 rounded-lg p-4 mb-4 bg-transparent border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500'
          type="text"
          placeholder="Employee Id"
          required
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          style={{ boxShadow: "inset 2px 2px 5px black" }}
        />
        
        <label className='font-medium mb-2 text-gray-400'>
          Password:
        </label>
        <input
          className='h-12 rounded-lg p-4 mb-4 bg-transparent border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500'
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ boxShadow: "inset 2px 2px 5px black" }}
        />
        
        <button
          className='h-12 rounded-lg bg-teal-500 font-bold hover:bg-teal-400 text-gray-900 text-lg transition duration-300'
          type="submit"
          style={{ boxShadow: "2px 2px 5px black" }}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default Login;
