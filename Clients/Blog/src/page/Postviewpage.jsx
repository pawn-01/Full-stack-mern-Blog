import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'
import { format } from "date-fns";
import { useRecoilValue } from 'recoil';
import { userinfo } from '../user';

const Postviewpage = () => {
    const navi =  useNavigate();
    const [postinfo, setpostinfo] = useState(null);
    const user = useRecoilValue(userinfo) 
    const { id } = useParams();

    useEffect(() => {
       async function apicall(){
           const res = await axios.get(`${import.meta.env.VITE__URL}/posts/${id}`) 
           if(res.statusText=="OK"){
                setpostinfo(res.data.postdoc);
           }
       }
       apicall();
    }, [])

    if(!postinfo){
      return <div className='w-[100%] h-[80vh] flex justify-center items-center'>
      <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#000','#000','#000','#000','#000']} ></ColorRing>
  </div>
    }
    
    async function deletepost(){
       const res = await axios.delete(`${import.meta.env.VITE__URL}/delete/${id}`,{withCredentials:true});
       console.log(res);
       if(res.statusText=="OK"){
            navi('/');
       }
    }

  return (
    <>
       <h1 className='text-center text-[3rem] font-bold max-md:text-[2rem] mx-[0]'>{postinfo.title}</h1>
       <time className='text-center block text-[.8rem] text-[#aaa] '>{format(new Date(postinfo.createdAt), "MMM d, yyyy HH:mm")}</time>
       <div className='text-center mb-[20px] text-[.7rem] font-bold'>by @{postinfo.author.username}</div>
       {user && user.id==postinfo.author._id && (
        <div className='text-center mb-[20px]'>
           <Link to={`/edit/${postinfo._id}`}
             className='bg-[#333] text-[#fff] py-[15px] px-[20px] inline-flex rounded-[5px] gap:5px'>
           <svg className='text-center h-[20px]' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

           Edit this Post</Link>
           <div onClick={deletepost} className='bg-red-500 text-[#fff] py-[15px] px-[20px] inline-flex rounded-[5px] gap:5px ml-[10px] cursor-pointer'>
           <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>Delete
           </div>
          
        </div>
       )}
      <div className='max-h-[400px] w-[full] overflow-hidden flex mb-[20px]'>
          <img className=" object-cover object-center" src={`${import.meta.env.VITE__URL}/${postinfo.cover}`} alt='image'/>
      </div>
      <div className='leading-normal' dangerouslySetInnerHTML={{__html:postinfo.content}}/>
    </>
  )
}

export default Postviewpage