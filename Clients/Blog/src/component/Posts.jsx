import React from 'react'
import { format } from "date-fns";
import { Link } from 'react-router-dom';

const Posts = ({_id,title, summary,cover, createdAt , author}) => {
   console.log(import.meta.env.REACT_APP_URL);
  return (
    <>
    <div className='flex gap-[10px] mb-[3rem] w-[100%] max-md:respo'>
      <div className="w-[40%] h-[15rem]  min-w-[40%] rounded overflow-hidden shadow-lg max-md:img"> 
         <Link to={`/posts/${_id}`}>
            <img className="w-full h-full object-fill" src={`${import.meta.env.VITE__URL}/${cover}`} alt='image'/>
         </Link>
       </div>
         
         <div>
            <h2 className='font-bold text-[2rem]'>
              <Link to={`/posts/${_id}`}>
              {title}
              </Link>
            </h2>
            <div className='flex gap-[15px] '>
            <a href='#' className='text-[#333] text-[0.7rem] font-bold '>{author?.username}</a>
            <time className='text-[#888] text-[0.7rem] font-bold'>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
            </div>
            <time></time>
            <h3 className='my-[10px] text-clip'>{summary}</h3>
         </div>
      </div>
    </>
  )
}

export default Posts