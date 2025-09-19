import { Image, UserSquare } from 'iconsax-reactjs'
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../contexts/Usercontext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Onepost from '../Onepost/Onepost'
import { useQuery } from '@tanstack/react-query'
import CreatePost from '../../componants/shared/CreatePost'
import Skeleton from 'react-loading-skeleton'
import toast from 'react-hot-toast'

export default function Home() {
  // const {userData} = useContext(userContext);

  // const [allPosts , setAllPosts] = useState([]);

  async function getAllPosts() {
    try {
      const {data} = await axios(`${import.meta.env.VITE_BASE_URL}/posts?limit=50&sort=-createdAt`,
        {
          method:"GET",
          headers:{token:localStorage.getItem("token")}
        }
      )
      // console.log(data);
      
      return (data?.posts);
    } catch (error) {
      toast.error(error?.response?.data?.error);
      return error;
      console.log(error);
    }
    
  }

  const {data:allPosts , isLoading} = useQuery({
    

    queryFn:getAllPosts,
    queryKey:["posts"]
  });
  
  return (
    <>
      <div className='max-w-3xl mx-auto pb-2'>
        <CreatePost />

        {isLoading && <Skeleton height={500} count={10} />}
        {/* posts */}
        {allPosts?.map((p)=><Onepost key={p?._id} id={p?._id} post={p}/>)}
      </div>
    </>
  )
}
