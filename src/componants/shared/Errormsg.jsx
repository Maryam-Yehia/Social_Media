import React from 'react'

export default function Errormsg({children}) {
  return (
    <p className='text-red-600 font-semibold'>
      {children}
    </p>
  )
}
