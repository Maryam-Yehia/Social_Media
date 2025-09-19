import React, { useContext, useState } from 'react'
import { userContext } from '../../contexts/Usercontext';
import { Link } from 'react-router-dom'
import { MessageText1, UserSquare } from 'iconsax-reactjs';
import CreateComment from '../../componants/shared/CreateComments';
import AllComments from '../../componants/shared/AllComments';

export default function Onepost({post}) {

  const [more, setMore] = useState(1);
  function seemore(length){
    // if(length != more - 1)
      setMore(more + 5);
  }
    
  return (
    <>
       <div className='bg-white p-4 rounded-lg my-4 '>
          {/* header post */}
          <div className='flex mb-3'>
            {post?.user?.photo ? <img src={post?.user?.photo} alt={post?.user?.name} width={"50px"} className='rounded-md me-2'/> : <UserSquare size="35" color="#FF8A65"/>}
            <div>
              <h2 className='font-bold'>{post?.user?.name}</h2>
              <p>{new Date(post?.createdAt).toLocaleDateString("us-en", {day:"2-digit", month:"short", year:"numeric"})}</p>
            </div>
          </div>

            {/* body post */}
            <div>
              <p>{post?.body}</p>
              {post?.image ? <img src={post?.image} alt={post?.body} className='mt-1 mb-2' width={"100%"} /> : ""}
              
            </div>
            
            {/* comments */}
            <div>
              <div className='flex gap-2 mt-4 mb-2'>
                    <MessageText1 size="27" color="#FF8A65"/>
                    <p>{post?.comments?.length} comment</p>
              </div>
              { post?.comments?.slice(0 , more).map((comt)=><AllComments key={comt?._id} id={comt?._id} comment={comt} photo={post?.user?.photo}  /> )}
              {/* {id ? <AllComments comment={post?.comments[post?.comments?.length - 1]} photo={post?.user?.photo} /> : post?.comments?.map((comt)=><AllComments key={comt?._id} id={comt?._id} comment={comt} photo={post?.user?.photo}  /> )} */}
              { post?.comments?.length > 1 && post?.comments?.length > more ? <p className='underline text-blue-700 cursor-pointer' onClick={()=>{seemore(post?.comments?.length)}}>See more</p> : ""}
              {/* {id && post?.comments?.length>1 ? <Link className='underline text-blue-700' to={`posts/${post?._id}`}>See more</Link> : ""} */}
            </div>


            {/* create comment */}
            <CreateComment id={post?._id} />
        </div>
    </>
  )
}
