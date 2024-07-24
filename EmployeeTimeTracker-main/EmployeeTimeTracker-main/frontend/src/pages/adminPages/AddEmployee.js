import axios from 'axios';
import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router';

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [mail, setMail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure to add this employee?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('http://localhost:8083/emp/add', {
          employeeId:role+"-"+uuidv4().replace(/-/g, '').substring(0, 12),
          name,
          password: window.btoa(uuidv4().replace(/-/g, '').substring(0, 12)),
          role,
          mail
        }).then((res) => {
          if (res.data) {
            localStorage.setItem("data", JSON.stringify(res.data));
            navigate("/success");
            Swal.fire({
              title: "Employee Added!",
              icon: "success"
            });
          } else {
            Swal.fire({
              title: "Something Went Wrong!",
              icon: "warning"
            });
          }
        })
      }
    });
  }

  return (
    <div className='w-screen h-screen flex flex-col pt-20 items-center bg-gray-900'>
      <p className='text-2xl font-extrabold text-teal-500 mb-3'>ADD EMPLOYEE</p>
      <form style={{ boxShadow: "3px 3px 3px black" }} className='flex rounded-xl py-4 flex-col w-[35%] px-5 bg-gray-800 text-white' onSubmit={handleSubmit}>
        <label className='font-bold text-white'>Employee Name:</label>
        <input style={{boxShadow:"inset 2px 2px 5px black"}} className='w-full h-12 bg-transparent rounded-lg pl-3 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent' placeholder="Employee Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        
        <label className='font-bold text-white mt-1'>Role:</label>
        <input style={{boxShadow:"inset 2px 2px 5px black"}} className='w-full h-12 bg-transparent rounded-lg pl-3 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent' placeholder="Employee Role" type="text" value={role} onChange={(e) => setRole(e.target.value)} />
        
        <label className='font-bold text-white mt-1'>Email:</label>
        <input type="mail" style={{boxShadow:"inset 2px 2px 5px black"}} className='w-full h-12 bg-transparent rounded-lg pl-3 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent' placeholder="Employee Email" type="text" value={mail} onChange={(e) => setMail(e.target.value)} />
        
        <button style={{ boxShadow: " 3px 3px 10px black" }} className='w-full h-12 mt-4 rounded-lg pl-2 mx-auto bg-teal-500 text-gray-900 font-bold hover:bg-teal-400' type="submit">Add Employee</button>
      </form>
    </div>
  )
}

export default AddEmployee;
