import { Image, UserSquare } from 'iconsax-reactjs'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { userContext } from '../../contexts/Usercontext'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CreatePost() {
  const {userData} = useContext(userContext);

  const {register , handleSubmit , reset, watch} = useForm();

  watch();
  const ref = useRef();

  if(ref?.current?.value != '')
    document.querySelector('#imagee')?.classList?.remove('hidden');



    const queryclient = useQueryClient()

  async function createPost(data) {
      const formdata = new FormData();
      formdata.append("body", data.body);
      formdata.append("image", ref?.current?.files[0]);
      return await axios(`${import.meta.env.VITE_BASE_URL}/posts`,
        {
          method:"POST",
          headers:{token:localStorage.getItem('token')},
          data:formdata
        }
      )
  }

  const {mutate} = useMutation({
    mutationFn:createPost,
    onSuccess:()=>{
      reset();
      toast.success('Successfully');
      queryclient.invalidateQueries({queryKey:["posts"]});
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.error);
    },
  })

  return (
    <>
      {/* create post */}
        <form onSubmit={handleSubmit(mutate)} className='bg-white my-2 pb-4 '>
          <h2 className='border-b-1 border-gray-300 p-2 font-semibold'>Post something</h2>

          {/* body form */}
          <div className='flex gap-2 my-4 px-2 '>
            {userData?.photo ? <img src={userData?.photo} alt="" width={"40px"}/> : <UserSquare size="35" color="#FF8A65"/>}
            <input type="text" placeholder='What do you think?' className='grow bg-orange-200 px-2 py-1.5 rounded-lg' {...register('body')}/>
            <Image size="32" color="#FF8A65" onClick={()=>ref.current.click()} className='cursor-pointer' />
            <input type="file" className='hidden'  id='click' {...register('image')} ref={ref} />
          </div>

          {/* view image */}
          <div>
            {ref?.current?.files[0] && <img src={URL.createObjectURL(ref?.current?.files[0])} alt="hello" className='mx-auto w-xl mb-4 hi' id='imagee' />}
          </div>

          {/* footer */}
          <div className='px-2.5 mx-auto'>
            <button className='w-full rounded-lg py-2 bg-amber-500 font-semibold cursor-pointer hover:bg-amber-400'>
                create post
            </button>
          </div>
        </form>
    </>
  )
}
