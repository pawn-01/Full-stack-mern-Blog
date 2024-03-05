import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userinfo } from '../user';


const Login = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [redirect, setredirect] = useState(false);
  const[user,setuser] = useRecoilState(userinfo)
  

  async function register(e){
     e.preventDefault();
     const res = await axios.post('http://localhost:3000/login',{
        username,
        password
     },{withCredentials:true})
     
     if(res.statusText==='OK'){
         setuser(res.data);
         setredirect(true);
    }

  }

  if(redirect){
      return <Navigate to={'/'} />
  }


  return (
    <>
        <form action='' className='flex flex-col justify-center items-center login'>
         <h1 className='mb-[1rem] font-bold text-[3rem]'>Login</h1>
          <input type='text' placeholder='Username' className='input' onChange={(e)=>{setusername(e.target.value)}}/>
          <input type='password' placeholder='Password' className='input' onChange={(e)=>{setpassword(e.target.value)}}/>
          <button className='button' onClick={register}>Login</button>
        </form>
    </>
  )
}

export default Login