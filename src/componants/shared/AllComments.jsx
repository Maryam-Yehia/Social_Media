import { MessageText1, UserSquare } from 'iconsax-reactjs'
import React from 'react'

export default function AllComments({comment , photo}) {
    
  return (
    <>
        <div className='flex'>
          {comment?.commentCreator?.photo ? <img src={photo} alt={comment?.commentCreator?.name} width={"45px"} className='rounded-md me-2'/> : ""}
          <div className='text-sm'>
              <h2>{comment?.commentCreator?.name}</h2>
              <p>{comment?.createdAt}</p>
          </div>
        </div>
        <p className='ms-15 mb-4 font-semibold'>
            {comment?.content}
        </p>
    </>
  )
}
