import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../nav/NavBar'
import Footer from '../footer/Footer'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
  return (
    <>
    <NavBar />
    <main className='bg-gray-300'>
      <span className='opacity-0'>.</span>
      <Outlet />
    </main>
    <Footer />
    <Toaster
      position="top-center"
      // reverseOrder={false}
    />
    </>
  )
}
