import { Image, UserSquare, Watch } from 'iconsax-reactjs'
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../contexts/Usercontext'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CreateComment({id}) {
    const queryclient = useQueryClient();

  const {userData} = useContext(userContext);
  const {handleSubmit , register , reset} = useForm()

async function createcomment(val) {
    return await axios(`${import.meta.env.VITE_BASE_URL}/comments`,
        {
            method:"POST",
            headers:{token:localStorage.getItem("token")},
            data:{'content': val?.content ,'post': id}
        }
    )
}


const {mutate } = useMutation({
    mutationFn:createcomment,
    onSuccess:()=>{
        queryclient.invalidateQueries({queryKey:["posts"]});
        toast.success('success');
        reset();
    },
    onError:(error)=>{
        toast.error(error.response.data.error);
    },

})


return (
    <>
        {/* create comment */}
        <form id='Forme' onSubmit={handleSubmit(mutate)} className='bg-white my-2 pb-4 '>
            <div className='flex gap-2 my-4 px-2 '>
                {userData?.photo ? <img src={userData?.photo} alt={userData?.name} width={"40px"}/> : <UserSquare size="35" color="#FF8A65"/>}
                <input type="text" placeholder='What do you want?' className='grow bg-orange-200 px-2 py-1.5 rounded-lg' {...register('content')} />
            </div>
            <div className='px-2.5 mx-auto'>
                <button className='w-full rounded-lg py-2 bg-amber-500 font-semibold' type='submit'>
                    create comment
                </button>
            </div>
        </form>
    </>
  )
}
