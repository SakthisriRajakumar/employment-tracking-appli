import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import "../index.css";

const AddTask = () => {

  const [employeeId, setEmployeeId] = useState(localStorage.getItem('id'));
  const [employeeName, setEmployeeName] = useState();
  const [role, setRole] = useState();
  const [project, setProject] = useState();
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [taskCategory, setTaskCategory] = useState();
  const [description, setDescription] = useState();
  const [myAssociate, setMyAssociate] = useState();
  const [task, setTask] = useState([]);

  useEffect(() => {
    try {
      axios.get(`http://localhost:8083/emp/task/${employeeId}`)
        .then((response) => setTask(response.data));
    } catch (error) {
      console.error(error.message());
    }
  }, [employeeId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure to add this task?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const fake = task.filter((d) => (d.date === date && d.startTime === startTime && d.endTime === endTime));
        const end = Number(endTime.substring(0, 2));
        const start = Number(startTime.substring(0, 2));
        const validDuration = (end - start);
        if (fake.length > 0) {
          Swal.fire({
            title: "Oops!!",
            text: "Task Already Exists At This Time!!!",
            icon: "warning"
          });
          setTimeout(() => {
            window.location.reload();
          }, 4000);
          return;
        }
        if (validDuration > 8) {
          Swal.fire({
            title: "Oops!!",
            text: "Task Duration shouldn't Exceed 8 Hours!!!",
            icon: "warning"
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          return;
        }
        axios.post('http://localhost:8083/emp/task', {
          employeeId,
          employeeName,
          role,
          project,
          date,
          startTime,
          endTime,
          taskCategory,
          description,
          myAssociate
        }).then((res) => {
          if (res.data === "data added") {
            Swal.fire({
              title: "Task Added!",
              icon: "success"
            });
          } else {
            Swal.fire({
              title: "Something Went Wrong!",
              icon: "warning"
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-screen bg-gray-900 flex flex-col pt-4 items-center h-screen">
      <p className="text-3xl font-bold text-teal-400 my-2">TASK DETAILS</p>
      <form style={{ boxShadow: "15px 15px 8px rgba(15, 15, 15, 0.30)" }} className='bg-gray-800 text-white rounded-xl flex justify-center py-4' onSubmit={handleSubmit}>

        <div className='w-96 flex flex-col items-start'>
          <label className='text-sm font-bold ml-8 text-white'>NAME:</label>
          <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent' 
            style={{ boxShadow: "3px 3px 10px black" }}
            type="text" required placeholder='EmployeeName'
            onChange={(e) => setEmployeeName(e.target.value)}
          />
          <label className='text-sm font-bold ml-8 text-white'>ROLE:</label>
          <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent' 
            style={{ boxShadow: "3px 3px 10px black" }}
            type="text" required placeholder='Role'
            onChange={(e) => setRole(e.target.value)}
          />
          <label className='text-sm font-bold ml-8 text-white'>PROJECT NAME:</label>
          <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent' 
            style={{ boxShadow: "3px 3px 10px black" }}
            type="text" required placeholder='Project Name'
            onChange={(e) => setProject(e.target.value)}
          />
          <label className='text-sm font-bold ml-8 text-white'>DATE:</label>
          <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent' 
            style={{ boxShadow: "3px 3px 10px black" }}
            type="date" required
            onChange={(e) => setDate(e.target.value)}
          />
          <label className='text-sm font-bold ml-8 text-white'>START TIME:</label>
          <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent' 
            style={{ boxShadow: "3px 3px 10px black" }}
            type="time" required
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className='w-96 flex flex-col'>
          <label className='text-sm font-bold ml-8 text-white'>END TIME:</label>
          <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent' 
            style={{ boxShadow: "3px 3px 10px black" }}
            type="time" required
            onChange={(e) => setEndTime(e.target.value)}
          />
          <label className='text-sm font-bold ml-8 text-white'>TASK CATEGORY:</label>
          <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent' 
            style={{ boxShadow: "3px 3px 10px black" }}
            type="text" required placeholder='Task Category'
            onChange={(e) => setTaskCategory(e.target.value)}
          />
          <label className='text-sm font-bold ml-8 text-white'>DESCRIPTION:</label>
          <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent' 
            style={{ boxShadow: "3px 3px 10px black" }}
            type="text" required placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className='text-sm font-bold ml-8 text-white'>MY ASSOCIATE:</label>
          <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-3 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent' 
            style={{ boxShadow: "3px 3px 10px black" }}
            type="text" required placeholder='My Associate'
            onChange={(e) => setMyAssociate(e.target.value)}
          />
          <button className='w-[85%] h-10 mt-4 rounded-lg pl-2 mx-auto bg-teal-500 text-gray-900 font-bold text-md mb-2 outline-none' style={{ boxShadow: "3px 3px 10px black" }} type='submit'>ADD TASK</button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
