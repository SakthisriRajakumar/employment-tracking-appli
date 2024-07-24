import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DisplayTask from '../../components/DisplayTask';
import { useNavigate } from 'react-router';
import Swal from "sweetalert2"


const EmployeeDashboard = () => {
    const [taskList, setTaskList] = useState([]);
    const [employeeId, setEmployeeId] = useState(localStorage.getItem('id'));
    const navigate = useNavigate();

    useEffect(() => {
        try {
            axios.get(`http://localhost:8083/emp/task/${employeeId}`)
                .then((response) => setTaskList(response.data));
        } catch (error) {
            console.error(error.message);
        }
    }, [employeeId]);

    const handleLogout = () => {

        Swal.fire({
            title: "Are you sure want to Logout?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('id');
               navigate("/");
            }
          }); 
        
    };

    return (
        <div className="w-screen h-screen flex flex-col bg-gray-800 px-5">
            <div className='flex flex-col items-center my-2'>
                <h1 className='text-3xl font-extrabold text-teal-400'>EMPLOYEE DASHBOARD</h1>
                <h1 className='text-xl font-semibold text-gray-300 mt-2'>My Tasks</h1>
                <button
                    className='absolute right-10 top-6 outline-none bg-red-600 text-white p-2 rounded-xl  font-bold transition duration-300'
                    onClick={handleLogout}
                >
                    LOGOUT
                </button>
            </div>
            <DisplayTask data={taskList} />
        </div>
    );
}

export default EmployeeDashboard;
