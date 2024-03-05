import React, { useEffect, useState } from 'react'
import Posts from '../component/Posts'
import axios from 'axios';
import { Audio,ColorRing } from 'react-loader-spinner'


const Postpage = () => {
  const[loader,setloader] = useState(true);
  const [posts, setposts] = useState([]);
  console.log("posts" , posts.length);
  
  useEffect(()=>{
    async function backend(){
      const res = await axios.get(`${import.meta.env.VITE__URL}/posts`,{});
      console.log(res.data.array);
      if(res.statusText=="OK"){
         setloader(false);
         setposts(res.data.array);
      }
     }
     setTimeout(() => {
      backend();
    }, 250);

      return ()=>{console.log("kya bkc hai bhai")}       

  },[])
 
   if(loader){
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

  return (
    <>
      {posts.length>0 && posts.map(post=>(
          <Posts {...post}/>
      ))}
    </>
  )
}

export default Postpage