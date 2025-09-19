import { Image, UserSquare } from 'iconsax-reactjs'
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../contexts/Usercontext'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Onepost from '../Onepost/Onepost'
import { useQuery } from '@tanstack/react-query'
import CreatePost from '../../componants/shared/CreatePost'
import Skeleton from 'react-loading-skeleton'

export default function User() {
    const {id} = useParams();
    // console.log(params);
    
  // const {userData} = useContext(userContext);

  // const [allPosts , setAllPosts] = useState([]);

  async function getPosts() {
    try {
      const {data} = await axios(`${import.meta.env.VITE_BASE_URL}/users/664bcf3e33da217c4af21f00/posts`,
        {
          method:"GET",
          headers:{token:localStorage.getItem("token")}
        }
      )
    //   console.log(data);
      return (data?.posts);
    } catch (error) {
      toast.error(error?.response?.data?.error);
      return error;
      console.log(error);
    }
    
  }

  const {data:posts , isLoading} = useQuery({
    queryFn:getPosts,
    queryKey:["posts",id]
  });
  
  return (
    <>
      <div className='max-w-3xl mx-auto pb-2'>
        <CreatePost />
        {isLoading && <Skeleton height={500} count={10} />}
        {/* posts */}
        {posts?.map((p)=><Onepost key={p?._id} id={p?._id} post={p}/>)}
      </div>
    </>
  )
}
