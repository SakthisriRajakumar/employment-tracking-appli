import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DisplayTask from '../../components/DisplayTask';
import { useParams } from 'react-router';

const ViewMyTask = () => {
    const [myTask,setMyTask] = useState([]);
    const {id} = useParams();
    useEffect(()=>{
        try{
            axios.get(`http://localhost:8083/emp/task/${id}`)
        .then((response)=>setMyTask(response.data))
        }catch(error){
            console.error(error.message())
        }
    
    },[id])
  return (
    <div>
            <h1 className='text-2xl text-teal-500 font-bold text-center my-3'>My Tasks</h1>
           <DisplayTask data={myTask} />
          
        </div>
  )
}

export default ViewMyTask