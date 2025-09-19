import { useParams } from 'react-router-dom'
import CreatePost from '../../componants/shared/CreatePost'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Onepost from '../Onepost/Onepost';
import { Image, UserSquare } from 'iconsax-reactjs'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';


export default function PostDetails() {
    const {id} = useParams();

    const queryclient = useQueryClient()

    async function getOnePost() {
        try {
      const {data} = await axios(`${import.meta.env.VITE_BASE_URL}/posts/${id}`,
        {
          method:"GET",
          headers:{token:localStorage.getItem("token")}
        }
    )
    queryclient.invalidateQueries({queryKey:["post", id]})
      return(data?.post);
        } catch (error) {
          return error;
            console.log(error);
        }
    }

    // useEffect(()=>{getOnePost()},[])

    const {data:post , isLoading} = useQuery({
      queryFn:getOnePost,
      queryKey:["post" , id ]
    })



    return (
    <>
        <div className='max-w-3xl mx-auto pb-2'>
            <CreatePost />

            {isLoading && <Skeleton height={500} />}

            {/* posts */}
            <Onepost post={post}/>

        </div>
    
    </>
  )
}
