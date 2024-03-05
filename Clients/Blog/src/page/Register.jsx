import React, { useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [redirect, setredirect] = useState(false);
  
  async function register(e){
     e.preventDefault();
     const res = await axios.post(`${import.meta.env.VITE__URL}/register`,{
        username,
        password
     })
     console.log(res.statusText);
     if(res.statusText==='OK'){
       setredirect(true);
     }
     console.log(res);
  }

  if(redirect){
      return <Navigate to='/login' />
  }

  return (
    <>
        <form action='' className='flex flex-col justify-center items-center  login'>
         <h1 className='mb-[1rem] font-bold text-[3rem]'>Register</h1>
          <input type='text' placeholder='Username' className='input' onChange={(e)=>{setusername(e.target.value)}}/>
          <input type='password' placeholder='Password' className='input' onChange={(e)=>{setpassword(e.target.value)}}/>
          <button className='button' onClick={register}>Register</button>
        </form>
    </>
  )
}

export default Register