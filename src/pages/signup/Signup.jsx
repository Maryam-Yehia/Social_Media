import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {  object } from "zod";
import * as z from "zod";
import Errormsg from "../../componants/shared/Errormsg";
import { useEffect } from "react";

export default function Signup() {

  const schema = z.object({
    name: z.string().min(3),
    email: z.email() ,
    password:z.string().min(8).regex(/^[a-zA-Z]\d/),
    rePassword:z.string().refine((val)=> val === watch('password')),
    gender:z.literal(["Female","Male"]),
    dateOfBirth:z.string()
  })

  const {register ,handleSubmit ,watch ,formState:{errors}}= useForm({resolver:zodResolver(schema)});

  async function signup(data){
    try {
      const res = await axios(`${import.meta.env.VITE_BASE_URL}/users/signup`
        ,{
          method:"POST",
          data
        }
      )
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{signup},[])

  return (
    <form onSubmit={handleSubmit(signup)} className="flex max-w-xl flex-col gap-4 m-auto py-10 px-20">

      {/* Name */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name0">Your Name</Label>
        </div>
        <TextInput id="name0" type="text" placeholder="name" {...register('name')} />
        <Errormsg>{errors?.name?.message}</Errormsg>
      </div>

      {/* Email */}
       <div>
        <div className="mb-2 block">
          <Label htmlFor="email1">Your email</Label>
        </div>
        <TextInput id="email1" type="email" placeholder="name@gmail.com" {...register("email")} />
      <Errormsg>{errors?.email?.message}</Errormsg>
      </div>

      {/* Password */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1">Your password</Label>
        </div>
        <TextInput id="password1" type="password" placeholder="*********" {...register("password")} />
            <Errormsg>{errors?.password?.message}</Errormsg>
      </div>

      {/* RePassword */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="rePassword1">Your repassword</Label>
        </div>
        <TextInput id="rePassword1" type="password" placeholder="*********" {...register("repassword")} />
            <Errormsg>{errors?.rePassword?.message}</Errormsg>
      </div>

      {/* Gender */}
      <div className="max-w-md">
        <div className="mb-2 ">
          <Label htmlFor="gender">Select your Gender</Label>
        </div>
        <Select id="gender" className="cursor-pointer" {...register('gender')}>
          <option default>Female</option>
          <option>Male</option>
        </Select>
            <Errormsg>{errors?.gender?.message}</Errormsg>
      </div>

      {/* date of birth */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="date0">Your Birth day</Label>
        </div>
        <TextInput id="date0" type="date" {...register('dateOfBirth')} />
        <Errormsg>{errors?.name?.message}</Errormsg>
      </div>

      <p>Do you have an account? <Link to={"/Login"}><b className="text-blue-950">Login</b></Link></p>

      <Button type="submit">Submit</Button>
    </form>
  )
}
