import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './componants/lauout/Layout';
import Home from './pages/Posts/Home'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import UsercontextProvider from './contexts/Usercontext';
import Protectedrouter from './router/Protectedrouter';
import AuthProtectedRouting from './router/AuthProtectedRouting';
import Postdetails from './pages/Postdetails/Postdetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import User from './pages/profile/User';
import PostDetails from './pages/Postdetails/Postdetails';

const route = createBrowserRouter([
  {path: '/', element:
  //  <Protectedrouter>
    <Layout />
    // </Protectedrouter>
    , children:[
    {index:true, element: <Protectedrouter> <Home /> </Protectedrouter> },
    {path:'posts/:id' , element:<Protectedrouter> <PostDetails/> </Protectedrouter>},
    {path: '/profile/:id', element: <Protectedrouter> <User /> </Protectedrouter>},
    {path: '/login', element:
    <AuthProtectedRouting>
      <Login />
      </AuthProtectedRouting>
      },
    {path: '/signup', element: <AuthProtectedRouting><Signup /></AuthProtectedRouting>},
    // {path:'*',element:<Notfound/>},
  ]},

]);

const client = new QueryClient()

createRoot(document.getElementById('root')).render(
   <UsercontextProvider>
    <QueryClientProvider client={client}>
      <RouterProvider router={route} />
       <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
    </QueryClientProvider>
   </UsercontextProvider>
)
