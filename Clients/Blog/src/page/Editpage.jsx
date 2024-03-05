import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userinfo } from '../user';

const Editpage = () => {
    const { id } = useParams();
    //const navi = useNavigate();
    const [title, settitle] = useState('');
    const [summary, setsummary] = useState('');
    const [files, setfiles] = useState('');
    const [content, setcontent] = useState('');
    const [redirect, setredirect] = useState(false);
    const navi = useNavigate();
    const username = useRecoilValue(userinfo);

    console.log('username '+username);


    useEffect(() => {
      async function postapicall(){
         const res = await axios.get(`${import.meta.env.VITE__URL}/posts/${id}`);
         if(res.statusText==="OK"){
             settitle(res.data.postdoc.title);
             setsummary(res.data.postdoc.summary);
             setcontent(res.data.postdoc.content);
         }   
      }

      postapicall();
   
    }, [])

    if(!username){
        return <Navigate to='/' />
    }
    

    async function Updatepost(e){
      const data = new FormData();
      data.set('title',title);
      data.set('summary',summary);
      if(files?.[0]){
        data.set('file',files[0]);
      }
      
      data.set('content',content)
      console.log(files);
        e.preventDefault();
        const res = await axios.put(`${import.meta.env.VITE__URL}/edit/${id}`,data,{withCredentials:true})
        console.log(res.statusText);
        if(res.statusText==='OK'){
            setredirect(true);
        }
    }

    if(redirect){
        return <Navigate to={`/posts/${id}`} />   
    }

  return (
       <>
        <form action='' className='flex flex-col justify-center items-center Screen'>
          <input type='text' value={title} placeholder='title' onChange={(e)=>{settitle(e.target.value)}}  className='input' />
          <input type='text' placeholder='summary' value={summary} onChange={(e)=>{setsummary(e.target.value)}}  className='input'/>
          <input type='file' className='input' onChange={(e)=>{setfiles(e.target.files)}}/>
          <ReactQuill theme="snow" value={content} onChange={setcontent}  className='input border-[0] p-[0]'/>
          <button className='button mt-[5px]' onClick={Updatepost}>Update post</button>
        </form>
     </>
  )
}

export default Editpage