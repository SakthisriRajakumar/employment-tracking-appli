import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";

const DisplayTask = ({data}) => {
  const [search ,setSearch] = useState("");
    const handleDelete = (id) => {
      Swal.fire({
        title: "Are you sure to Delete this Task",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:8083/emp/delete/${id}`).then((res) => {
            if (res.data == "deleted") {
              Swal.fire({
                title: "Task Deleted successfully!",
                icon: "success"
              });
              setTimeout(() => {
               window.location.reload();
            }, 3000);
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
 var i=1;   
  return (
    <div>
      <input className='ml-5 h-10  placeholder:text-black  rounded-lg outline-none border-2 border-teal-200 pl-3 w-[78%]' placeholder="Search here . . . " onChange={(e)=>setSearch(e.target.value)}></input>
      <Link to="/addtask"><button  style={{boxShadow:"4px 4px 10px black"}}
className='h-10 w-36 rounded-xl ml-3 bg-emerald-600 table-hover text-white font-bold' >ADD TASK+</button></Link>
    <div className='px-5 mt-2'>
    {data.length <= 0 ? <p className='text-center text-xl text-white mt-12'>NO DATA TO SHOW!!</p> : <table className='w-screen text-center table table-bordered table-hover border-2  bg-white '>
        <thead className='bg-gray-800  text-white'>
           <tr>
             <th>S.NO</th>
             <th>PROJECT_NAME</th>
             <th>START_TIME</th>
             <th>END_TIME</th>
             <th>TASK_CATEGORY</th>
             <th>MY_ASSOCIATE</th>
             <th colspan="2">ACTIONS</th>         
           </tr>
        </thead>
        <tbody>
    {data?.filter((d)=>(d.project.includes(search) || d.taskCategory.includes(search) || d.description.includes(search) || d.myAssociate.includes(search) || d.employeeName.includes(search)  ))?.map((d)=>{
     return <tr>
        <td>{i++}</td>
        <td>{d.project}</td>
        <td>{d.startTime}</td>
        <td>{d.endTime}</td>
        <td>{d.taskCategory}</td>
        <td>{d.myAssociate}</td>
        <td className=''>
           <Link to={`/update/${d.id}`}><button style={{boxShadow:"3px 3px 10px black"}} className='h-10 w-20 bg-yellow-500 hover:bg-yellow-600 rounded-xl  text-white font-bold'>UPDATE</button></Link>
           <button style={{boxShadow:"3px 3px 10px black"}} className='h-10 w-20 bg-red-500 hover:bg-red-700 rounded-xl ml-2 text-white font-bold' onClick={()=>handleDelete(d.id)}>DELETE</button>
        </td>
     </tr>
    }
        
    )}
    </tbody>
    </table>}
    </div>
    </div>
  )
}

export default DisplayTask



