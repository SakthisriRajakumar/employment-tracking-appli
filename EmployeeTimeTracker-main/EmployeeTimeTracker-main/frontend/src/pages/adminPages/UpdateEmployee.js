import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Swal from "sweetalert2";

const UpdateEmployee = () => {
    const { id } = useParams();
    const [name, setName] = useState();
    const [role, setRole] = useState();
    const [mail, setMail] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8083/emp/getEmployee/${id}`)
            .then((response) => {
                setName(response.data.name);
                setRole(response.data.role);
                setMail(response.data.mail);
            })
            .catch((error) => console.log(error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure you want to update this employee's details?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:8083/emp/updateEmployee/${id}`, {
                    name,
                    role,
                    mail
                }).then((res) => {
                    if (res.data === "updated") {
                        Swal.fire({
                            title: "Employee Details Updated!",
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
        <div className='w-screen h-screen flex flex-col pt-20 items-center bg-gray-900'>
            <p className='text-2xl font-bold text-teal-500 mb-3'>UPDATE EMPLOYEE</p>

            <form style={{ boxShadow: "7px 7px 15px black" }} className='flex flex-col w-[35%]  px-4 bg-gray-800 rounded-xl ' onSubmit={handleSubmit}>
                <label className='text-white mt-3 font-semibold '>Employee Name:</label>
                <input 
                    style={{ boxShadow: "7px 7px 8px rgba(15, 15, 15, 0.50)" }} 
                    className='h-12 border-[1px] border-teal-500  bg-gray-700 text-white rounded-xl pl-2 outline-none  mb-2' 
                    placeholder="Employee Name" 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <label className='text-white font-semibold mt-2'>Role:</label>
                <input 
                    style={{ boxShadow: "7px 7px 8px rgba(15, 15, 15, 0.50)" }} 
                    className='h-12 border-[1px] border-teal-500  bg-gray-700 text-white rounded-xl pl-2 outline-none focus:ring-2 focus:ring-teal-500  mb-2' 
                    placeholder="Employee Role" 
                    type="text" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                />
                <label  className='text-white font-semibold mt-1'>Email:</label>
                <input 
                     style={{ boxShadow: "7px 7px 8px rgba(15, 15, 15, 0.50)" }} className='h-12 border-[1px] border-teal-500  bg-gray-700 text-white rounded-xl pl-2 outline-none focus:ring-2 focus:ring-teal-500  mb-2' 
                     placeholder="Employee Mail"
                     type="text" 
                     value={mail} 
                     onChange={(e)=>setMail(e.target.value)} />

                <button 
                    style={{ boxShadow: "7px 7px 8px rgba(15, 15, 15, 0.50)" }} 
                    className='h-12 bg-teal-500  mb-4 text-gray-900 font-bold rounded-xl pl-2 mt-4 border-none hover:bg-teal-400'
                    type="submit"
                >
                    UPDATE EMPLOYEE
                </button>
            </form>
        </div>
    );
}

export default UpdateEmployee;
