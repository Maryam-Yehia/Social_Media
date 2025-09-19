import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Errormsg from "../../componants/shared/Errormsg";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import {userContext} from "../../contexts/Usercontext";
import toast from "react-hot-toast";

const schema = z.object({
  email:z.email(),
  password:z.string().min(8).regex(/^[a-zA-Z]\w/)
})

export default function Login() {
  const router = useNavigate();
  const {getDataUser} = useContext(userContext);

  const {register ,handleSubmit ,watch ,formState:{errors , isLoading} }= useForm({resolver:zodResolver(schema)});
// watch();
  async function signin(val){
    try {
      const {data} = await axios(`${import.meta.env.VITE_BASE_URL}/users/signin`
        ,{
          method:"POST",
          data:val
        }
      )
      localStorage.setItem('token',data?.token);
      getDataUser(data?.token);
      router("/");
    } catch (error) {
      toast.error(error?.response?.data?.error);
      console.log(error);
    }
  }

  useEffect(()=>{signin},[]);

  return (
    <form onSubmit={handleSubmit(signin)} className="flex max-w-xl gap-4 m-auto py-5 px-20 h-screen  justify-center flex-col">

     {/* <div className="w-full bg-amber-400"> */}
       {/* Email */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1">Your email</Label>
        </div>
        <TextInput id="email1" type="email" placeholder="name@gmail.com"
        {...register("email")} />
        <Errormsg>{errors?.email?.message}</Errormsg>
      </div>

      {/* Password */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1">Your password</Label>
        </div>
        <TextInput id="password1" type="password" placeholder="*********"
        {...register("password")} />
        <Errormsg>{errors?.password?.message}</Errormsg>
      </div>

      <p>You don't have an account? <Link to={"/Signup"}><b className="text-blue-950">Sign Up</b></Link></p>

      <Button type="submit">Submit</Button>
     {/* </div> */}
    </form>
  )
}
