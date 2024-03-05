import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { userinfo } from '../user'
import { useRecoilState } from 'recoil'
import Login from './Login'



const Home = () => {
  const navi = useNavigate();
  const[username,setusername] = useRecoilState(userinfo);
 
  useEffect(() => {
     async function backend(){
      const res = await axios.post(`${import.meta.env.VITE__URL}/profile`, { },{withCredentials:true});
      console.log("home " +res.data.a);
      if(res.data.a===1){
         console.log(res.data.decode);
          setusername(res.data.decode);
        }
        else{
           alert("User Not Found")
        }
    }

    backend();
    return()=>{console.log("Home teri mkc")} 

  }, [])

  async function logout(){
     const res = await axios.post(`${import.meta.env.VITE__URL}/logout`,{},{withCredentials:true});
     if(res.statusText==='OK'){
        setusername(null);
        return <Navigate to='/login' />
     }
  }

  const user = username?.username;

  return (
    <>
       <div className='flex justify-between items-center pb-[3rem]' >
         <Link to='/' className='font-bold'>Blog4U</Link>
         <div className='flex items-center gap-[15px]'>
          {user && <>
            <Link to='/create'>Create new post</Link>
           <Link onClick={logout}>Logout</Link>
          </>}
          {!user &&
           <><Link to='/login'>Login</Link>
           <Link to='/register'>Register</Link>
           </>
          }
            </div>
         </div>
    </>
  )
}

export default Home