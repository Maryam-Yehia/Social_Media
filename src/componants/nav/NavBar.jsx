import { Button, ButtonGroup } from "flowbite-react";
import { TriangleLogo, Logout } from "iconsax-reactjs";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { userContext } from "../../contexts/Usercontext";

export default function NavBar() {
  const {userData , getDataUser, setUserData} = useContext(userContext)
// console.log(userData?._id);

  const route = useNavigate();

  function logout(){
    localStorage.clear();
    setUserData(null);
    route('/login');
  }

  useEffect(()=>{
    getDataUser(localStorage.getItem("token"));
  },[])

  return <>
  <nav className="container w-10rem m-auto flex justify-between py-3 items-center">
    <div>
      <Link to={"/login"}>
      <TriangleLogo size="32" color="#3554c2"/>
      </Link>
    </div>
    <div>
        {userData? <div className="flex items-center gap-2"><Link to={`/profile/${userData?._id}`} className="cursor-pointer font-bold text-blue-950">{userData?.name}</Link> <Logout size="32" color="#3554c2" className="cursor-pointer" onClick={logout}/> </div> : <Button color={"none"}><Link to={"/login"} className="cursor-pointer font-bold text-blue-950">Login</Link></Button>}
    </div>
  </nav>
  </>
    
  
}
