import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Swal from "sweetalert2";

const UpdateTask = () => {
    const { id } = useParams();
    const [employeeName, setEmployeeName] = useState();
    const [role, setRole] = useState();
    const [project, setProject] = useState();
    const [date, setDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [taskCategory, setTaskCategory] = useState();
    const [description, setDescription] = useState();
    const [myAssociate, setMyAssociate] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure to Update this task?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:8083/emp/update/${id}`, {
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
                    if (res.data === "updated") {
                        Swal.fire({
                            title: "Task Updated Successfully!",
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

    useEffect(() => {
        try {
            axios.get(`http://localhost:8083/emp/fetchTask/${id}`)
                .then((response) => {
                    setEmployeeName(response?.data?.employeeName);
                    setRole(response?.data?.role);
                    setProject(response?.data?.project);
                    setDate(response?.data?.date);
                    setStartTime(response?.data?.startTime);
                    setEndTime(response?.data?.endTime);
                    setTaskCategory(response?.data?.taskCategory);
                    setDescription(response?.data?.description);
                    setMyAssociate(response?.data?.myAssociate);
                });
        } catch (error) {
            console.error(error.message());
        }
    }, [id]);

    return (
        <div className="w-screen bg-gray-900 flex flex-col pt-4 items-center h-screen">
            <p className="text-3xl font-bold text-teal-400 my-2">UPDATE TASK DETAILS</p>
            <form style={{ boxShadow: "15px 15px 8px rgba(15, 15, 15, 0.30)" }} className='bg-gray-800 text-white rounded-xl flex justify-center py-4' onSubmit={handleSubmit}>
                <div className='w-96 flex flex-col items-start'>
                    <label className='text-sm font-bold ml-8 text-white'>NAME:</label>
                    <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                        type="text" required
                        style={{ boxShadow: "3px 3px 10px black" }}
                        value={employeeName}
                        placeholder='EmployeeName'
                        onChange={(e) => setEmployeeName(e.target.value)}
                    />
                    <label className='text-sm font-bold ml-8 text-white'>ROLE:</label>
                    <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                        style={{ boxShadow: "3px 3px 10px black" }}
                        value={role}
                        type="text" required placeholder='Role'
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <label className='text-sm font-bold ml-8 text-white'>PROJECT NAME:</label>
                    <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                        style={{ boxShadow: "3px 3px 10px black" }}
                        value={project}
                        type="text" required placeholder='Project Name'
                        onChange={(e) => setProject(e.target.value)}
                    />
                    <label className='text-sm font-bold ml-8 text-white'>DATE:</label>
                    <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                        style={{ boxShadow: "3px 3px 10px black" }}
                        value={date}
                        type="date" required
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <label className='text-sm font-bold ml-8 text-white'>START TIME:</label>
                    <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                        style={{ boxShadow: "3px 3px 10px black" }}
                        value={startTime}
                        type="time" required
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>
                <div className='w-96 flex flex-col'>
                    <label className='text-sm font-bold ml-8 text-white'>END TIME:</label>
                    <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                        style={{ boxShadow: "3px 3px 10px black" }}
                        value={endTime}
                        type="time" required
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                    <label className='text-sm font-bold ml-8 text-white'>TASK CATEGORY:</label>
                    <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                        
                        style={{ boxShadow: "3px 3px 10px black" }}value={taskCategory}
                        type="text" required placeholder='Task Category'
                        onChange={(e) => setTaskCategory(e.target.value)}
                    />
                    <label className='text-sm font-bold ml-8 text-white'>DESCRIPTION:</label>
                    <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                        style={{ boxShadow: "3px 3px 10px black" }}
                        value={description}
                        type="text" required placeholder='Description'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label className='text-sm font-bold ml-8 text-white'>MY ASSOCIATE:</label>
                    <input className='w-[85%] h-10 bg-gray-700 rounded-lg pl-2 mx-auto mb-2 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                        style={{ boxShadow: "3px 3px 10px black" }}
                        value={myAssociate}
                        type="text" required placeholder='My Associate'
                        onChange={(e) => setMyAssociate(e.target.value)}
                    />
                    <button className='w-[85%] h-10 mt-4 rounded-lg pl-2 mx-auto bg-teal-400 text-gray-900 font-bold text-md mb-2 outline-none' style={{ boxShadow: "3px 3px 10px black" }} type='submit'>UPDATE TASK</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateTask;
