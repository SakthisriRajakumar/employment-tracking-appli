import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

const ViewSingleEmployeeTasks = () => {
    const [taskList, setTaskList] = useState([]);
    const { id } = useParams();
    var i = 1;

    useEffect(() => {
        try {
            axios.get(`http://localhost:8083/emp/task/${id}`)
                .then((response) => setTaskList(response.data))
        } catch (error) {
            console.error(error.message())
        }
    }, [id])

    return (
        <div className='w-screen h-screen flex flex-col items-center bg-gray-900 text-white'>
            <h1 className='text-2xl font-bold text-teal-500 my-4'>EMPLOYEE: <span className='text-white'>{id}'s TASKS</span></h1>
            {taskList.length <= 0 ? (
                <p className='text-center text-xl mt-12'>NO TASKS TO SHOW!!</p>
            ) : (
                <table className='w-5/6 mb-3 text-gray-900 bg-gray-100 text-center table table-bordered border-2 border-gray-700 table-hover'>
                    <thead className='bg-zinc-800 text-white'>
                        <tr>
                            <th>S.NO</th>
                            <th>EMPLOYEE_ID</th>
                            <th>EMPLOYEE_NAME</th>
                            <th>PROJECT_NAME</th>
                            <th>START_TIME</th>
                            <th>END_TIME</th>
                            <th>TASK_CATEGORY</th>
                            <th>DESCRIPTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskList?.map((d) => {
                            return (
                                <tr key={i}>
                                    <td>{i++}</td>
                                    <td>{d.employeeId}</td>
                                    <td>{d.employeeName}</td>
                                    <td>{d.project}</td>
                                    <td>{d.startTime}</td>
                                    <td>{d.endTime}</td>
                                    <td>{d.taskCategory}</td>
                                    <td>{d.description}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}
export default ViewSingleEmployeeTasks;
