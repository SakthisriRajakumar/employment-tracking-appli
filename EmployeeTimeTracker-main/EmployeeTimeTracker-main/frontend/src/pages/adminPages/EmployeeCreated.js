import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";


const EmployeeCreated = () => {
    const [data , setData] = ([JSON.parse(localStorage.getItem("data"))] || []);
    console.log(data);
    const message = `Hi,${data.name}!\n\n\nYour login details are as follows:\n\n\n\nEMPLOYEE ID:${data.employeeId}\n\n\n\nTEMPORARY PASSWORD: ${data.password}\n\nPlease change your password upon first login.`
    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log("sendEmail")

    emailjs
      .sendForm('service_paxusvj', 'template_x4fwby4', form.current, {
        publicKey: "mEOe5FTzPcVWKXX0J",
      })
      .then(
        () => {
          Swal.fire({
            title: "Mail Sent Successfully!",
            icon: "success"
          });
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
    <form  id="form" ref={form} onSubmit={sendEmail}>
      <div className="hidden">
   
        <label>Name</label>
        <input type="text" value={data.name} name="to_name" />
     
      </div>
      <div className="hidden">
        <label>Email</label>
        <input type="email" name="email" value={data.mail} />
      </div>
      <div className="hidden">
        <label>Message</label>
        <textarea name="message" value={message} />
      </div>
      <div>
        <input className='bg-yellow-400 absolute bottom-24 right-[46%] font-bold p-2 px-3 rounded-xl mt-2 hover:scale-105 hover:bg-yellow-500' type="submit" value="Send Mail" />
      </div>
    </form>
    <p className='text-teal-400 text-3xl font-bold mb-3'>EMPLOYEE CREDENTIALS</p>
    <table className='bg-white/20 text-white text-2xl font-bold rounded-xl w-[40%] '>
      <tbody>
        <tr className='h-14'>
        <td className='pl-3'>NAME </td>
          <td>: {data.name}</td>
          
        </tr>
        <tr className='h-14'>
        <td className='pl-3'>ROLE </td>
          <td>: {data.role}</td>
          
        </tr>
        <tr className='h-14'>
          <td className='pl-3'>EMAIL </td>
          <td>: {data.mail}</td>
        </tr>
        <tr className='h-14'>
          <td className='pl-3'>PASSWORD </td>
          <td>: *******</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  )
}

export default EmployeeCreated